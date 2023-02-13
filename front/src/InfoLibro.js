import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookInfo.css';
import React from 'react';
import {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import ATSAT from './ATSAT.jpg'
import Swal from 'sweetalert2';
import axios from "axios";
import { books_HM } from './resources/images_mapping'

import PopUp from "./poporopo";




function InfoBooks(){
    const [book, setBook] = useState()
    const [reviews, setReviews] = useState([])

    const [popUp, setPopUp] = useState(false)
    // adds class to darken background color
    // const duringPopUp = popUp ? " during-popup" : ""


    const {id} = useParams()
    const swalError = (message) =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message,
          footer: '<a href="/">Back to main</Link>'
        })   
      }
    const getBook = async()=>{
        await axios.get(`http://localhost:5000/api/v1/books/${id}`, )
        .then(res => {
        res = res.data
        console.log(res.data)
        if (!res.success || !res.data) {
            swalError("No se encontro un libro con la id ingresada")
            return
        }
        setBook(res.data)
        if (res.data.reviews) setReviews(res.data.reviews)
        })
        .catch(err =>{
        swalError("Hubo un problema en la busqueda del libro")   
        console.log(err)
        })
    }
  useEffect(()=>{
    if (id){
        getBook()
        return
    }
    swalError("Hubo un problema al obtener el ID del libro del URL ingresado")

  }, [])
return(
    
    <div>
        <img className="BookPic" src={book?books_HM[book.image]:ATSAT} alt="book_cover" height={"500px"}></img>
        <button className="read">Mark as read</button>
        <p className="Titulote">{book?book.title:"none"}</p>
<div>
    <div>
{/* Aqui es la clase de arriba del pop up */}

<button onClick={()=>setPopUp(true)} className="read" >Rate</button>
        </div>
            {popUp && <PopUp setPopUp={setPopUp} bookid={id}/>}
        </div>

{/* <button onClick={popUp && <PopUp setPopUp={setPopUp}/>}>rate</button> */}
        
        
        <p className="Autorcito">{book?book.author:"none"}</p>
        <p className="publicaor">Publicado por: <Link to = {`/profile/${book?book.publisher._id:''}`}>{book?book.publisher.username:"none"}</Link></p>
        <p className="gatogoria">{book?book.category:"none"}</p>
        <p className="desc">Descripcion <br></br>{book?book.desc:"none"}</p>
        <div className="ratingS"> 
            <h2 className="who"> User rating</h2>
            <p className="numbers">{book?book.rate:"?"}/5</p>
        </div>
        <div className="ratingS">
            <h2 className="who"> Reviewer rating</h2>
            <p className="numbers">{book?book.reviewerRate: "?"}/10</p>
        </div>

        <h2 className="rev"> Reviews</h2>
        <p className="comments"></p>
        <br></br>
        {reviews.length>0&&
            reviews.map(review =>
                <div className="inform">
                    <h2 className="username"><Link to={`/profile/${review.reviewer_id}`}>{review.reviewerName}</Link></h2>
                    <h2 className="username"> {review.rate}/10</h2>
                    <p className="says">{review.text}</p>
                </div>
            )
                
        
        }
    </div>

)
    

}


export default InfoBooks