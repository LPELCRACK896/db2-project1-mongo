const express = require('express');
const {
    register, 
    login, 
    getMe,
    forgotPassword, 
    resetPassword,
    isItMe
} = require('../controllers/auth')
const router = express.Router({ mergeParams: true })
const {protect} = require('../middlewares/auth')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resettoken').put(resetPassword)
router.route('/isitme/:id').get(protect, isItMe)

module.exports = router