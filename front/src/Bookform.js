import './App.css'

function Form(){
    const categories = ["Aventura", "Ciencia ficcion", "Fantasia", "Gotica", "Novela negra", "Romance", "Biografia", "Distopia"]
    return(
        <>
        <div className="Entra">
            <p>Title</p>
            <input></input>
        </div>

<div className="Entra">
            <p>Author</p>
            <input></input>
</div>
<div className="Entra">
            <p>Pages</p>
            <input></input>
</div>
<div className="Entra">
            <p>Year</p>
            <input></input>
</div>
<div className="Entra">
            <p>isbn</p>
            <input></input>
</div>
<div className="Entra">
            <p>Rate</p>
            <input></input>
</div>
<div className="Entra">
            <p>Description</p>
            <input></input>
</div>
<div className="Entra">
            <p>Category</p>
            <select>
            {categories&&
              categories.map(category => (
                <option value={category}>{category}</option>
              ))

            }
          </select>
</div>
        <div className="Entra">
            <p>Reviewer rate</p>
            <input></input>
        </div>

        <button className='Adicion'>Add book</button>
        
        </>
    )
}

export default Form