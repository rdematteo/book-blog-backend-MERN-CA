const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/review-controller');

router.get('/review/title/:name', controllerMethods.showReviewByTitle)

router.get('/reviews', controllerMethods.showAllReviews)

router.put('/review/title/:name', controllerMethods.updateReview)

router.delete('/review/title/:title', controllerMethods.deleteReview)

router.post('/seed', controllerMethods.createReview)

module.exports = router