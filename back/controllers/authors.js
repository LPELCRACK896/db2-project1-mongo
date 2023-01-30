const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {Author} = require('../models/Author')

// @desc    Create one book
// @route   POST /api/v1/book
// @access   Public
exports.createAuthor = asyncHandler(async (req, res, next ) => {
    const data = await Author.create(req.body)
    res.status(201).json({succes: true, data})
})
