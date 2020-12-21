import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';

const WeatherSynopsisModal = ({hide, showing, selectedDay}) => {
console.log(showing)

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