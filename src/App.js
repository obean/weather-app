import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import DayWeather from './components/dailyWeather.js'
import './App.css';

function App() {
  const [weather, setWeather] = useState({})


  const getFourDayWeather = async () => {
    const openweatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&mode=json&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
      .then( async openweatherData => {
        const parsedData = await openweatherData.json()
        sortWeatherObjectsByDate(parsedData)
        console.log(weather)
      })
  }
    //  weather api not being used. keeping the call info incase I decide to use it later for further away dates
  const getForecast = async () => {
    const weatherData =  await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&days=4`)
      .then(async weatherData => {
        const parsedData = await weatherData.json();
        console.log(parsedData)
        setWeather(parsedData)
      })
  }

  useEffect(() => {
    getFourDayWeather();
    // getForecast();
  }, [])

  const sortWeatherObjectsByDate = (weatherData) => {
    const days = {}
    let firstEntryDay = new Date(weatherData.list[0].dt_txt).getDay()
    for(let i = 0; i < (weatherData.list.length/8)+1; i++ ){
      // test this tomorrow, you should get object with keys starting at 1 ending with 5, i know eval is bad. but it works here
      eval("days[" + (firstEntryDay + i) + "] = { weather: []}" )

      //below is your old method but will make it a pain to use
      // days[i].day = firstEntryDay + i
    }
    console.log(days)
    weatherData.list.map(dataEntry => {
      // console.log(days[(new Date(dataEntry.dt*1000).getDay())])
      // console.log((new Date(dataEntry.dt*1000)))
      // console.log((new Date(dataEntry.dt*1000).getDay()))
      // console.log(days)
      days[(new Date(dataEntry.dt*1000).getDay())].weather.push(dataEntry)
      console.log()
    })
    setWeather(days)
  }

  const dateNumToString = (dateNum) => {
    //lets swap this to a switch statement when we have sorted out the other kinks
    var daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return  dateNum > 6 ? daysOfTheWeek[dateNum-7] : daysOfTheWeek[dateNum]
    
  }

 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {weather && <DayWeather
           weather={weather[0]}
        /> } 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
