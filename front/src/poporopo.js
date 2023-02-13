import './BookInfo.css'
import Swal from 'sweetalert2'
import React, {useState, useEffect} from 'react';
import axios from 'axios'


const PopUp = props => {
    // function that takes boolean as param to conditionally display popup
    const { setPopUp, bookid } = props 

    const [rate, setRate] = useState(null)
    const swalError = (message) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
          footer: '<a href="/">Back to main</Link>'
        })   
      }
    
    const setNewRate = async()=>{
        let newRate = parseFloat(rate)
        if(!(!isNaN(newRate) && isFinite(newRate))){
            swalError("Rate invalido")
            return
        }
        const token = localStorage.getItem("token")
        if(!token){
             swalError("Debe loggearse para ratear un libro")
             return
        }
        const res = await axios.put(`http://localhost:5000/api/v1/books/rate/${bookid}`, {rate: newRate},{
            headers:{
                Authorization: `Bearer ${token}`
              }
        }).then(res => res.data)
        if(res.success){
            Swal.fire({
                icon: "success",
                title: 'Update new rate',
              })
        }
        setPopUp(false)

    }
    return (
        <div className="PopUp">
            {/* x close window */}
            <button className="popupS" onClick={()=> setPopUp(false)} >Cancel</button>
            <div className="pu-content-container">
                <h1>Add rating</h1>
                <p className='sub'>Rate from 1 to 5</p>
                <input onChange={e => setRate(e.target.value)}></input>
            </div>
            {/* button controls */}
            <div className="pu-button-container">
                <button onClick={()=> setNewRate()} className="popupB"> Submit </button>
            </div>
        </div>
    );
}

export default PopUp;