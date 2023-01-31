const express = require('express')
const dotenv = require('dotenv')
const morgan =  require('morgan')
const colors =  require('colors')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({ path: './config/config.env' })
// Connect to DB
connectDB()

//Route files
const books = require('./routes/books')
const authors = require('./routes/authors')
const auth = require('./routes/auth')
const users = require('./routes/users')


const app = express()

//Body Parser
app.use(express.json()) //Sin esta linea, los controladores no acceden al req.body

//Cookie pareser
app.use(cookieParser())

// Dev logging middlewares
if(process.env.NODE_ENV == 'development') app.use(morgan('dev'))

//Mount routes
app.use('/api/v1/books', books)
app.use('/api/v1/authors', authors)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

//Error handler middleware -> Must be after Mounting routes so it works in those. Middleware kinda works in a linear order. 
app.use(errorHandler)

//Launch server
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

// Handled unhandled promised rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error ${err.message}`.red.italic)
    // Close server & exit process
    server.close(()=>{process.exit(1 )})
})