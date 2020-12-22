import React, {useEffect, useState} from 'react'



function DayWeather({weather, dayOfTheWeek, toggleDaySynopsisShowing, setSelectedDay}) {

const handleSelect = () => {
  setSelectedDay(dayOfTheWeek);
  toggleDaySynopsisShowing();
}

const dateNumToString = (dateNum) => {
  //lets swap this to a switch statement when we have sorted out the other kinks
  var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return  dateNum > 6 ? daysOfTheWeek[dateNum-7] : daysOfTheWeek[dateNum]
  
}

return (
<div className="day-weather-div">
<h3 onClick={() => handleSelect()} className="day-of-the-week-title" >{dateNumToString(new Date(dayOfTheWeek).getDay())}</h3>
</div>
)
}


export default DayWeather;