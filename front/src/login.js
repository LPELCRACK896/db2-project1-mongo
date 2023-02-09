
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {useState} from 'react';
import Swal from 'sweetalert2';



  
function Iniciacion() {
  const [authMode, setAuthMode] = useState("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [typeOfUser, setTypeOfUser] = useState("user")

  const showLoading = function() {
    let timerInterval
    Swal.fire({
      title: 'Loading',
      timer: 2000,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
    setEmail("")
    setName("")
    setPassword("")
    setTypeOfUser("user")
  }
    
  const checkField = (field) => !(field==="" || field===undefined || field===null)
    
  const login = async (e)=>{
    e.preventDefault()
    if (!(checkField(email) && checkField(password))){
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Parece que olvido llenar todos los campos',
        footer: 'Por favor llene todos los campos',
      })
      return
    }
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then( res => res.json())    
    if (!res.success){
      const errsHtml = res.err?`<ul>${res.error.split(",").map(err => `<li>${err}</li>`).toString()}</ul>`:"Unexpected error"
      Swal.fire({
        icon: "error",
        title: "No se encontro al usuario",
        html: errsHtml
      })
      return
    }
    Swal.fire({
      icon: "success",
      title: "Succesfully register user"
    })
  }

  const registerBtn =  async (e) =>{
    e.preventDefault()
    if (!(checkField(email) && checkField(name) && checkField(password) && checkField(typeOfUser))){
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Parece que olvido llenar todos los campos',
        footer: 'Por favor llene todos los campos',
      })
      return
    }
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))){
      Swal.fire({
        icon: 'warning',
        title: 'Correo invalido',
        text: 'Ingrese una direccion de correo valida',
      })
      return
    }
    if(password.length<6){
      Swal.fire({
        icon: 'warning',
        title: 'Contraseña invalida',
        text: 'La contraseña debe tener un mimo de 6 caracteres',
      })
      return
    }
    const res = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: name,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
    }).then( res => res.json())
    if (!res.success){
      const errsHtml = res.err?`<ul>${res.error.split(",").map(err => `<li>${err}</li>`).toString()}</ul>`:"Error"
      Swal.fire({
        icon: "error",
        title: "No se pudo registrar al usuaro, vuelve a intentarlo",
        html: errsHtml
      })
      return
    }
    Swal.fire({
      icon: "success",
      title: "Usuario registrado"
    })
  }
    

  if (authMode === "signin") {
    return (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">

              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange = { e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  minlength="10" 
                  onChange = { e => setPassword(e.target.value)}

                />
                
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={login}>
                  Submit
                </button>
              </div>
              
            </div>
          </form>
        </div>
      )
    }
  
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={ e => setName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange = { e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                minlength="10" 
                onChange={e=> setPassword(e.target.value)}
              />



            <div>
                <p></p>
            <label>Are you a...?</label>
            <div id="userType">
	            <input type="radio" value="publisher" name="usertype"height="10px" checked={typeOfUser === "publisher"} onChange = {(e)=> setTypeOfUser(e.target.value)}/>
              <label>Publisher</label> 

	            <input type="radio" value="user" name="usertype" checked={typeOfUser === "user"} onChange = {(e)=> setTypeOfUser(e.target.value)}/>
              <label>Reader</label> 
 
	            <input type="radio" value="reviewer" name="usertype" checked={typeOfUser === "reviewer"} onChange = {(e)=> setTypeOfUser(e.target.value)}/>
              <label>Reviewer</label> 
 
            </div>
            
            </div>



            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={registerBtn}>
                Submit
              </button>
            </div>
            
          </div>
        </form>
      </div>
    )
  }


export default Iniciacion