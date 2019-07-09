const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const bookSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Author: {
    type: { type: Schema.Types.ObjectId, ref: 'Author'},
  },
  Review: {
    type: String,
    required: true
  },
  Publisher: {
    type: { type: Schema.Types.ObjectId, ref: 'Publisher'},
  },
  YearPublished: {
    type: String,
    required: true
  },
  Genre: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
    required: true
  },
  ISBN: {
    type: String,
    required: true,
    unique: true
  },
  LinkToBuy: {
    type: String,
    required: true
  },
  TopPick: {
    type: Boolean,
    required: false
  },
  SeoKeyword: {
    type: [String],
    required: false
  }

})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book