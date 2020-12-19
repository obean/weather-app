import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [weather, setWeather] = useState({})

  // open weather api not being used. keeping the call info incase I decide to use it later for further away dates
  const getFourDayWeather = async () => {
    const openweatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&mode=json&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
      .then( async openweatherData => {
        const parsedData = await openweatherData.json()
        console.log(parsedData)
        sortWeatherObjectsByDate(parsedData)
      })
  }
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
    getForecast();
  }, [])

  const sortWeatherObjectsByDate = (weatherData) => {
    const days = {
     0: {day: "", time: "", main: [], weather: []},
     1: {day: "", time: "", main: [], weather: []},
     2: {day: "", time: "", main: [], weather: []},
     3: {day: "", time: "", main: [], weather: []},
     4: {day: "", time: "", main: {}, weather: {}}
    }
    let firstEntryDay = new Date(weatherData.list[0].dt_txt).getDay()
    console.log(firstEntryDay)
    for(let i = 0; i < 5; i++ ){
      days[i].day = dateNumToString(firstEntryDay + i)
    }
    console.log(days)


  }

  const dateNumToString = (dateNum) => {
    //lets swap this to a switch statement when we have sorted out the other kinks
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return  dateNum > 6 ? days[dateNum-7] : days[dateNum]
    
  }

 

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
