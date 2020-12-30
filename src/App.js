import React, {useEffect, useState} from 'react'
import logo from './logo.svg';
import WeatherTimeline from './components/WeatherTimeline.js'
import useDaySynopsisModal from './components/useDaySynopsisModal.js'
import WeatherSynopsisModal from './components/weatherSynopsisModal.js'
import './App.css';

function App() {
  const [weather, setWeather] = useState();
  const {daySynopsisShowing, toggleDaySynopsisShowing} = useDaySynopsisModal();
  const [selectedDay, setSelectedDay] = useState();
  const [averageWeather, setAverageWeather] = useState();

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

  const getSummaryForecast = async () => {
    const summaryForecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=51.3021843&lon=-0.4941025&units=metric&exclude=hourly,alerts,&appid=${process.env.REACT_APP_OPENWEATHER_API}`)
    .then( async summaryForecast => {
      const parsedData = await  summaryForecast.json();
      return parsedData
    })
    return await summaryForecast
  }
  

  useEffect(async () => {
    getFourDayWeather();
    console.log( await getSummaryForecast())
  }, [])

  const formatYearKey = (dayOne, i) => {
    let newMilliseconds = i * 86400000
    let nextDate = new Date(dayOne.valueOf() + newMilliseconds)
    return nextDate.toLocaleDateString()
                   .split('/')
                   .reverse()
                   .join('-')
  }

  const addAverageWeather = (weather, days) => {
    for(let i = 0; i < 6; i++) {
      let date = new Date(weather.daily[i].dt*1000)
      days[formatYearKey(date, 0)].avData.push(weather.daily[i])
    }
    return days
  }

  const sortWeatherObjectsByDate = async (weatherData) => {
     let days = createDaysObject(new Date(weatherData.list[0].dt_txt))

    weatherData.list.map(dataEntry => {
      let dayNum = formatYearKey(new Date(dataEntry.dt_txt), 0)
      days[dayNum].data.push(dataEntry)
    })

    const avWeather = await getSummaryForecast();
    days = addAverageWeather(avWeather, days)

    console.log(days)
    setWeather(days)
  }

  const createDaysObject = (firstDay) => {
    const days = {}
    for(let i = 0; i < 6; i++ ){
      eval(`days["${formatYearKey(firstDay, i)}"]= { data: [], avData: []}`)
    }
    return days
  }

 

  return (
    <div className="App">
      <header className="App-header">
    
     {selectedDay && <WeatherSynopsisModal
        hide={toggleDaySynopsisShowing}//
        showing={daySynopsisShowing}
        toggleDaySynopsisShowing={toggleDaySynopsisShowing}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
        weather={weather[selectedDay]}
      />}
      {weather &&
       <WeatherTimeline
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
