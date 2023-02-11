import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ATSAT from './ATSAT.jpg'
import { Link, useParams } from "react-router-dom";

const BCard = (props) => {

  const {title, desc, rate, category } = props.bookJson

  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={ATSAT} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {desc}
      </Card.Text>
      <Card.Text>
        {rate}/10
      </Card.Text>
      <Card.Text>
        Autor: 
      </Card.Text>
      <Card.Text>
        Categoria: {category}
      </Card.Text>

      {/* <button className="agrega">{ButtonText}</button> */}
      <Link to="/book">Mas informacion</Link>

     <Card.Text>
        Agregado por: 
      </Card.Text>
    </Card.Body>
  </Card>
    )
}

export default BCard