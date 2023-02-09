import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import React, {useState, useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import ATSAT from './ATSAT.jpg'
import "./App.css"
import { BookInfo } from './paginitas';
import { Link, useParams } from "react-router-dom";
import BCard from './BCard'

const Cards = () =>{

    const [books, setBooks] = useState([])
    const [pagination, setPagination] = useState({
      actual: {page: 1, limit: 25}, 
      prev: null, 
      next: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const [booksPerPage, setBooksPerPage] = useState(25)
    const fetchData = async (page) => {

    const booksFetch = await 
        fetch(`http://localhost:5000/api/v1/books?page=${page}`, { method: 'GET', mode: 'cors', headers: {'Content-Type': 'application/json',}, referrerPolicy: 'no-referrer', })
        .then(response => response.json())
        setBooks(booksFetch.data)
        setPagination(booksFetch.pagination)
    }
    useEffect( ()=>{
      setIsLoading(true)
      fetchData(pagination.actual.page)
      setIsLoading(false)
      console.log(books)
    }, [])
   


        return(
            <>
            {books&&
            books.map(book=>(
              <BCard bookJson = {book} /> 
            ))
              
            }
            </>
        );


    
}


export default Cards