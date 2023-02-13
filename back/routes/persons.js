const express = require('express')
const {
    getPersons,
    getPerson,
    findPeople,
    getPublishers,
    getRatedBooksByUser,
    getReadingBooksByUser,
    getFavouritesBooksByUser,
    getWantToReadByUser,
    getFriendsByUser,
    deletePerson
} = require('../controllers/persons')
const advancedResults = require('../middlewares/advancedResults')
const { User } = require('../models/User')
const {protect, authorize} = require('../middlewares/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(protect, advancedResults(User), getPersons)
router.route('/find').post(findPeople)
router.route('/publishers').get(getPublishers)
router.route('/users/:id').get(getPerson)
router.route('/ratedbooks/:id').get(getRatedBooksByUser)
router.route('/readingbooks/:id').get(getReadingBooksByUser)
router.route('/favbooks/:id').get(getFavouritesBooksByUser)
router.route('/wanttoread/:id').get(getWantToReadByUser)
router.route('/friends/:id').get(getFriendsByUser)
router.route('/:id').delete(protect, deletePerson)

module.exports = router