
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Book = require('../models/Book')
const Author = require('../models/Author')
const { query } = require('express')

// @desc    Create single book
// @route   POST /api/v1/books
// @access   Private
exports.createBook = asyncHandler(async (req, res, next ) => {
    const author = await Author.findById(req.body.author);
    if(!author) return next(new ErrorResponse(`Couldnt find the author with id ${req.body.author}'`, 404))
    let book = new Book({ title: req.body.title, author: author._id, publisher: req.body.publisher , pages: req.body.pages, year: req.body.year, isbn: req.body.isbn, rate: req.body.rate, desc: req.body.desc })
    book = await book.save()
    res.status(201).json({succes: true, book})
})

// @desc Get all books
// @route GET /api/v1/books
// @access Public
exports.getBooks = asyncHandler(async (req, res, next)=>{
    let query
 
    //Copy of req.query
    const reqQuery =  { ...req.query }
    //Fields to exclue
    const removeFields = ['select', 'sort']
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
    const books = await query

    res.status(200).json({succes: true, count: books.length, data: books})
})

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access   Public
exports.getBook = asyncHandler(async (req, res, next)=>{
    const book = await Book.findById(req.params.id)
    if (book) return res.status(200).json({succes: true, book})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})


// @desc Delets one book
// @route GET /api/v1/books/:id
// @access Private
exports.deleteBook = asyncHandler(async(req, res, next)=>{
    const book = await Book.findByIdAndDelete(req.params.id)
    if (book) return res.status(200).json({succes: true, data: {} })
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})

// @desc Update one book
// @route PUT /api/v1/books/:id
// @access Private
exports.updateBook = asyncHandler(async(req, res, next)=>{
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })
    if (book) return res.status(200).json({succes: true, data: book})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})