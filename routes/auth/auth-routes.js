// auth routes go here
const express = require('express');
const router = express.Router();
//const { register, login } = require('../controllers/auth-controller')
const { register, login, reset, forgot, forgotPass } = require('../../controller/auth/auth-contoller')

router.post('/register', register)
router.post('/login', login)

router.post('/reset', reset )
router.post('/forgot', forgot)
router.post('/forgotpass', forgotPass)

module.exports = router;