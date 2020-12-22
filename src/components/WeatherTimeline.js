import React, {useEffect, useState} from 'react'
import DayWeather from './dailyWeather.js'
import './componentStyle/WeatherTimeline.css'

function WeatherTimeline(props) {
  const [availDays, setAvailDays] = useState([]);

  // useEffect(() => {
  //   console.log(Object.keys(props.weatherItems))
  // }, [])



  return (
    <div id="weatherTimeline">
     {Object.keys(props.weatherItems).map(weatherItemKey => {
       return <DayWeather 
                weather={props.weatherItems[weatherItemKey]}
                dayOfTheWeek={weatherItemKey} 
                toggleDaySynopsisShowing={props.toggleDaySynopsisShowing}
                setSelectedDay={props.setSelectedDay}
                // onClick={() => console.log("potato")}//props.toggleDaySynopsisShowing()}
              />
     })}

    </div>
  )
}

export default WeatherTimeline;