import "./App.css"
import { useState } from "react";
import axios from "axios";
import BCard from "./BCard";
import { FaArrowRight, FaArrowLeft, FaSearch} from 'react-icons/fa';
function Buscador(){
    const [keyword, setKeyword] = useState("")
    const [books, setBooks] = useState("")
    const [pagination, setPagination] = useState({actual: {page: 1, limit:null}, next:{page:null, limit:null}, prev:{page:null, limit:null}})
    const [limit, setLimit] = useState(10)


    const checkField = (field) => !(field==="" || field===undefined || field===null)

    const search = async($event)=>{
        $event.preventDefault()
        setKeyword($event.target.value)
        console.log(keyword)
        if (!checkField(keyword)) return
        const res = await axios.post("http://localhost:5000/api/v1/books/findbook",
        {
            keyword, 
            page: pagination.actual.page,
            limit
        }
        ).then(res => res.data)
        setBooks(res.data)
        console.log(books)
        
    }
    return(
    <>
    <header>
        <h3 className="searchBU">Buscar libros</h3>
        <input className="Buscador" name="finder" onChange={search}></input>
        <button className="buscacion"><FaSearch/></button>
        </header><>
        {books&&
        books.map(book =>
            <BCard bookJson = {book} /> 
        )
        }

        <footer>
            <button className="prev"><FaArrowLeft/></button>
            <button className="next"><FaArrowRight/></button>
        </footer>
        </>
    </>
    );
}

export default Buscador