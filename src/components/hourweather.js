import React from 'react'

const HourWeather = (props) => {
  console.log(props.weather)

  const getEntryTime = (timeString) => {
   return timeString.split(' ')[1].match(/\d{2}:\d{2}/)
  }
  console.log(getEntryTime(props.weather.dt_txt))
  return (
    <div className="hour-weather-div">
      <h1>{getEntryTime(props.weather.dt_txt)}</h1>
      
      <div className="logo-description">
        <img className="weather-icon" src={` http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}/>
        <p>{props.weather.weather[0].description}</p>
      </div>
      <br></br>
      <div className="temp-grid">
        <div>
          <span className="temp-grid-title">Av</span>
          <span className="temp-grid-value">{props.weather.main.temp}°C </span> 
        </div>
        <div>
          <span className="temp-grid-title">Max</span>
          <span className="temp-grid-value">{props.weather.main.temp_max}°C</span>
        </div>
        <div>
          <span className="temp-grid-title">Min</span>
          <span className="temp-grid-value">{props.weather.main.temp_min}°C </span>
        </div>
        
      </div>
      <br></br>
  
    </div>
  )
}

export default HourWeather;