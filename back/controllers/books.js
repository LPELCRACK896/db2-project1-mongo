
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Book = require('../models/Book')
const Author = require('../models/Author')

// @desc    Create one book
// @route   POST /api/v1/book
// @access   Public
exports.createBook = asyncHandler(async (req, res, next ) => {
    console.log(req.body)
    const author = await Author.findById(req.body.author);
    if(!author) {
        return res.status(404).json({
            success: false,
            error: "Author not found"
        });
    }
    const data = await Book.create({
        title: req.body.title,
        author: author._id,
        pages: req.body.pages
    })
    res.status(201).json({succes: true, data})
})
