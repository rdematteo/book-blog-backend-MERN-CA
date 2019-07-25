const express = require('express');
const router = express.Router();

router.use(express.json())

router.use('/private', require('./private-routes'))
router.use('/auth', require('./auth-routes'))
router.use('/protected', require('./protected-routes'))

module.exports = router;