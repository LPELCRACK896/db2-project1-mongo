import "./App.css"
import { useState } from "react";
import axios from "axios";
import { FaArrowRight, FaArrowLeft, FaSearch} from 'react-icons/fa';
import Usercards from "./userCards";
function UsuariosS(){
    const [keyword, setKeyword] = useState("")
    const [users, setUsers] = useState("")
    const [totalPages, setTotalPages] = useState(null)
    const [limit, setLimit] = useState(10)
    const [actualPage, setActualPage] = useState(1)

    const checkField = (field) => !(field==="" || field===undefined || field===null)
    const fetchPages = async(page) =>{
        await axios.post( `http://localhost:5000/api/v1/persons/find?page=${page}`,
        {
            keyword, 
            page,
            limit
        }
        ).then(res => {
            setUsers(res.data.data)
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

        // CAMBIAR
        // CABIAR
        // CAMBIAR
        //VAMIADR
        //VREHLFBVIEFRBVLKV RLJRBGVL JBJNS JKNV
        //BUKRFBVIEDSFUBNV;UEISRBDG HRGIUDHV 
        <>  
        <header>
            <h3 className="searchBU">Buscar usuarios</h3>
            <input className="Buscador" name="finder" onChange={e => setKeyword(e.target.value)}></input>
            <button className="buscacion" onClick={async e => await search(e, 1)}><FaSearch/></button>
            </header><>
            {users&&
            users.map(user =>
                <Usercards userJSON = {user} /> 
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

export default UsuariosS