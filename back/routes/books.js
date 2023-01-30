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

router.route('/').post(createBook).get(getBooks)
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook)
router.route('/rate/:id').put(newRate)
module.exports = router