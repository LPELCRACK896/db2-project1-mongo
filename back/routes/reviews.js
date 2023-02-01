const express = require('express')
const { 
     getReviews,
     getReview,
     addReview
} = require('../controllers/reviews');
const advancedResults = require('../middlewares/advancedResults')
const {Review} = require('../models/Review')

const router = express.Router({ mergeParams: true })
const { protect, authorize } = require('../middlewares/auth')

router.route('/')
    .get(advancedResults(Review, {path: 'book'}), getReviews)
    .post(protect, authorize("reviewer", "user", "admin"), addReview)

router.route('/:id')
    .get(getReview)


module.exports = router