import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookInfo.css';
import React from 'react';
import {useState} from 'react';
import ATSAT from './ATSAT.jpg'

function InfoBooks(){
return(
    <div>
        <img className="BookPic" src={ATSAT}></img>
        <button className="read">Mark as read</button>
        <p className="Titulote">All the Stars and Teeth</p>
        <button className="read">Rate</button>
        <p className="Autorcito">Adalyn Grace</p>
        <p className="publicaor">Publicado por: Harper Collins</p>
        <p className="gatogoria">Fantasia</p>
        <p className="desc">Descripcion <br></br>ssssssssssssssss ssssssssssssssssssss sssssssssssssssssssssssssssssssssss  sssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssss sssssssssssssssssssssssssssssssssssssssss</p>
        <div className="ratingS">
            <h2 className="who"> User rating</h2>
            <p className="numbers">10/10</p>
        </div>
        <div className="ratingS">
            <h2 className="who"> Reviewer rating</h2>
            <p className="numbers">10/10</p>
        </div>

        <h2 className="rev"> Reviews</h2>
        <p className="comments"></p>
        <br></br>

        <div className="inform">
            <h2 className="username">Reviewer or user</h2>
            <h2 className="username"> rating:5/5</h2>
            <p className="says">I like or dont because this and that and also those</p>
        </div>
    </div>

)
    

}


export default InfoBooks