
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {Book} = require('../models/Book')
const {Author} = require('../models/Author')
const {User, EmbededBook} = require('../models/User')
const { mongoose } = require('mongoose')

// @desc    Create single book
// @route   POST /api/v1/books
// @access   Private
exports.createBook = asyncHandler(async (req, res, next ) => {
    let author = await Author.findById(req.body.author);
    if(!author) return next(new ErrorResponse(`Couldnt find the author with id ${req.body.author}'`, 404))
    //Solo tendra publisher en caso se hagan la insercion en python -> retirar proteccion de ruta en routes
    let publisher = await User.findById(req.body.publisher);
    publisher = publisher ? publisher: req.user.id
    if(!publisher) return next(new ErrorResponse(`Couldnt find the author with id ${req.body.publisher}'`, 404))

    let book = new Book({ title: req.body.title, author: {name: author.name, age: author.age, auth_id: author._id}, publisher: mongoose.Types.ObjectId(publisher) , pages: req.body.pages, year: req.body.year, isbn: req.body.isbn, rate: req.body.rate, desc: req.body.desc, category: req.body.category})
    book = await book.save()
    author = await Author.findByIdAndUpdate(req.body.author, {$push: {books: book}}, {new: true})
    res.status(201).json({succes: true, book, author})
})

// @desc Get all books
// @route GET /api/v1/books
// @access Public
exports.getBooks = asyncHandler(async (req, res, next)=>{
    let query
 
    //Copy of req.query
    const reqQuery =  { ...req.query }
    //Fields to exclue
    const removeFields = ['select', 'sort', 'page', 'limit']
    //Loop over removeFields and delete them for reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    //Create a query string    
    let queryStr = JSON.stringify(reqQuery)

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`) //Transform query operators into actual operators so Mongo can understand the query
    
    //Finding resources
    query = Book.find(JSON.parse(queryStr))


    //Select fields ---> Projection
    if (req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields) //project
    }

    // Sort ---> Sort
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }
    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 20
    const startIndex = (page -1)*limit
    const endIndex = page * limit
    const total = await Book.countDocuments()

    query = query.skip(startIndex).limit(limit)//MongoQuery Limit and skip
    //Executing query
    const books = await query

    //Pagination result
    const pagination = {}
    if(endIndex < total){
        pagination.next = {
            page: page+1,
            limit
        }
    }
    if (startIndex>0){
        pagination.prev = {
            page: page-1,
            limit
        }
    }
    res.status(200).json({succes: true, count: books.length, pagination, data: books})
})

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access   Public
exports.getBook = asyncHandler(async (req, res, next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    const book = await Book.aggregate([
        {$match: {_id: id}}, 
        {$project: {
            _id: "$_id",
            author: "$author.name",
            pages: "$pages",
            year: "$year",  
            desc: "$desc",
            category: "$category",
            rate: {$divide: ["$rate", "$timesRated"]}
        }}
    ])
    if (book) return res.status(200).json({succes: true, book: book[0]})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})


// @desc Delets one book
// @route GET /api/v1/books/:id
// @access Private
exports.deleteBook = asyncHandler(async(req, res, next)=>{
    let book = await Book.findById(req.params.id)
    if (!book) next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
    let author = await Author.findByIdAndUpdate(book.author.auth_id, {$pull: {books: {_id: book._id}}}, {new: true})
    //Make sure user is the book owner
    if(book.publisher.toString() !== req.user.id && req.user.role !=='admin'){
        return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
    }
    book = await Book.findByIdAndDelete(req.params.id)
    if (book) return res.status(200).json({succes: true, author})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})

// @desc Update one book
// @route PUT /api/v1/books/:id
// @access Private
exports.updateBook = asyncHandler(async(req, res, next)=>{
    const book = await Book.findById(req.params.id)
    if (!book) return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))

    if(book.publisher.toString() !== req.user.id && req.user.role !=='admin'){
        return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
    }
    book = await Book.findOneAndDelete(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })
    if (book) return res.status(200).json({succes: true, data: book})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})

// @desc Gets a new rate
// @route PUT /api/v1/books/:id
// @access Private
exports.newRate = asyncHandler(async(req, res, next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    const ratedBooks = req.user.ratedBooks
    const filtr_books = ratedBooks? ratedBooks.filter( (element) =>  element.book.toString() ==req.params.id ): ratedBooks
    
    if (filtr_books.length!==0){ //Ya habia sido calificado
        const diffRate = parseFloat(req.body.rate) - filtr_books[0].rate 
        
        ratedBooks.map(book =>{
            if (book.book.toString() == req.params.id) book.rate = parseFloat(req.body.rate)
            return book
        })
        
        if (diffRate===0) return res.status(200).json({succes: true, msg: "Punctuation previously setted with same value"})

        const user = await User.findByIdAndUpdate(req.user._id, {$set: {ratedBooks: ratedBooks}}, {new: true})
        const book = await Book.findByIdAndUpdate({_id: id}, { $inc: { rate: diffRate }}, {new: true})
        
        if (book) return res.status(200).json({succes: true, data: book, user})
        return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
        
    }
    ratedBooks.push(new EmbededBook({rate: req.body.rate, book: id}))
    const user = await User.findByIdAndUpdate(req.user._id, {ratedBooks}, {new: true})
    const book = await Book.findByIdAndUpdate({_id: id}, { $inc: {timesRated: 1, rate: req.body.rate}}, {new: true})
    if (book) return res.status(200).json({succes: true, data: book, user})



})
