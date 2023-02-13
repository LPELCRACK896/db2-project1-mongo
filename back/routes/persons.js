const express = require('express')
const {
    getPersons,
    getPerson,
    findPeople,
    getPublishers
} = require('../controllers/persons')
const advancedResults = require('../middlewares/advancedResults')
const { User } = require('../models/User')
const {protect, authorize} = require('../middlewares/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(protect, advancedResults(User), getPersons)
router.route('/find').post(findPeople)
router.route('/publishers').get(getPublishers)
router.route('/users/:id').get(getPerson)

module.exports = router