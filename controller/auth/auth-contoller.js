const Admin = require('../../models/auth/Admin')
const { checkPassword, generateUser, generateAccessToken, generateNewHash, generateNewAccessToken } = require('../../utils/auth-utils')

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

const reset = async (req, res) => {
  const { email, password, newPassword } = req.body
  try {
    const query = await Admin.findOne({ email: email })
    if (query !== null) {
      const result = await checkPassword(password, query.password)
      if (!result) {
        return res.status(403).send('incorrect credentials pass')
      } else {
        const newHash = await generateNewHash(newPassword)
        query.password = newHash
        await query.save()
        const token = await generateAccessToken(query)
        return res.send({ token })
      }
    } else {
      return res.status(403).send('incorrect credentials ')
    }

  } catch(err) {
    return res.status(403).send('incorret credentials outside')
  }
}

const forgot = async (req, res) => {
  const token = await generateNewAccessToken(email)
  res.json( {token1: token})
}

const forgotPass = async (req, res) => {
  const { email, newPassword } = req.body
  console.log(newPassword);
  try {
    const query = await Admin.findOne({ email: email})
      if(query !== null){
        const newHash = await generateNewHash(newPassword)
        query.password = newHash
        await query.save()
        const token = await generateAccessToken(query)
        return res.send({ token })
      } else {
        return res.status(403).send('email not found')
      }

  } catch(err) {
    return res.status(403).send('an error occured')
  }




}


module.exports = {
  register,
  login,
  reset,
  forgot,
  forgotPass
}