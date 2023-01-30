const express = require('express')
const router = express.Router()

const { 
    createAuthor
} = require('../controllers/authors');
const { protect } = require('../middlewares/auth')

router.route('/').post(protect, createAuthor)

module.exports = router