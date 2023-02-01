import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Card from 'react-bootstrap/Card';
import './App.css';
import React from 'react';
// import {useState} from 'react';
// import Button from 'react-bootstrap/Button';
// import ATSAT from './ATSAT.jpg'
import Cards from './bookCards';
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Iniciacion from './login';

import { Logs,Foo,Bar } from './paginitas';

function Inicio() {
  const rootElement = document.getElementById("root");

  return (  
    <>
    


    

{/* las cards */}
      <Cards></Cards>
    
    </>
    
  );
  
  
}

export default Inicio;
