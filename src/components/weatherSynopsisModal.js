import React from "react";
import ReactDOM from 'react-dom';
import HourWeatherTimeline from './hourlyWeatherTimeline.js'

const WeatherSynopsisModal = ({hide, showing, selectedDay, weather}) => {
console.log(showing)
  console.log(weather)
  console.log(weather.data[0].main.temp)
  if(showing) {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"/>
                <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                  <div className="modal">
                    <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide();}}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div><h1>{selectedDay}</h1></div>
                  <div className="timeslot-weather">
                <p classname="temp">{weather.data[0].main.temp}°</p>
               {weather &&
                <HourWeatherTimeline
                  weather={weather}
                />
                }
                </div>
                </div>

          </div>
        </React.Fragment>, document.body
      )
    )
  }else {
      return null
  }
}

export default WeatherSynopsisModal;