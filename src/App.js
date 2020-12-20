import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import WeatherTimeline from './components/WeatherTimeline.js'
import './App.css';

function App() {
  const [weather, setWeather] = useState()


  const getFourDayWeather = async () => {
    const openweatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&mode=json&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
      .then( async openweatherData => {
        const parsedData = await openweatherData.json()
        sortWeatherObjectsByDate(parsedData)
        // console.log(Object.keys(weather))
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
    
  }, [])

  const sortWeatherObjectsByDate = (weatherData) => {
    const days = {}
    let firstEntryDay = new Date(weatherData.list[0].dt_txt).getDay()
    for(let i = 0; i < (weatherData.list.length/8)+1; i++ ){
      // test this tomorrow, you should get object with keys starting at 1 ending with 5, i know eval is bad. but it works here
      eval("days[" + (firstEntryDay + i) + "] = { weather: [], main: []}" )
    }
    console.log(days)
    weatherData.list.map(dataEntry => {
      let dayNum = (new Date(dataEntry.dt*1000).getDay())
      days[dayNum].weather.push(dataEntry.weather)
      days[dayNum].main.push(dataEntry.main)
      
    })
    setWeather(days)
  }

 

 

  return (
    <div className="App">
      <header className="App-header">
   
        
      {weather &&  <WeatherTimeline
          weatherItems={weather}
        />}
       
        
      </header>
    </div>
  );
}

export default App;
