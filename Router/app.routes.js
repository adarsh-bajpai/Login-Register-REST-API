const express = require('express')
const authentication = require('../Controllers/auth')

const router = express.Router()

router.get('/', (req, res) => res.json('Home Comming Warriors'))
//router.all('*', (req, res) => res.json('Opps! hehehe ! Page Not Found!'))
router.post('/register', authentication.registerUser)
router.post('/login', authentication.loginUser)

module.exports = router