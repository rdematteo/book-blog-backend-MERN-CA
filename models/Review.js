const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: { type: Schema.Types.ObjectId, ref: 'Author'},
  review: {
    type: String,
    required: true
  },
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher'},
  yearPublished: {
    type: String,
    required: true
  },
  genre: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  linkToBuy: {
    type: String,
    required: true
  },
  topPick: {
    type: Boolean,
    required: false
  },
  seoKeyword: {
    type: [String],
    required: false
  },
  url: {
    type: String,
    required: true
  }

})

const Review = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = Review