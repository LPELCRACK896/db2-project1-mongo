import React from 'react';
import {  Element } from 'react-scroll'
import './profile.css'
import { users_HM } from './resources/images_mapping'
import user_default_1 from './pictures/users/default_user_3.png'
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
const Authpage = () =>{
    const [user, setUser] = useState()
    const {id} = useParams()
    const swalError = () =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que el usuario que buscas no esta!',
        footer: '<a href="/">Back to main</Link>'
      })   
    }
    const getUser = async()=>{
      await axios.get(`http://localhost:5000/api/v1/persons/${id}`, )
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
    }
    useEffect(()=>{
      if (id){
        getUser()
        return
      }
      getMe()
      console.log()
  
    }, [])
    return(
        <>


        {/* Dejo esto porque puede ser util */}
        
        <img className='PPic'src={(user?users_HM[user.image]:user_default_1)||user_default_1} alt="user_pp" style={{width: "300px"}}/>

        <p className='AuthorName'>{(user?user.username:"nombre")||"nombre"}</p>
        <div className='UserCosas'>

            <p className='role'>{(user?user.role:"rol: Autor")||"rol"}</p>

            
        </div>

        <div className='BookList'>
        <p className='Titles'>Books</p>
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
              book info
          </Element>

            <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              book info
          </Element>
          <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              book info
          </Element>
          <Element name="scroll-container-second-element" style={{
              marginBottom: '20px'
            }}>
              book info
          </Element>
          </Element>
        </div>

        
        </>
    )
}

export default Authpage