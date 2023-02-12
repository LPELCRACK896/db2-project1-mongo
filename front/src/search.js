import "./App.css"
import { useState } from "react";
import axios from "axios";
import BCard from "./BCard";
import { FaArrowRight, FaArrowLeft, FaSearch} from 'react-icons/fa';
function Buscador(){
    const [keyword, setKeyword] = useState("")
    const [books, setBooks] = useState("")
    const [totalPages, setTotalPages] = useState(null)
    const [limit, setLimit] = useState(10)
    const [actualPage, setActualPage] = useState(1)

    const checkField = (field) => !(field==="" || field===undefined || field===null)
    const fetchPages = async(page) =>{
        await axios.post( `http://localhost:5000/api/v1/books/findbook?page=${page}`,
        {
            keyword, 
            page,
            limit
        }
        ).then(res => {
            setBooks(res.data.data)
            setTotalPages(res.data.totalPages)
        })
    }
    const search = async($event)=>{
        $event.preventDefault()
        setActualPage(1)
        if (!checkField(keyword)) {
            setTotalPages(null)
        }
        await fetchPages(actualPage)
        
    }
    const goNext = async(e)=>{
        e.preventDefault()
        if(actualPage+1>totalPages) {
            
            return
        }
        setActualPage(actualPage+1)
        await fetchPages(actualPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

    }
    const goPrev = async(e)=>{
        e.preventDefault()
        if(actualPage===1) {
            return
        }
        setActualPage(actualPage-1)
        await fetchPages(actualPage)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        
    }
    return(
    <>
    <header>
        <h3 className="searchBU">Buscar libros</h3>
        <input className="Buscador" name="finder" onChange={e => setKeyword(e.target.value)}></input>
        <button className="buscacion" onClick={async e => await search(e, 1)}><FaSearch/></button>
        </header><>
        {books&&
        books.map(book =>
            <BCard bookJson = {book} /> 
        )
        }

        <footer>
            <button className="prev" style={{visibility: actualPage===1?'hidden':'visible'}} onClick={goPrev}><FaArrowLeft/></button>
            <button className="next" style={{visibility: actualPage+1>totalPages?'hidden':'visible'}} onClick={goNext}><FaArrowRight/></button>
        </footer>
        </>
    </>
    );
}

export default Buscador