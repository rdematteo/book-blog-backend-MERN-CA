const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/review-controller');
const multer = require('multer');

// multer handles image buffer object, adds req.file to endpoint
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file');


//a route needed here and one moved to protecetd routes
router.get('/reviews', controllerMethods.showAllReviews)

router.post('/testseed', controllerMethods.seedData)


module.exports = router