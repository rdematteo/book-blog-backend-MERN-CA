const express = require('express');
const emailSubscriptionRoutes = express.Router();
const emailSubscriptionMethod = require('../../controller/email-subscription/subscription');

emailSubscriptionRoutes.post('/signup', emailSubscriptionMethod.emailSubscription)

module.exports = emailSubscriptionRoutes 