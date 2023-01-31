const express = require('express')
const { 
    createBook, 
    getBooks, 
    getBook,
    deleteBook, 
    updateBook, 
    newRate
} = require('../controllers/books');
const advancedResults = require('../middlewares/advancedResults')
const {Book} = require('../models/Book')

const router = express.Router()
const { protect, authorize } = require('../middlewares/auth')

router.route('/').post(createBook).get(advancedResults(Book), getBooks)//protect, authorize('publisher', 'admin'),
router.route('/:id').get(getBook).put(protect, authorize('publisher', 'admin'), updateBook).delete(protect, authorize('publisher', 'admin'), deleteBook)
router.route('/rate/:id').put(protect, newRate)
module.exports = router