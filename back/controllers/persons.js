const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const {User, EmbededBook} = require('../models/User')
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