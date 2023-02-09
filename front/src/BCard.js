import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ATSAT from './ATSAT.jpg'
import { Link, useParams } from "react-router-dom";

const BCard = (props) => {
  const [ButtonText, setButtonText] = useState('Agregar a lista de favoritos');
  const {title, desc, rate } = props.bookJson
  /*   function handleClick() {
    
    setButtonText('Agregado');
    // setButtonText('Agregar a lista de favoritos');
  } */
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
      {/* <button className="agrega">{ButtonText}</button> */}
      <Link to="/book">Mas informacion</Link>

      {/* <button onClick={handleClick2}>{ButtonText}</button> */}
    </Card.Body>
  </Card>
    )
}

export default BCard