const express = require('express')
const router = express.Router()

const { register, login, updateUser } = require('../controller/auth')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateuser').patch(updateUser)

module.exports = router
