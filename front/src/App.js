
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Logins,Search,Home,BookInfo, UserSeatch } from './paginitas';

const rootElement = document.getElementById("root");

function App() {
  render(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/book" element={<BookInfo />} />
        <Route path="/usuarios" element={<UserSeatch />} />
      </Routes>
    </BrowserRouter>,
  rootElement
  );
  
  
}

export default App;
