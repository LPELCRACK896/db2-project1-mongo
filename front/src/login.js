
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {useState} from 'react';



  
function Iniciacion() {
    let [authMode, setAuthMode] = useState("signin")


      


  
    const changeAuthMode = () => {
      setAuthMode(authMode === "signin" ? "signup" : "signin")
    }
function verificador(){
    ("input:checkbox").click(function () {
        var bol = ("input:checkbox:checked").length >= 1;
        ("input:checkbox").not(":checked").attr("disabled", bol);
      });
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
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
                
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
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
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />



            <div>
                <p></p>
            <label>Are you a...?</label>
            <div id="checkboxgroup">
	            <input type="checkbox" className="cajitas" />Publisher 
	            <input type="checkbox" className="cajitas" />Reader 
	            <input type="checkbox" className="cajitas" />Reviewer 
            </div>
            
            </div>



            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            
          </div>
        </form>
      </div>
    )
  }


  export default Iniciacion