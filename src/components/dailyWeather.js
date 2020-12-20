import React, {useEffect, useState} from 'react'



function DayWeather(props) {




return (
<div className="day-weather-div">
<h2>{props.dayOfTheWeek}</h2>
</div>
)
}


export default DayWeather;