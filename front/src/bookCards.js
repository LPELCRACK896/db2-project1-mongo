import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useState, useEffect} from 'react';
// import Button from 'react-bootstrap/Button';
import "./App.css"
import BCard from './BCard'
import { FaSearch} from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

const Cards = () =>{
    //Data
    const categories =  ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
    const [books, setBooks] = useState([])
    const [publishers, setPublishers] = useState([])
    const [authors, setAuthors] = useState([])
    const [pagination, setPagination] = useState({
      actual: {page: 1, limit: 25}, 
      prev: null, 
      next: null
    })
    const [newFiltr, setNewFiltr] = useState(true)
    //Pagination
    const [limit, setLimit] = useState(10)
    const [actualPage, setActualPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [booksPerPage, setBooksPerPage] = useState(25)
    //Selects
    const [selectedPublisher, setSelectedPublisher] = useState("any")
    const [selectedCategory, setSelectedCategory] = useState('any')
    const [selectAuthor, setSelectAuthor] = useState("any")
    const [selectRate, setSelectRate] = useState("any")
    const [selectReviewRate, setSelectReviewRate] = useState("any")
    //Query
    const [aggregation, setAggregation] = useState([])
    const [moreAggregations, setMoreAggregations] = useState([])

    const swalError = (text) =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: text,
        footer: '<a href="/">Back to main</Link>'
      })   
    }
    const hasSelectedValue = value => value!=='any' 
    const buildAggregation = ()=>{
      console.log('a')
      const agg = []
/*       if (hasSelectedValue(selectedPublisher)){
        moreagg.push({field: "publisher", value: selectedPublisher })
      } */
      if (hasSelectedValue(selectedCategory)){
        agg.push({$match: {"category": selectedCategory}})
      }
      if (hasSelectedValue(selectAuthor)){
        agg.push({$match: {"author.name": selectAuthor}})
      }
      if (hasSelectedValue(selectRate)){
        switch (selectRate){
          case "5":
            agg.push({$match: {"rate": parseFloat(selectRate)}})
            break;
          case "4":
            agg.push({$match: {"rate": {$gte: parseFloat(selectRate)}}})
            break;
          case "3":
            agg.push({$match: {"rate": {$gte: parseFloat(selectRate)}}})
            break;
          case "2":
            agg.push({$match: {"rate": {$lte: parseFloat(selectRate)}}})
            break;
          default: 
            console.log(`No case defined ${selectRate}`)
        }
      }
      if (hasSelectedValue(selectReviewRate)){
        switch (selectReviewRate){
          case "10":
            agg.push({$match: {"reviewerRate": parseFloat(selectReviewRate)}})
            break;
          case "8":
            agg.push({$match: {"reviewerRate": {$gte: parseFloat(selectReviewRate)}}})
            break;
          case "4":
            agg.push({$match: {"reviewerRate": {$gte: parseFloat(selectReviewRate)}}})
            break;
          case "2":
            agg.push({$match: {"reviewerRate": {$lte: parseFloat(selectReviewRate)}}})
            break;
          default: 
            console.log(`No case defined ${selectRate}`)
        }
      }
      //setMoreAggregations(moreagg)
      setAggregation(agg)
      setNewFiltr(!newFiltr)
    }
    const fetchBooks = async (page) => {
      if (aggregation.length!==0){
        console.log(aggregation)
        axios.post(`http://localhost:5000/api/v1/books/filtr`,{aggregation})
        .then(res =>{
          setBooks(res.data.data)
        }).catch(err=>{
          console.log(err)
        })
        return 
      }
      const booksFetch = await 
        fetch(`http://localhost:5000/api/v1/books?page=${page}`, { method: 'GET', mode: 'cors', headers: {'Content-Type': 'application/json',}, referrerPolicy: 'no-referrer', })
        .then(response => response.json())    
      console.log(booksFetch)
      setBooks(booksFetch.data)
      setPagination(booksFetch.pagination)
    }
    const fetchPublishers = async()=>{
      await axios.get(`http://localhost:5000/api/v1/persons/publishers`)
      .then(res =>{
        
        if (!res.data.success) swalError("Error on loading publishers")
        setPublishers(res.data.data)
      }).catch(err => {
        console.log(err)
        swalError(`Error on loading publishers`)
        return 
      })
    } 
    
    const fetchAuthors = async ()=>{
      await axios.get(`http://localhost:5000/api/v1/authors`)
      .then(res=>{
        if(!res.data.success){
          swalError(`Error on loading authors`)
          return 
        }
        setAuthors(res.data.data)

      }).catch(err=>{
        console.log('error')
        console.log(err)
        swalError(`Error on loading authors`)
        return 
      })
    }
    useEffect( ()=>{ 
      fetchPublishers()
      fetchAuthors()
      fetchBooks(pagination.actual.page)
      console.log(books)
    }, [newFiltr])


    return(
    <>
      <>
        <nav className="Navegacion"> 
          <select className="menu" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>

            <option className= "opciones" value="any">Cualquier categoria</option>
            {categories&&
              categories.map(category => (
                <option value={category}>{category}</option>
              ))

            }
        </select>  
          <select className="menu" value={selectAuthor} onChange={e=>setSelectAuthor(e.target.value)}>
            <option className= "opciones" value="any">Cualquier autor</option>
            {authors.length>0&&
              authors.map(author=>(
                <option key={author._id} value={author.name}>{author.name}</option>)
              )
            }
            
          </select>  
{/*           <select className="menu" value={selectedPublisher} onChange={e=>setSelectedPublisher(e.target.value)}>
            <option className= "opciones" value="any">Cualquier publicador</option>
            {publishers&&
              publishers.map(publisher =>(
                <option className= "opciones" value={publisher._id}>{publisher.name}</option>    
              ))
            }
          </select> */}
          <select className="menu" value={selectRate} onChange={e=>setSelectRate(e.target.value)}>
            <option className= "opciones" value="any">Cualquier rating</option>
            <option value="5">Just the best (5)</option>
            <option value="4">Good (4 or higher)</option>
            <option value="3">Just fine (3 or higher)</option>
            <option value="2"> Hm ok. (1 or 2)</option>
          </select>
          <select className="menu" value={selectReviewRate} onChange={e=> setSelectReviewRate(e.target.value)}>
            <option className= "opciones" value="any">Cualquier review</option>
            <option value="10">Just the best (10)</option>
            <option value="8">Good (8 or higher)</option>
            <option value="4">Just fine (4 or higher)</option>
            <option value="2"> Hm ok. (higher2)</option>
          </select>
          <button className="buscacion" onClick={buildAggregation}><FaSearch/></button>
        </nav>
      </>
      <>
        {books&&
          books.map(book=>(
            <BCard bookJson = {book} /> 
        ))
        }
      </>
    </>
        );


    
}


export default Cards