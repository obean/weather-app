import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import WeatherTimeline from './components/WeatherTimeline.js'
import useDaySynopsisModal from './components/useDaySynopsisModal.js'
import WeatherSynopsisModal from './components/weatherSynopsisModal.js'
import './App.css';

function App() {
  const [weather, setWeather] = useState()
  const {daySynopsisShowing, toggleDaySynopsisShowing} = useDaySynopsisModal();
  const [selectedDay, setSelectedDay] = useState();

  const getFourDayWeather = async () => {
    const openweatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&mode=json&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric`)
      .then( async openweatherData => {
        const parsedData = await openweatherData.json()
        console.log(parsedData)
        sortWeatherObjectsByDate(parsedData)
        
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

  const formatYearKey = (dayOne, i) => {
    let nextDate = new Date(new Date().setDate(dayOne.getDate() + i)).toLocaleDateString().split('/')
    return nextDate.reverse().join('-')
  }

  const sortWeatherObjectsByDate = (weatherData) => {
    const days = {}
    let firstEntryDay = new Date(weatherData.list[0].dt_txt)
    for(let i = 0; i < (weatherData.list.length/8)+1; i++ ){
      eval(`days["${formatYearKey(firstEntryDay, i)}"]= { weather: [], main: [], nextWeek: false}`)
    }

    console.log(days)
    weatherData.list.map(dataEntry => {
      let dayNum = formatYearKey(new Date(dataEntry.dt_txt), 0)
      days[dayNum].weather.push(dataEntry.weather)
      days[dayNum].main.push(dataEntry.main)
      
    })
    setWeather(days)
  }

 

 

  return (
    <div className="App">
      <header className="App-header">
   
      <WeatherSynopsisModal
        hide={toggleDaySynopsisShowing}
        showing={daySynopsisShowing}
        toggleDaySynopsisShowing={toggleDaySynopsisShowing}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
      />
      {weather &&  <WeatherTimeline
                      weatherItems={weather}
                      toggleDaySynopsisShowing={toggleDaySynopsisShowing}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                   />
      }
       
        
      </header>
    </div>
  );
}

export default App;
