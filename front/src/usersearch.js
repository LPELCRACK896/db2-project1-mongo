import "./App.css"
import { useState } from "react";
import axios from "axios";
import BCard from "./BCard";

function UsuariosS(){
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

        // CAMBIAR
        // CABIAR
        // CAMBIAR
        //VAMIADR
        //VREHLFBVIEFRBVLKV RLJRBGVL JBJNS JKNV
        //BUKRFBVIEDSFUBNV;UEISRBDG HRGIUDHV 
    <>
        <h3>Buscar</h3>
        <input className="Buscador" name="finder" onChange={search}></input>
        <>
        {books&&
        books.map(book =>
            <BCard bookJson = {book} /> 
        )
        }

        <footer>
            <button className="prev">⬅️</button>
            <button className="next">➡️</button>
        </footer>
        </>
    </>
    );
}

export default UsuariosS