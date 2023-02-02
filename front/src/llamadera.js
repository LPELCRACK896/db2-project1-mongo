import React, {useEffect,useState} from "react"
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import "./App.css"


function Booksa(){
   
    const [products, setProduts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const data = await fetch('http://localhost:5000/api/v1/books', {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
          })
            .then((res) => res.json())
            .catch((error) => console.log(error));
          setProduts(Array(data));
          
        };
        fetchProducts();
        console.log(products)
    },[]);



    function ProductList({ products }) {
        return (
          <ul>
            {products.map(product => (
              <li key={product.title}>
                <p>Title: {product.data}</p>
                <p>Price: {product.price}</p>
              </li>
            ))}
            
          </ul>
        );
      }

   
      


return(
    
    <div>
            <p>Title : {ProductList}</p>

             
        </div>
    
    )
}

export default Booksa