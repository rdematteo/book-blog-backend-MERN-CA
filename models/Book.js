const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }

})

const Book = mongoose.model('Book', bookSchema);

module.export = Book