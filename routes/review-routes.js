const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/review-controller');
const multer = require('multer');

// multer handles image buffer object, adds req.file to endpoint
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file');

router.get('/review/title/:name', controllerMethods.showReviewByTitle)

router.get('/reviews', controllerMethods.showAllReviews)
//moved to protecetd routes

// router.put('/updateReview', upload, controllerMethods.updateReview)
//moved to protecetd routes

// router.delete('/deleteReview', controllerMethods.deleteReview)
//moved to protected routes

// router.post('/createReview', upload, controllerMethods.createReview)
//createReview put into protected routes

router.post('/testseed', controllerMethods.seedData)


module.exports = router