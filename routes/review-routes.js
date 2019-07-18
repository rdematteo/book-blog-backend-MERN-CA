const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/review-controller');

router.get('/review/title/:name', controllerMethods.showReviewByTitle)

router.get('/reviews', controllerMethods.showAllReviews)

router.put('/updateReview', controllerMethods.updateReview)

router.delete('/deleteReview', controllerMethods.deleteReview)

router.post('/seed', controllerMethods.createReview)

router.post('/testseed', controllerMethods.seedData)


module.exports = router