const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Author = mongoose.model('Author', authorSchema, 'authors');

module.exports = Author