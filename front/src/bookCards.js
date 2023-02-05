import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import React from 'react';
import {useState} from 'react';
// import Button from 'react-bootstrap/Button';
import ATSAT from './ATSAT.jpg'
import "./App.css"
import Booksa from './llamadera';
import { BookInfo } from './paginitas';
import { Link, useParams } from "react-router-dom";

function Cards(){

    const [ButtonText, setButtonText] = useState('Agregar a lista de favoritos');

  
   
/*   function handleClick() {
    
    setButtonText('Agregado');
    // setButtonText('Agregar a lista de favoritos');
  } */

        return(
            <>
            <Booksa></Booksa>
            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={ATSAT} />
      <Card.Body>
        <Card.Title>Nombre del libro</Card.Title>
        <Card.Text>
          descripcion del libro
        </Card.Text>
        <Card.Text>
          RAting
        </Card.Text>
        <button className="agrega" onClick={<BookInfo/>}>Mas informacion</button>
        <Link to="/book">Mas informacion</Link>
        {/* <button onClick={handleClick2}>{ButtonText}</button> */}
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={ATSAT} />
      <Card.Body>
        <Card.Title>Nombre del libro</Card.Title>
        <Card.Text>
          descripcion del libro
        </Card.Text>
        <Card.Text>
          RAting
        </Card.Text>
        <button className="agrega">{ButtonText}</button>
      </Card.Body>
    </Card>

    </>
        );


    
}


export default Cards