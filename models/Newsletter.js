const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const newsletterSchema = new Schema({
  title: {
    type: { type: Schema.Types.ObjectId, ref: 'Subscriber'},
    required: true
  }
})

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter