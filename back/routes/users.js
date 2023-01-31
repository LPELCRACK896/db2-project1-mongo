const express = require('express');
const { User } = require('../models/User')

const {protect, authorize} = require('../middlewares/auth')
const advancedResults = require('../middlewares/advancedResults')

const {
    getUser, 
    getUsers, 
    deleteUser, 
    createUser,
    updateUser
} = require('../controllers/users')

const router = express.Router()
//Protect all routes
router.use(protect)
router.use(authorize('admin'))
//Routes
router.route('/').get(advancedResults(User), getUsers).post(createUser)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

module.exports = router