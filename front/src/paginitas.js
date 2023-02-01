import { Link, useParams } from "react-router-dom";
import Inicio from "./Inicio";
import Iniciacion from "./login";

export const Home = () => {
  return (
    <div>
        <nav>
        <Link to="/login">Foo</Link> | <Link to="/bar">Bar</Link>
      </nav>
      <Inicio/>
      
    </div>
  );
};

export const Logins = () => {
  return (
    <div>
    <nav>
        <Link to="/">Inicio</Link> | <Link to="/bar">Bar</Link>
      </nav>
    <Iniciacion/>
    </div>
  );
};

export const Bar = () => {
  return (
    <div>
      <h2>Bar</h2> 
	<Link to="/bar/1"> Bar 1</Link> |  <Link to="/bar/2">Bar 2</Link> | <Link to="/bar/3"> Bar 3</Link>
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