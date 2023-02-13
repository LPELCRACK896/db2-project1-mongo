import React from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import './profile.css'
import { users_HM } from './resources/images_mapping'
import user_default_1 from './pictures/users/default_user_3.png'
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

function Profile(){
  const [user, setUser] = useState()
  const {id} = useParams()
  const [isItMe, setIsItMe] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const swalError = () =>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Parece que el usuario que buscas no esta!',
      footer: '<a href="/">Back to main</Link>'
    })   
  }
  const deleteUser = async ()=>{
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No es posible revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token")
        if (!token) {
          Swal.fire(
            {
              title:'No tienes permiso para realizar esta accion',
              text: 'Solo puede borrar tu propio perfil',
              icon: 'warning',
              footer: '<a href="/">Back to main</Link>'
          })
          return
        }
        if(!user._id){
          Swal.fire(
            {
              title:'No parece a ver nada que borrara por aquí...',
              icon: "info",
              footer: '<a href="/">Back to main</Link>'
          })
          return
        }
        console.log(user._id)
        axios.delete(`http://localhost:5000/api/v1/persons/${user._id}`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        .then(res =>{
          if(!res.data.success){
            Swal.fire({
              icon: "error",
              title: "No es posible realizar esta accion",
              text: res.data.error,
            })
            return
          }
          Swal.fire(
            {
              title:'Borrado!',
              text: 'El usuario ha sido borrado con exito.',
              icon: 'success',
              footer: '<a href="/">Back to main</Link>'
          }
          )
        })
        .catch(error=>{
          console.log(error)
          Swal.fire({
            icon: "error",
            title: "No es posible realizar esta accion",
            text: error.response.data.error,
          })
          return
        })

      }
    })
  }

  const logout = ()=>{
    try {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        Swal.fire({
          icon: "success",
          title: 'Ha cerrado sesion con exito.',
          footer: '<a href="/">Back to main</a>'
        }) 
      }else{
        Swal.fire({
          icon: "warning",
          title: 'Oops...',
          text: 'Mi estimado. Usted ni se ha loggeado. ',
          footer: '<a href="/">Back to main</a>'
        }) 
      }
    } catch (error) {
      Swal.fire({
        icon:"error",
        title: "Hubo un error al intentar desloggearse (es posible que no haya estado loggeado en primera lugar"
      })
      console.error(error);
    }
  }
  const getUser = async()=>{
    await axios.get(`http://localhost:5000/api/v1/persons/users/${id}`, )
    .then(res => {
      res = res.data
      console.log(res)
      if (!res.success || !res.data) {
        swalError()
        return
      }
      setUser(res.data)
    })
    .catch(err =>{
      swalError()   
      console.log(err)
    })
    
    
  }
  const getMe = async() =>{
    const token = localStorage.getItem("token")
    if(!token) return
    const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
      headers:{
        Authorization: `Bearer ${token}`
      }
    } ).then(res => res.data)
    if(!res.success) return
    setUser(res.data)
    fetchIsItMe(res.data._id)
  }
  const fetchIsItMe = async(ID)=>{
    if (!user) return
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:5000/api/v1/auth/isitme/${ID}`,{ 
    headers:{
      Authorization: `Bearer ${token}`
    }}).then(res=> res.data)
    console.log(res)
  }
  useEffect(()=>{
    if (id){
      getUser()
      fetchIsItMe(id)
      return
    }
    getMe()
    console.log(user)
    
  }, [])
    return(
        <>
        
        <img className='PPic'src={(user?users_HM[user.image]:user_default_1)||user_default_1} alt="user_pp" style={{width: "300px"}}/>

        <p className='UserName'>{(user?user.username:"nombre")||"nombre"}</p>
        <button className='add'>Add friend</button>
        <button className='Logout' onClick={logout}>Log Out</button>
        <div className='UserCosas'>
            <p className='correo'>{(user?user.email:"email")||"email"}</p>

            <p className='role'>{(user?user.role:"rol")||"rol"}</p>

            <p className='FavAuth'>{(user?(user.favAuthor?user.favAuthor.name:"Aun no tiene autor favorito :("):"No parece tener autor favorito")||"autor favorito"}</p>
        </div>

        

        <div className='Favbooks'>
            <p className='Librous'>
                <p className='Favoritos'>Favorite books</p>
                <br></br>
            <Element className="element" id="scroll-container" style={{ position: 'relative', height: '200px', overflow: 'scroll',marginBottom: '100px'}}>
{/*             {user.favBooks&&
            user.favBooks.map(book=>{
                <Element style={{ marginBottom: '10px'}}> book info 1 </Element>
            })
            } */}
          </Element>
            </p>
        </div>

        

        <div className='Favbooks'>
        <p className='Favoritos'>Bookish friends</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              This is the longest name a person can have
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Rated books</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Book1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Book 2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>Currently reading</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Friend1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>

        <div className='Favbooks'>
        <p className='Favoritos'>TBR</p>
                <br></br>
          <Element className="element" id="scroll-container" style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}>

            <Element name="scroll-container-first-element" style={{
              marginBottom: '20px'
            }}>
              Friend1
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              Friend2
          </Element>
          </Element>

          
        </div>

        <div>
          <button className='eliminar' onClick={deleteUser}>Delete profile</button>
        </div>
        </>
    )
}

export default Profile