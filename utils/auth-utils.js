const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const User = require('../../models/User')
const Admin = require('../models/auth/Admin')

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds)
}

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

const generateUser = async (email, password) => {
  const hash = await generateHash(password)
  const newUser = new Admin({
    email: email,
    password: hash
  })
  return await newUser.save()
}

const generateAccessToken = async ({ user }) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '1d'});
} 

module.exports = {
  checkPassword,
  generateUser,
  generateAccessToken
}