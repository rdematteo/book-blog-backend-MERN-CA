// setup routes
const express = require('express');
const router = express.Router();

router.use(express.json())

//router.use('/public', require('./public-routes'))
router.use('/private', require('./private-routes'))
router.use('/auth', require('./auth-routes'))

module.exports = router;