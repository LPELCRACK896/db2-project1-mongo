const express = require('express')
const { 
    createBook, 
    getBooks, 
    getBook,
    deleteBook, 
    updateBook, 
    newRate,
    findBook
} = require('../controllers/books');
const advancedResults = require('../middlewares/advancedResults')
const {Book} = require('../models/Book')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

//Include other resourse routers
const reviewsRoute = require('./reviews')

// Re-route into other resource routers
router.use('/:bookid/reviews', reviewsRoute)

router.route('/').post(createBook).get(advancedResults(Book), getBooks)//protect, authorize('publisher', 'admin'),
router.route('/:id').get(getBook).put(protect, authorize('publisher', 'admin'), updateBook).delete(protect, authorize('publisher', 'admin'), deleteBook)
router.route('/rate/:id').put(protect, newRate)
router.route("/findbook").post(findBook)
module.exports = router