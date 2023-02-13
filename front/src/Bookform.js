import './App.css'
import react , {useState, useEffect}from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
function Form(){
  const categories = ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
  //Fields
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [page, setPages] = useState(null)
  const [year, setYear] = useState(null)
  const [isbn, setIsbn] = useState(null)
  const [desc, setDesc] = useState(null)
  const [category, setCategory] = useState("Aventura") 
  //Resources
  const checkField = (field) => !(field==="" || field===undefined || field===null )
  const checkSelect = (field) => !(field==="" || field===undefined || field===null || field==='any')
  const [sentForm, setSentForm] = useState(false) 
  const [authors, setAuthors] = useState([])
  const checkNum = (field) => (!isNaN(field) && isFinite(field))
  const isStringAnInt = str => {
    let parsed = Number(str);
    return !isNaN(parsed) && Number.isInteger(parsed);
  };
  const isValidForm = () =>{
    if(!(checkField(title) && checkField(page) && checkField(year) &&
    checkField(isbn) &&  checkField(desc) && 
    checkSelect(author) && checkSelect(category)))
    {
      swalWarning(`Debe completar todos los campos`)
      return false
    }
    if(!(isStringAnInt(page)&&isStringAnInt(year))){
      swalWarning(`Los campos año, paginas deben ser enteros`)
      return false
    }
    return true
  }
  const swalError = (text) => Swal.fire({ icon: 'error', title: 'Oops...', text: text, footer: '<a href="/">Back to main</a>'})
  const swalWarning = (text) => Swal.fire({ icon: "warning", title: 'Oops...', text: text, footer: '<a href="/">Back to main</Link>'})

  //Fetch data
  const fetchAuthors = async ()=>{
    await axios.get(`http://localhost:5000/api/v1/authors`)
    .then(res=>{
      if(!res.data.success){
        swalError(`Error on loading authors`)
        return 
      }
      setAuthors(res.data.data)
      setAuthor(res.data.data[0])
    }).catch(err=>{
      console.log('error')
      console.log(err)
      swalError(`Error on loading authors`)
      return 
    })
  }

  const sendForm = async ()=>{
    if(!isValidForm()) return
    const token = localStorage.getItem("token")
    if(!token){ 
      swalError("Debe loggearse para agregar un libro") 
      return 
    }
    await 
    axios.post(`http://localhost:5000/api/v1/books`, {title, author, desc, category, pages: page, year, isbn },{headers:{
      Authorization: `Bearer ${token}`
    }})
    .then(res =>{
      Swal.fire({
        icon: "success",
        title: "Libro creado con exito",
        footer: '<a href="/">Back to main</a>'
      })
    })
    .catch(err =>{
      if(err){
        Swal.fire({
          icon: "error",
          title: err.response.data.error,
        })
        return
      }
    })
  }
  //Use effect
  useEffect(()=>{
    //Fetch data
    fetchAuthors()
  }, [sentForm])

  return(
    <>
      <div className="Entra">
        <p>Title</p>
        <input onChange={e => setTitle(e.target.value)}></input>
      </div>
      <div className="Entra">
        <p>Author</p>
        <select  value={author} onChange={e=>setAuthor(e.target.value)}>
            <option value="any">Cualquier autor</option>
            {authors.length>0&&
              authors.map(atr=>(
                <option key={atr._id} value={atr._id}>{atr.name}</option>)
              )
            }
            
          </select> 
      </div>
      <div className="Entra">
        <p>Pages</p>
        <input onChange={e => setPages(e.target.value)}></input>
      </div>
      <div className="Entra">
        <p>Year</p>
        <input onChange={e => setYear(e.target.value)}></input>
      </div>
      <div className="Entra">
        <p>isbn</p>
        <input onChange={e => setIsbn(e.target.value)}></input>
      </div>
      <div className="Entra">
        <p>Description</p>
        <input onChange={e => setDesc(e.target.value)}></input>
      </div>
      <div className="Entra">
        <p>Category</p>
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories&&
          categories.map(category => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      <button className='Adicion' onClick={()=> sendForm()}>Add book</button>
        
    </>
  )
}

export default Form