const express = require('express')
const {
    getPersons,
    getPerson,
    findPeople
} = require('../controllers/persons')
const advancedResults = require('../middlewares/advancedResults')
const { User } = require('../models/User')
const {protect, authorize} = require('../middlewares/auth')

const router = express.Router({ mergeParams: true })

router.route('/').get(protect, advancedResults(User), getPersons)
router.route('/:id').get(getPerson)
router.route('/find').post(findPeople)

module.exports = router