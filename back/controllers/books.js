
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access   Public
exports.getBooks = asyncHandler(async (req, res, next) => {
    console.log('getBooks')
    res.sendStatus(200)
/*     let query
    // Copy req.query
    const reqQuery = {...req.query}

    // Fields to exclude
    const reomveFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete from the reqQuery
    reomveFields.forEach(param => delete reqQuery[param])
    // Create query string
    let queryStr = JSON.stringify(reqQuery)
    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    // Finding resources
    query = Bootcamp.find(JSON.parse(queryStr))
    
    // Select fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }
    //Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
 
    }
    // Pagination
    const page = parseInt(req.query.page, 10) || 1
    const limit = parseInt(req.query.limit, 10) || 25
    const startIndex = (page - 1) * limit
    const endIndex = page*limit;
    const total = await Bootcamp.countDocuments()

    query.skip(startIndex).limit(limit)

    // Executing query
    const data = await query

    // Pagination result
    const pagination = {}
    if(endIndex<total){
        pagination.next = {
            page:page + 1,
            limit
        }
    }
    if (startIndex>0){
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    res.status(200).json({ succes: true, count: data.length, data, pagination }) */
})

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access   Public
exports.getBook = asyncHandler(async (req, res, next) => {
/*     const bootcamp = await Bootcamp.findById(req.params.id)
    if (bootcamp) return res.status(200).json({ succes: true, bootcamp })
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)) */
})

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBook = asyncHandler(async (req, res, next) => {
/*     const data = await Bootcamp.create(req.body)
    res.status(201).json({succes: true, data}) */

})

// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBook = asyncHandler(async (req, res, next) => {
/*     const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true
    })
    if (bootcamp) return res.status(200).json({ succes: true, data: bootcamp })
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)) */
})

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBook = asyncHandler(async (req, res, next) => {
/*     const data = await Bootcamp.findByIdAndDelete(req.params.id)
    if (data) return res.status(200).json({ succes: true, data: {} })
    return next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404)) */

})