import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { render } from "react-dom";
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

import { Logins,Search,Home,BarWithID } from './paginitas';

const rootElement = document.getElementById("root");

function App() {
  render(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="bar/:id" element={<BarWithID />} />
      </Routes>
    </BrowserRouter>,
  rootElement
  );
  
  
}

export default App;
