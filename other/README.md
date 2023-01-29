# Generador de libros y autores aleatorio
Generador aleatorio de nombres de libros y autores que se insertan en la base de datos de mongo apropiadamente relacionados entre ellos. 

## Getting started

### Prerequisitos
```
Python 3.10.4 or higher
```
### Installing

```
pip install Faker
pip install pandas
pip install pymongo
pip install requests
```
### constants.py
Para que funcione correctamente el main, depende de un archivo que debe crearse localmanete (constants.py) dentro de este se espere es tengan las siguientes constantes: 
- *MONGO_URI* (str) -->  La conexion con la base de datos. https://www.mongodb.com/docs/manual/reference/connection-string/
- *URL* (str) --> Dirección donde esta corriendo el backend. Suele ser http://localhost:3000
- *AUTHORS_COLLECTION* (str) --> El nombre de la coleccion de autores. Se espera sea algo así como "authors"
- *DB_NAME* = Nombre de la base de datos en mongoDB. 
- *BOOKS_COLLECTION* = El nombre de la coleccion de libros. Se espera sea algo así como "books"
- *CSV_AUTH_FILENAME* --> Direccion de el nombre y la direccion en la que se espera guardar el archivo csv de autores aleatorios.  Ejemplo: "./other/authors.csv"
