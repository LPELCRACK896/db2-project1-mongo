const express = require('express')
const router = express.Router({ mergeParams: true })

const { 
    createAuthor,
    getAuthors
} = require('../controllers/authors');
const { protect, authorize } = require('../middlewares/auth')

router.route('/').post(protect, authorize('publisher', 'admin'), createAuthor).get(getAuthors)
module.exports = router