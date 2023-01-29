import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import ATSAT from './ATSAT.jpg'

function App() {
  return (
    <>
    <Navbar fixed="top" />
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />


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
        {/* <Button variant="primary">Go somewhere</Button> */}
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
        {/* <Button variant="primary">Go somewhere</Button> */}
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
        {/* <Button variant="primary">Go somewhere</Button> */}
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
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </>
  );
}

export default App;
