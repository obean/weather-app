import React, {useEffect, useState} from 'react'
import DayWeather from './dailyWeather.js'
import './componentStyle/WeatherTimeline.css'

function WeatherTimeline(props) {
  const [availDays, setAvailDays] = useState([]);

  // useEffect(() => {
  //   console.log(Object.keys(props.weatherItems))
  // }, [])

  const dateNumToString = (dateNum) => {
    //lets swap this to a switch statement when we have sorted out the other kinks
    var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return  dateNum > 6 ? daysOfTheWeek[dateNum-7] : daysOfTheWeek[dateNum]
    
  }

  return (
    <div id="weatherTimeline">
     {Object.keys(props.weatherItems).map(weatherItemKey => {
       return <DayWeather 
                weather={props.weatherItems[weatherItemKey]}
                dayOfTheWeek={dateNumToString(weatherItemKey)} 
                toggleDaySynopsisShowing={props.toggleDaySynopsisShowing}
                setSelectedDay={props.setSelectedDay}
                // onClick={() => console.log("potato")}//props.toggleDaySynopsisShowing()}
              />
     })}

    </div>
  )
}

export default WeatherTimeline;