import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import { users_HM } from './resources/images_mapping'
const Usercards = (props) => {


        // aqui va lo de los autores
  const { username, image, email, _id, favAuthor } = props.userJSON
  return (
    <Card style={{ width: '25rem'}}>
        {/* Aqui va a ir la foto */}
    <Card.Img variant="top" src={users_HM[image]} alt={image} />
    <Card.Body>
        {/* Aqui va a ir el nombre de autor */}
      <Card.Title>{username}</Card.Title>

      {/* Aqui va a ir la edad del autor */}
      <Card.Text>{username}</Card.Text>

      <Link className="masinfo" to={`/profile/${_id}`}>Mas informacion</Link>

    </Card.Body>
  </Card>
    )
}

export default Usercards