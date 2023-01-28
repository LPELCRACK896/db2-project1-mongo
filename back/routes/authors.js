const express = require('express')
const router = express.Router()

const { 
    createAuthor
} = require('../controllers/authors');


router.route('/').post(createAuthor)

module.exports = router