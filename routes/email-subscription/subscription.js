const express = require('express');
const emailSubscriptionRoutes = express.Router();
//const controllerMethods = require('../../controller/review-controller');
const emailSubscriptionMethod = require('../../controller/email-subscription/subscription');

//router.get('/review/title/:name', controllerMethods.showReviewByTitle)
emailSubscriptionRoutes.post('/signup', emailSubscriptionMethod.emailSubscription)

module.exports = emailSubscriptionRoutes 