const Admin = require('../../models/auth/Admin')
const { checkPassword, generateUser, generateAccessToken } = require('../../utils/auth-utils')

// register post endpoint
const register = async (req, res) => {
  const { email, password } = req.body
  
  if (email && password) {
    try {
      const query = await Admin.findOne({ email: email })
      if (query === null) {
        const user = await generateUser(email, password)
        const token = await generateAccessToken(user)
        
        return res.send({ token })
      } else {
        return res.status(403).send('user already exists')
      }
    } catch(err) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

// login post endpoint
const login = async (req, res) => {
  //res.send(req.body)
  const { email, password } = req.body
  if (email && password) {
    try {
      const query = await Admin.findOne({ email: email })
      if (query !== null) {
        const result = await checkPassword(password, query.password)
        if (!result) {
          return res.status(403).send('incorrect credentials')
        } else {
          const token = await generateAccessToken(query)
          return res.send({ token })
        }
      } else {
        return res.status(403).send('incorrect credentials')
      }
    } catch(err) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('incorrect credentials')
  }
}

module.exports = {
  register,
  login
}