import { Link, useParams } from "react-router-dom";
import Inicio from "./Inicio";
import Iniciacion from "./login";
import Buscador from "./search"
import InfoBooks from "./InfoLibro";
import Profile from "./profile";
import Form from "./Bookform";
import AuthLook from "./Authorsearch";
import Authpage from "./AuthorPage";
import Poporopo from "./poporopo";
import "./App.css"
import logo from './Logo.png'
import {useState, useEffect} from 'react';
import axios from "axios";
import UsuariosS from "./usersearch";
import { users_HM } from './resources/images_mapping'
import user_default_1 from './pictures/users/default_user_1.png'

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
  }, [])
  return (
    <div >
        {/* <img src={Girl} alt="Girl reading " className="personita"/> */}
        <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
          <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
           <Link  className="linkcito" to="/buscar">Buscar Libros</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
          
        </header>
        <nav className="Navegacion">
      Filtros | <select className="menu"><option className= "opciones" value="Cat0">Cualquier categoria</option>
                  <option value="Cat1">Novela</option>
                  <option value="Cat2">Fantasia</option>

                </select> | <select className="menu">
                  <option className= "opciones" value="Auth0">Cualquier autor</option>
                  <option value="Auth1">Author1</option><option value="Auth2">Author2</option>

                </select> | <select className="menu">
                  <option className= "opciones" value="Pub0">Cualquier publicador</option>
                  <option value="Pub1">Bloomsbury</option><option value="Pub2">Harper</option>
                  <option value="Pub3">Penguin</option>

                </select> | <select className="menu">
                  <option className= "opciones" value="Rating">Cualquier rating</option>
                  <option value="rateHigh">5-4</option>
                  <option value="rateMid">2-3</option>
                  <option value="rateLow">0-1</option>
                </select>
    </nav>
      <Inicio/>
      
    </div>
  );
};

export const Logins = () => {
  
  return (
    <div >
        <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
        <nav className="Navegacion">
        <Link  className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/buscar">Buscar Libros</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
        
    </nav>
    </header>
    <Iniciacion/>
    </div>
  );
};

export const Search = () => {
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
          <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
          <nav className="Navegacion">
        <Link className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
        
      
    </nav>
        </header>
        
    
    <Buscador/>
    </div>
  );
};


export const BookInfo = () => {
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
      <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
          <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
          <nav className="Navegacion">
    <Link className="linkcito"  to="/">Inicio</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
    
      
    </nav>
    </header>
      <InfoBooks/>
    </div>
  );
};


export const UserSeatch = () =>{
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
      if(!res.success) return
      setUsername(res.data.username)
    }
    getMe()
  })
  return(
    
    <div>
      <header className="Cabeza">
    <img src={logo} alt="bee pattern " className="bee"/>
    <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
    <h2 className="comp">Books Bee Books</h2>

    <Link className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/buscar">Buscar libros</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
    <nav>

    </nav></header>
      <UsuariosS/>
    </div>

  )
}

export const Perfil = () =>{
  return(
    
    <div>
      <header className="Cabeza">
    <img src={logo} alt="bee pattern " className="bee"/>{/*<img src={(user?users_HM[user.image]:user_default_1)||user_default_1} alt="bee pattern " className="bee"/>*/ }
    <p className="user" ><Link  className="user" to="/newbook">Add book</Link></p>
    <h2 className="comp">Books Bee Books</h2>

    <Link className="linkcito" to="/">Inicio</Link> | <Link className="linkcito" to="/buscar">Buscar libros</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
    <nav>

    </nav></header>
      <Profile/>
    </div>

  )
}

export const Fomulario =()=>{
  return(
    <div>
    <header className="Cabeza">
    <img src={logo} alt="bee pattern " className="bee"/>
    
    <h2 className="comp">Books Bee Books</h2>

    <Link className="linkcito" to="/">Inicio</Link> 
    <nav>

    </nav>
    </header>
    <Form/>
    </div>
  )
}


export const AuthorBuscar = () => {
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
      <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
          <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
          <nav className="Navegacion">
    <Link className="linkcito"  to="/">Inicio</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/buscar">Buscar libros</Link>
    
      
    </nav>
    </header>
      <AuthLook/>
    </div>
  );
};

export const AuthorPagina=()=>{
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
  return(
    <div>
      <header className="Cabeza">
          <img src={logo} alt="bee pattern " className="bee"/>
          <h2 className="comp">Books Bee Books</h2>
          <p className="user" ><Link  className="user" to="/login">{username}</Link></p>
           <Link  className="linkcito" to="/buscar">Buscar Libros</Link> | <Link className="linkcito" to="/usuarios">Buscar usuarios</Link> | <Link className="linkcito" to="/author">Buscar autores</Link>
          
        </header>

        <Authpage/>
    </div>
  )
}

export const Testero =()=>{
  return(
    <div>
    <header className="Cabeza">
    <img src={logo} alt="bee pattern " className="bee"/>
    
    <h2 className="comp">Books Bee Books</h2>

    <Link className="linkcito" to="/">Inicio</Link> 
    <nav>

    </nav>
    </header>
    <Poporopo/>
    </div>
  )
}