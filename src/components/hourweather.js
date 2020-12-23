import React from 'react'

const HourWeather = (props) => {
  console.log(props.weather)

  const getEntryTime = (timeString) => {
   return timeString.split(' ')[1].match(/\d{2}:\d{2}/)
  }
  console.log(getEntryTime(props.weather.dt_txt))
  return (
    <div className="day-weather-div">
      <h1>{getEntryTime(props.weather.dt_txt)}</h1>
      <h6>{props.weather.main.temp}</h6>
      <img src={` http://openweathermap.org/img/wn/${props.weather.weather[0].icon}.png`}/>
    </div>
  )
}

export default HourWeather;