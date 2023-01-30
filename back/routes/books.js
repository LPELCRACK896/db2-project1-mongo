const express = require('express')
const { 
    createBook, 
    getBooks, 
    getBook,
    deleteBook, 
    updateBook, 
    newRate
} = require('../controllers/books');

const router = express.Router()
const {protect} = require('../middlewares/auth')

router.route('/').post(protect, createBook).get(getBooks)
router.route('/:id').get(getBook).put(protect,updateBook).delete(protect,deleteBook)
router.route('/rate/:id').put(protect, newRate)
module.exports = router