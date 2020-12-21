import React, {useEffect, useState} from 'react'



function DayWeather({weather, dayOfTheWeek, toggleDaySynopsisShowing, setSelectedDay}) {

const handleSelect = () => {
  setSelectedDay(dayOfTheWeek);
  toggleDaySynopsisShowing();
}

return (
<div className="day-weather-div">
<h3 onClick={() => handleSelect()} className="day-of-the-week-title" >{dayOfTheWeek}</h3>
</div>
)
}


export default DayWeather;