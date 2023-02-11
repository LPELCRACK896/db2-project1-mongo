import { Link, useParams } from "react-router-dom";
import Inicio from "./Inicio";
import Iniciacion from "./login";
import Buscador from "./search"
import InfoBooks from "./InfoLibro";
import "./App.css"
import logo from './Logo.png'
import {useState, useEffect} from 'react';
import axios from "axios";
import UsuariosS from "./usersearch";

export const Home = () => {
  const [username, setUsername] = useState("...who are you??")
  useEffect(()=>{
    const getMe = async() =>{
      const token = localStorage.getItem("token")
      if(!token) return
      const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
        headers:{
          Authorization: `Bearer ${token}`
        }
      } ).then(res => res.data)
      console.log(res)
      if(!res.success) return
      setUsername(res.data.username)
    }
    getMe()
  })
  return (
    <div >
        {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
        <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
          <p className="user" >User</p>
           <Link  className="linkcito" to="/buscar">Buscar Libros</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link>
          
        </header>
        <nav className="Navegacion">
      Filtros | <select className="menu"><option className= "opciones" value="Cat0">Cualquier categoria</option><option value="Cat1">Novela</option><option value="Cat2">Fantasia</option></select>
                <select className="menu"><option className= "opciones" value="Auth0">Cualquier autor</option><option value="Auth1">Author1</option><option value="Auth2">Author2</option></select>
                <select className="menu"><option className= "opciones" value="Pub0">Cualquier publicador</option><option value="Pub1">Bloomsbury</option><option value="Pub2">Harper</option><option value="Pub3">Penguin</option></select>
                <select className="menu"><option className= "opciones" value="Rating">Cualquier rating</option><option value="rateHigh">5-4</option><option value="rateMid">2-3</option><option value="rateLow">0-1</option></select>
    </nav>
      <Inicio/>
      
    </div>
  );
};

export const Logins = () => {
  return (
    <div >
        {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
        <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2>Books Bee Books</h2>
          <p className="user">Hi! Puppy Cat!</p>
          
        </header>
    
        <Link  className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/buscar">Buscar Libros</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link>
        <nav>
      
    </nav>
    <Iniciacion/>
    </div>
  );
};

export const Search = () => {
  return (
    <div >
        {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
        <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2>Books Bee Books</h2>
          <p className="user">Hi! Puppy Cat!</p>
          
        </header>
        
    
        <Link className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link>
        <nav>
      
    </nav>
    <Buscador/>
    </div>
  );
};




export const BookInfo = () => {
  return (
    <div>
      {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
    <p className="user">Hi! Puppy Cat!</p>
    <h2>Books Bee Books</h2>

    <Link className="linkcito"  to="/">Inicio</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link>
    <nav>
      
    </nav>
      <InfoBooks/>
    </div>
  );
};


export const UserSeatch = () =>{
  return(
    <div>
      {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
    <p className="user">Hi! Puppy Cat!</p>
    <h2>Books Bee Books</h2>

    <Link className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/login">Log in</Link>
    <nav>

    </nav>
      <UsuariosS/>
    </div>

  )
}