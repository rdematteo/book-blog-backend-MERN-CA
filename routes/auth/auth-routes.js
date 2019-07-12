// auth routes go here
const express = require('express');
const router = express.Router();
//const { register, login } = require('../controllers/auth-controller')
const { register, login } = require('../../controller/auth/auth-contoller')

router.post('/register', register)
router.post('/login', login)

module.exports = router;