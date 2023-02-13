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
// @route   GET /api/v1/persons/publishers
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

// @desc    Get a list of publishers
// @route   GET /api/v1/persons/ratedbooks/:id
// @access  Public
exports.getRatedBooksByUser = asyncHandler(async(req, res, next)=>{
  const id = mongoose.Types.ObjectId(req.params.id)
  const data = await User.aggregate([
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          _id: id,
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
          path: "$ratedBooks",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
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
          from: "books",
          localField: "ratedBooks.book",
          foreignField: "_id",
          as: "bookdc",
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          book_doc: {
            $arrayElemAt: ["$bookdc", 0],
          },
          username: 1,
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: "$username",
          books: {
            $push: "$book_doc",
          },
        },
    },
  ]).then(res => res[0])
  if (data.books.length===0){
    return res.status(200).json({success: true, data: []})
  }
  return res.status(200).json({success: true, data: data.books})
})


// @desc    Get a list of publishers
// @route   GET /api/v1/persons/readingbooks/:id
// @access  Public
exports.getReadingBooksByUser = asyncHandler(async(req, res, next)=>{
  const id = mongoose.Types.ObjectId(req.params.id)
  const data = await User.aggregate([
    {
      $match:
        {
          _id: id,
        },
    },
    {
      $unwind:
        {
          path: "$readingBooks",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {
      $lookup:
        {
          from: "books",
          localField: "readingBooks",
          foreignField: "_id",
          as: "bookdc",
        },
    },
    {
      $project:
        {
          book_doc: {
            $arrayElemAt: ["$bookdc", 0],
          },
          username: 1,
        },
    },
    {
      $group:
        {
          _id: "$username",
          books: {
            $push: "$book_doc",
          },
        },
    },
  ]).then(res => res[0])
  if (data.books.length===0){
    return res.status(200).json({success: true, data: []})
  }
  return res.status(200).json({success: true, data: data.books})
})

// @desc    Get a list of publishers
// @route   GET /api/v1/persons/favbooks/:id
// @access  Public
exports.getFavouritesBooksByUser = asyncHandler(async(req, res, next)=>{
  const id = mongoose.Types.ObjectId(req.params.id)
  const data = await User.aggregate([
    {
      $match:
        {
          _id: id,
        },
    },
    {
      $unwind:
        {
          path: "$favBooks",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {
      $lookup:
        {
          from: "books",
          localField: "favBooks",
          foreignField: "_id",
          as: "bookdc",
        },
    },
    {
      $project:
        {
          book_doc: {
            $arrayElemAt: ["$bookdc", 0],
          },
          username: 1,
        },
    },
    {
      $group:
        {
          _id: "$username",
          books: {
            $push: "$book_doc",
          },
        },
    },
  ]).then(res => res[0])
  if (data.books.length===0){
    return res.status(200).json({success: true, data: []})
  }
  return res.status(200).json({success: true, data: data.books})
})


// @desc    Get the list books a user wants to read
// @route   GET /api/v1/persons/wanttoread/:id
// @access  Public
exports.getWantToReadByUser = asyncHandler(async(req, res, next)=>{
  const id = mongoose.Types.ObjectId(req.params.id)
  const data = await User.aggregate([
    {$match:
        {
          _id: id,
        },
    },
    {$unwind:
        {
          path: "$wantToReadBooks",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {$lookup:
        {
          from: "books",
          localField: "wantToReadBooks",
          foreignField: "_id",
          as: "bookdc",
        },
    },
    {$project:
        {
          book_doc: {
            $arrayElemAt: ["$bookdc", 0],
          },
          username: 1,
        },
    },
    {$group:
        {
          _id: "$username",
          books: {
            $push: "$book_doc",
          },
        },
    },
  ]).then(res => res[0])
  if (data.books.length===0){
    return res.status(200).json({success: true, data: []})
  }
  return res.status(200).json({success: true, data: data.books})
})

// @desc    Get the list books a user wants to read
// @route   GET /api/v1/persons/friends/:id
// @access  Public
exports.getFriendsByUser = asyncHandler(async(req, res, next)=>{
  const id = mongoose.Types.ObjectId(req.params.id)
  const data = await User.aggregate([
    {$match:
        {
          _id: id,
        },
    },
    {$unwind:
        {
          path: "$friends",
          includeArrayIndex: "string",
          preserveNullAndEmptyArrays: false,
        },
    },
    {$lookup:
        {
          from: "users",
          localField: "friends",
          foreignField: "_id",
          as: "friend",
        },
    },
    {$project:
        {
          friend: {
            $arrayElemAt: ["$friend", 0],
          },
          username: 1,
        },
    },
    {$group:
        {
          _id: "$username",
          friends: {
            $push: "$friend",
          },
        },
    },
  ]).then(res=> res[0])
  if(data.friends.length===0){
    return res.status(200).json({success: true, data: []})
  }
  return res.status(200).json({success: true, data: data.friends})
})


// @desc    Delete
// @route   DELETE /api/v1/persons/:id
// @access  Public
exports.deletePerson = asyncHandler(async(req, res, next)=>{
  const user = await User.findById(req.params.id)
  if (!user) next(new ErrorResponse(`Book not found with id ${req.params.id}'`, 404))
  if(req.params.id !== req.user.id && req.user.role !=='admin'){
    return next(new ErrorResponse(`User ${req.user.username} unauthorized`, 401))
  }
  user.remove()
  return res.status(200).json({success: true})
})