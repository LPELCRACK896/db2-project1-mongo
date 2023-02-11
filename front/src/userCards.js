import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import { books_HM } from './resources/images_mapping'
const Usercards = (props) => {

  const {image } = props.bookJson
  return (
    <Card style={{ width: '25rem'}}>
        {/* Aqui va a ir la foto */}
    <Card.Img variant="top" src={books_HM[image]} alt={image} />
    <Card.Body>
        {/* Aqui va a ir el nombre de usuario */}
      <Card.Title>Username</Card.Title>

      {/* Aqui va el correo de usuario */}
      <Card.Text >
       USER EMAIL
      </Card.Text>

      {/* Aqui va el autor favorito del usuario */}

      
      <Link className="masinfo" to="/book">Mas informacion</Link>

    </Card.Body>
  </Card>
    )
}

export default Usercards