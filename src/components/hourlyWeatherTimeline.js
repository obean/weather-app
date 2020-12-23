import React, {useEffect, useState} from 'react'
import HourWeather from './hourweather.js'
const HourWeatherTimeline = (props) => {
  console.log(props.weather)

  return (
    <div id="weatherTimeline">
      {props.weather.data.map(weatherSlot => {
        return <HourWeather
                 weather={weatherSlot}
               />
      })}
    </div>
  )
}

export default HourWeatherTimeline;