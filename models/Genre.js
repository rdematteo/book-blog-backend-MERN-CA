const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const genreSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

const Genre = mongoose.model('Genre', genreSchema);

module.export = Genre