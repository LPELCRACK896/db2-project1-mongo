import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import ATSAT from './ATSAT.jpg'
import default_book_1 from './pictures/books/default_book_1.png'
import { Link, useParams } from "react-router-dom";
import { books_HM } from './resources/images_mapping'
const BCard = (props) => {

  const {title, desc, rate, category, reviewerRate, image, _id, publisher } = props.bookJson
  const author = props.bookJson.author.name
  console.log(props.bookJson)
  return (
    <Card style={{ width: '25rem'}}>
    <Card.Img variant="top" src={books_HM[image]} alt={image} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {desc}
      </Card.Text>
      <Card.Text className='rating'>
       User rating: {rate}/5
       <br></br>
       Reviewer rating: {reviewerRate}/10
      </Card.Text>
      <Card.Text>
        Autor: {author}
      </Card.Text>
      <Card.Text className='cat'>
        Categoria: {category}
      </Card.Text>

      {/* <button className="agrega">{ButtonText}</button> */}
      <Link className="masinfo" to={`/book/${_id}`}>Mas informacion</Link>

     <Card.Text>
        Agregado por:
        <Link to={`/profile/${publisher._id}`}>
         {publisher.username}
        </Link>
      </Card.Text>
    </Card.Body>
  </Card>
    )
}

export default BCard