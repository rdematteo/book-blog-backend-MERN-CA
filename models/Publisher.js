const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const publisherSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher