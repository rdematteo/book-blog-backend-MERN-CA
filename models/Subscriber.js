const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const subscriberSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }

})

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.export = Subscriber