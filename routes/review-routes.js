const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/review-controller');
const multer = require('multer');

// multer handles image buffer object, adds req.file to endpoint
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file');

router.get('/review/title/:name', controllerMethods.showReviewByTitle)

router.get('/reviews', controllerMethods.showAllReviews)

router.put('/updateReview', controllerMethods.updateReview)

router.delete('/deleteReview', controllerMethods.deleteReview)

router.post('/seed', upload, controllerMethods.createReview)

router.post('/testseed', controllerMethods.seedData)


module.exports = router