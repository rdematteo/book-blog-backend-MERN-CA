const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Note that Joi starts with 'J' as it refers to a class.
const Joi = require('joi')

const adminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin