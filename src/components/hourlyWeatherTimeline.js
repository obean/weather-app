import React, {useEffect, useState} from 'react'
import HourWeather from './hourweather.js'
const HourWeatherTimeline = (props) => {


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
