const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {Book} = require('../models/Book')
const { User } = require('../models/User')
const {Review} = require('../models/Review')



// @desc Get all reviews
// @route GET /api/v1/reviews
// @route GET /api/v1/books/:bookid/reviews/
// @access Public
exports.getReviews = asyncHandler(async (req, res, next)=>{

    if(req.params.bookid){
        const reviews = await Review.find({book: req.params.bookId})
        
        return res.status(200).json({
            success: true, 
            count: reviews.length,
            data: reviews
        })
    }
    res.status(200).json(res.advancedResults)
})

// @desc Get single reviews
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next)=>{
    const review = await Review.findById(req.params.id).populate({
        path: 'book',//Join
        select: 'title author' //fields shown
    })

    if (!review) next(new ErrorResponse('No review found with the id of '+req.params.id), 404)
    res.status(200).json({success: true, data: review})
})

// @desc   Post a review
// @route  Post /api/v1/books/:bookId/reviews
// @access Private
exports.addReview = asyncHandler(async (req, res, next)=>{
    req.body.book = req.params.bookid
    req.body.user = req.user.id
    const book = await Book.findById(req.body.book)
    if (!book) return next(new ErrorResponse("No book related to that id: "+req.body.book, 404))

    const review = await Review.create(req.body)

    res.status(200).json({success: true, data: review})
})

// @desc   Delete a review
// @route  Delete /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next)=>{
    req.body.user = req.user.id
    const review = await Review.findById(req.params.id)
    
    if (!review) return next(new ErrorResponse("No review related to that id: "+req.params.id, 404))

    if(review.user.toString() !== req.user.id && req.user.role !=='admin'){
        return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
    }
    await review.remove()
    if (review) return res.status(200).json({succes: true, data: {}})
})


// @desc Update one review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async(req, res, next)=>{
    req.body.user = req.user.id
    let review = await Review.findById(req.params.id)

    if (!review) return next(new ErrorResponse("No review related to that id: "+req.params.id, 404))

    if(review.user.toString() !== req.user.id && req.user.role !=='admin'){
        return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
    }
    review = await Review.findOneAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })
    
    if (review) return res.status(200).json({succes: true, data: review})
    return next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
})