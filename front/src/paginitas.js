import { Link, useParams } from "react-router-dom";
import Inicio from "./Inicio";
import Iniciacion from "./login";
import Buscador from "./search"
import "./App.css"

export const Home = () => {
  return (
    <div>
        <nav className="Navegador">
        <Link to="/login" color="white">Log in</Link> | <Link to="/buscar">Buscar</Link>
      </nav>
      <Inicio/>
      
    </div>
  );
};

export const Logins = () => {
  return (
    <div>
    <nav className="Navegador">
        <Link to="/">Inicio</Link> | <Link to="/buscar">Buscar</Link>
      </nav>
    <Iniciacion/>
    </div>
  );
};

export const Search = () => {
  return (
    <div>
    <nav className="Navegador">
        <Link to="/">Inicio</Link> | <Link to="/login">Log in</Link>
      </nav>
    <Buscador/>
    </div>
  );
};




export const BarWithID = () => {
  const params = useParams();
  return (
    <div>
      <h2>Bar with ID: {params.id}</h2>
    </div>
  );
};