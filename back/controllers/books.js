
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

    let book = new Book({ title: req.body.title, author: {name: author.name, age: author.age, auth_id: author._id}, publisher: mongoose.Types.ObjectId(publisher) , pages: req.body.pages, year: req.body.year, isbn: req.body.isbn, rate: req.body.rate, desc: req.body.desc, category: req.body.category, image: req.body.image})
    book = await book.save()
    author = await Author.findByIdAndUpdate(req.body.author, {$push: {books: book}}, {new: true})
    res.status(201).json({success: true, book, author})
})

// @desc Get all books
// @route GET /api/v1/books
// @access Public
exports.getBooks = asyncHandler(async (req, res, next)=>{
    res.status(200).json(res.advancedResults)
})

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access   Public
exports.getBook = asyncHandler(async (req, res, next)=>{
    const id = mongoose.Types.ObjectId(req.params.id)
    let book = await Book.aggregate(
        [
            {$match:
                {
                  _id: id,
                },
            },
            {$lookup:
                  {
                    from: "users",
                    localField: "publisher",
                    foreignField: "_id",
                    as: "publisher",
                  },
              },
              {$unwind:
                  {
                    path: "$publisher",
                    includeArrayIndex: "arrayIndex",
                    preserveNullAndEmptyArrays: false,
                  },
              },
              {$project:
                  {
                    _id: "$_id",
                    author: "$author.name",
                    author_id: "$author._id",
                    pages: "$pages",
                    title: "$title",
                    year: "$year",
                    desc: "$desc",
                    category: "$category",
                    publisher: "$publisher",
                    publisher_id: "$publisher._id",
                    rate: {
                      $divide: ["$rate", "$timesRated"],
                    },
                    reviewerRate: 1,
                    image: 1
                  },
              },
              {$lookup:
                  {
                    from: "reviews",
                    localField: "_id",
                    foreignField: "book",
                    as: "reviews",
                  },
              },
              {$unwind:
                  {
                    path: "$reviews",
                    preserveNullAndEmptyArrays: false,
                  },
              },
              {$lookup:
                  {
                    from: "users",
                    localField: "reviews.user",
                    foreignField: "_id",
                    as: "reviewer",
                  },
              },
              {$unwind: {
                  path: "$reviewer",
                  preserveNullAndEmptyArrays: false,
                },
              },
              {$group: {
                  _id: "$_id",
                  author: {
                    $first: "$author",
                  },
                  pages: {
                    $first: "$pages",
                  },
                  year: {
                    $first: "$year",
                  },
                  desc: {
                    $first: "$desc",
                  },
                  category: {
                    $first: "$category",
                  },
                  publisher: {
                    $first: "$publisher",
                  },
                  rate: {
                    $first: "$rate",
                  },
                  title: {
                    $first: "$title"
                  },
                  image:{
                    $first: "$image"
                  },
                  reviewerRate: {
                    $first: "$reviewerRate",
                  },
                  author_id: {
                    $first: "$author_id"
                  }, 
                  publisher_id:{
                    $first: "$publisher_id"
                  },  
                  reviews: {
                    $push: {
                      text: "$reviews.text",
                      reviewerName: "$reviewer.username",
                      review_id: "$reviews._id",
                      reviewer_id: "$reviewer._id",
                      rate: "$reviews.rating",
                    },
                  },
                },
              },
        
        ]
    )
    if (book.length===0)
      book = await Book.aggregate([{
        $match:
          {
            _id: id,
          },
      },
      {
          $lookup:
            {
              from: "users",
              localField: "publisher",
              foreignField: "_id",
              as: "publisher",
            },
        },
        {
          $unwind:
            {
              path: "$publisher",
              includeArrayIndex: "arrayIndex",
              preserveNullAndEmptyArrays: false,
            },
        },
        {
          $project:
            {
              _id: "$_id",
              author: "$author.name",
              author_id: "$author._id",
              pages: "$pages",
              title: "$title",
              year: "$year",
              desc: "$desc",
              category: "$category",
              publisher: "$publisher",
              publisher_id: "$publisher._id",
              rate: {
                $divide: ["$rate", "$timesRated"],
              },
              reviewerRate: 1,
              image: 1
            },
        }])
    if (book.length!==0) return res.status(200).json({success: true, data: book[0]})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}`, 404))
})


// @desc Delets one book
// @route GET /api/v1/books/:id
// @access Private
exports.deleteBook = asyncHandler(async(req, res, next)=>{
    const book = await Book.findById(req.params.id)
    if (!book) next(new ErrorResponse(`Book not found with id ${req.params.id}`, 404))
    let author = await Author.findByIdAndUpdate(book.author.auth_id, {$pull: {books: {_id: book._id}}}, {new: true})
    //Make sure user is the book owner
    if(book.publisher.toString() !== req.user.id && req.user.role !=='admin'){
        return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
    }
    await book.remove()
    return res.status(200).json({success: true, author})
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
    book = await Book.findOneAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })
    if (book) return res.status(200).json({success: true, data: book})
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
        
        if (diffRate===0) return res.status(200).json({success: true, msg: "Punctuation previously setted with same value"})

        const user = await User.findByIdAndUpdate(req.user._id, {$set: {ratedBooks: ratedBooks}}, {new: true})
        const book = await Book.findByIdAndUpdate({_id: id}, { $inc: { rate: diffRate }}, {new: true})
        
        if (book) return res.status(200).json({success: true, data: book, user})
        return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
        
    }
    ratedBooks.push(new EmbededBook({rate: req.body.rate, book: id}))
    const user = await User.findByIdAndUpdate(req.user._id, {ratedBooks}, {new: true})
    const book = await Book.findByIdAndUpdate({_id: id}, { $inc: {timesRated: 1, rate: req.body.rate}}, {new: true})
    if (book) return res.status(200).json({success: true, data: book, user})



})
// @desc Gets a new rate
// @route PUT /api/v1/books/find
// @access Public
exports.findBook = asyncHandler(async(req, res, next)=>{
    const { keyword } = req.body
    let { limit, page } = req.body

    const endIndex = page*limit
    const startIndex = (page-1)*limit
    
    const books =  await Book.find({ $or: [{ title: { $regex: keyword, $options: "i" } }, { "author.name": { $regex: keyword, $options: "i" } }] }).skip(startIndex).limit(limit)
    const count = await Book.countDocuments({ $or: [{ title: { $regex: keyword, $options: "i" } }, { "author.name": { $regex: keyword, $options: "i" } }] })
    const totalPages = Math.ceil(count/limit)


    return res.status(200).json({success: true, data: books, totalPages})
})

// @desc Gets a new rate
// @route POST /api/v1/books/filtr
// @access Public
exports.filtrBook = asyncHandler(async(req, res, next)=>{
  const {limit, skip} = req.body
  let { aggregation } = req.body
  console.log(aggregation)
  if (!aggregation){
    return next(new ErrorResponse("Must include an aggregation pipeline (some filter)", 404))
  }
  const data = await Book.aggregate(aggregation)
  res.status(200).json({success: true, data})
})