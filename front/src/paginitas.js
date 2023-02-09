import { Link, useParams } from "react-router-dom";
import Inicio from "./Inicio";
import Iniciacion from "./login";
import Buscador from "./search"
import InfoBooks from "./InfoLibro";
import "./App.css"
import Girl from './iconocito.png'
import {useState, useEffect} from 'react';
import axios from "axios";

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
    <div>
        <img src={Girl} alt="Girl reading " className="personita"/>
        <p className="user">Hi! {username}</p>
        <h2>Books Bee Books</h2>
        <nav className="Navegador">
        <Link to="/login" color="white">Log in</Link> | <Link to="/buscar">Buscar</Link>
        
      </nav>
      <Inicio/>
      
    </div>
  );
};

export const Logins = () => {
  return (
    <div>
        <img src={Girl} alt="Girl reading " className="personita"/>
        <h2>Books Bee Books</h2>
    <nav className="Navegador">
        <Link to="/">Inicio</Link> | <Link to="/buscar">Buscar</Link>
      </nav>
    <Iniciacion/>
    </div>
  );
};

export const Search = () => {
  return (
    <div>
        <img src={Girl} alt="Girl reading " className="personita"/>
        <p className="user">Hi! Puppy Cat!</p>
        <h2>Books Bee Books</h2>
    <nav className="Navegador">
        <Link to="/">Inicio</Link> | <Link to="/login">Log in</Link>
      </nav>
    <Buscador/>
    </div>
  );
};




export const BookInfo = () => {
  return (
    <div><img src={Girl} alt="Girl reading " className="personita"/>
    <p className="user">Hi! Puppy Cat!</p>
    <h2>Books Bee Books</h2>
<nav className="Navegador">
    <Link to="/">Inicio</Link> | <Link to="/login">Log in</Link>
  </nav>
      <InfoBooks/>
    </div>
  );
};