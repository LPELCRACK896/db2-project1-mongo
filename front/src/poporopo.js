import './BookInfo.css'

import React from 'react';



const PopUp = props => {
    // function that takes boolean as param to conditionally display popup
    const { setPopUp } = props 

    return (
        <div className="PopUp">
            {/* x close window */}
            <button className="popupS" onClick={()=> setPopUp(false)} >Cancel</button>
            <div className="pu-content-container">
                <h1>Add rating</h1>
                <p className='sub'>Rate from 1 to 5</p>
                <input></input>
                <p className='sub'>Comment</p>
                <input></input>
            </div>
            {/* button controls */}
            <div className="pu-button-container">
                <button onClick={()=> setPopUp(false)} className="popupB"> Submit </button>
            </div>
        </div>
    );
}

export default PopUp;