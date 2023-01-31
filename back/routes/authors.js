const express = require('express')
const router = express.Router()

const { 
    createAuthor
} = require('../controllers/authors');
const { protect, authorize } = require('../middlewares/auth')

router.route('/').post(protect, authorize('publisher', 'admin'), createAuthor)

module.exports = router