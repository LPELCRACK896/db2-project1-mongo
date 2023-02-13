const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {Author} = require('../models/Author')

// @desc    Create one book
// @route   POST /api/v1/book
// @access   Public
exports.createAuthor = asyncHandler(async (req, res, next ) => {
    const data = await Author.create(req.body)
    res.status(201).json({success: true, data})
})


// @desc    Get all authors id and name
// @route   GET /api/v1/book
// @access   Public
exports.getAuthors = asyncHandler(async (req, res, next ) => {
    const data = await Author.find({}, {_id: 1, name: 1})
    res.status(200).json({success: true, data})
})