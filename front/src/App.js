import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import React from 'react';
import {useState} from 'react';
// import Button from 'react-bootstrap/Button';
import ATSAT from './ATSAT.jpg'

function App() {

  const [ButtonText, setButtonText] = useState('Agregar a lista de favoritos');

  
    const asignacion = (id_child) => {
      setButtonText("Agregado")
    }
  function handleClick() {
    
    setButtonText('Agregado');
    // setButtonText('Agregar a lista de favoritos');
  }
  



  return (
    <>
    <Navbar fixed="top" />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Books Bee Books</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Authors</Nav.Link>
            <Nav.Link href="#pricing">Profile</Nav.Link>
            <Nav.Link href="#pricing">Log in</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

    

{/* solo para probar se quemaron datos */}
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
        <button className="agrega" onClick={() => asignacion()}>{ButtonText}</button>
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
        <button className="agrega" onClick={() => asignacion()}>{ButtonText}</button>
      </Card.Body>
    </Card>
    
    </>
    
  );
  
  
}

export default App;
