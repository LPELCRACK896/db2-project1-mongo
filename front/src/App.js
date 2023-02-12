
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, RedirectFunction} from "react-router-dom"
import { Logins, Search, Home, BookInfo, UserSeatch, Perfil, Fomulario } from './paginitas';

const rootElement = document.getElementById("root");
const NotFound = () => <h1>404: Page Not Found</h1>;

function App() {
  render(
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/book/:id" element={<BookInfo />} />
        <Route path="/usuarios" element={<UserSeatch />} />
        <Route path="/profile" element={< Perfil />} />
        <Route path="/profile/:id" element={<Perfil />} />
        <Route path="/newbook" element={<Fomulario />} /> 

      </Routes>
    </BrowserRouter>,
  rootElement
  );
  
  
}

export default App;
