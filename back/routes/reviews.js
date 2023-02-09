const express = require('express')
const { 
     getReviews,
     getReview,
     addReview, 
     deleteReview, 
     updateReview
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
    .delete(protect, authorize("reviewer", "admin"), deleteReview)
    .put(protect, authorize("reviewer", "admin"), updateReview)



module.exports = router