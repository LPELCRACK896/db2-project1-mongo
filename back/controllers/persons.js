const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {User, EmbededBook} = require('../models/User')
const {Book} = require('../models/Book')
const { mongoose } = require('mongoose')


// @desc    Get all users
// @route   GET /api/v1/persons
// @access  Private
exports.getPersons = asyncHandler(async(req, res, next)=>{
    res.status(200).json(res.advancedResults)
})

// @desc    Add a user in a friend into a list
// @route   POST /api/v1/persons
// @access  Private
exports.addFriend = asyncHandler(async(req, res, next)=>{

})

// @desc    Delete a user of a friend list
// @route   PUT /api/v1/persons
// @access  Private
exports.deleteFriend = asyncHandler(async(req, res, next)=>{

})

// @desc    Delete a user of a friend list
// @route   PUT /api/v1/persons
// @access  Private
exports.findPeople = asyncHandler(async(req, res, next)=>{
    const { keyword } = req.body
    let { limit, page } = req.body

    const endIndex = page*limit
    const startIndex = (page-1)*limit
    
    const books =  await User.find({ $or: [{ username: { $regex: keyword, $options: "i" } }, { "email": { $regex: keyword, $options: "i" } }, { "role": { $regex: keyword, $options: "i" } }] }).skip(startIndex).limit(limit)
    const count = await User.countDocuments({ $or: [{ username: { $regex: keyword, $options: "i" } }, { "email": { $regex: keyword, $options: "i" } }, { "role": { $regex: keyword, $options: "i" } }] })
    const totalPages = Math.ceil(count/limit)


    return res.status(200).json({success: true, data: books, totalPages})
})

// @desc    Delete a user of a friend list
// @route   PUT /api/v1/persons
// @access  Private
exports.getPerson = asyncHandler(async(req, res, next)=>{
    const user = await User.findById(req.params.id)
    res.status(200).json({
        success: true, 
        data: user
    })
})

// @desc    Get a list of publishers
// @route   GET /api/v1/publishers
// @access  Public
exports.getPublishers = asyncHandler(async(req, res, next)=>{
    const user = await Book.aggregate([
        {
          $group:
            /**
             * _id: The id of the group.
             * fieldN: The first field name.
             */
            {
              _id: "$publisher",
            },
        },
        {
          $lookup:
            /**
             * from: The target collection.
             * localField: The local join field.
             * foreignField: The target join field.
             * as: The name for the results.
             * pipeline: Optional pipeline to run on the foreign collection.
             * let: Optional variables to use in the pipeline field stages.
             */
            {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "publisher",
            },
        },
        {
          $unwind:
            /**
             * path: Path to the array field.
             * includeArrayIndex: Optional name for index.
             * preserveNullAndEmptyArrays: Optional
             *   toggle to unwind null and empty values.
             */
            {
              path: "$publisher",
              includeArrayIndex: "arrayIndex",
              preserveNullAndEmptyArrays: false,
            },
        },
        {
          $project:
            /**
             * specifications: The fields to
             *   include or exclude.
             */
            {
              _id: "$publisher._id",
              name: "$publisher.username",
            },
        },
      ])
    res.status(200).json({
        success: true, 
        data: user
    })
  })