const Admin = require('../../models/auth/Admin');
const path = require('path');
const { checkPassword, generateUser, generateAccessToken, generateNewHash, generateNewAccessToken } = require('../../utils/auth-utils')

const email = process.env.MAILER_EMAIL_ID;
const pass = process.env.MAILER_PASSWORD;
const  nodemailer = require('nodemailer');


const smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});
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
  console.log(email+"     "+password)
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
  const token = await generateNewAccessToken(req.body.email)
  //We will send the email from here
  sendForgotPasswordEmail(token, req.body.email);
  res.json( {token: token})
}

const sendForgotPasswordEmail = (token,memEmail) => {
  const urlReact = process.env.REACT_APP_API_URL
  const data = {
    text: 'Plaintext version of the message',
    html:   `<div><h3>Hi,</h3>\
            <p>You requested for a password reset, kindly use this \
            <a href="${urlReact}/ResetPassword?token=${token}&email=${memEmail}">link</a> to reset your password</p>
            <br>
            <p>Cheers!</p>
            </div>`,
        to: memEmail,
        from: email,
        subject: 'Password reset!',
      };

      smtpTransport.sendMail(data, function(err) {
        if (!err) {
          return res.json({ message: 'Kindly check your email for further instructions' });
        } else {
          return res.send("Problem sending email");
        }
      });

}
const forgotPass = async (req, res) => {
  const { email, newPassword } = req.body
  console.log(newPassword);
  try {
    const query = await Admin.findOne({ email: email})
    console.log(query);
      if(query !== null){
        const newHash = await generateNewHash(newPassword);

        query.password = newHash
        await query.save()
        const token = await generateAccessToken(query)
        console.log(token);
        return res.send({ token })
      } else {
        return res.status(403).send('email not found')
      }

  } catch(err) {
    return res.status(403).send('an error occured')
  }

}
const resetpass = async (req,res) => {
  const {token,email} = req.params;
  console.log(__dirname);
  res.sendFile(path.join(__dirname, `../../public/testRest.html`));
}


module.exports = {
  register,
  login,
  reset,
  forgot,
  forgotPass,
  resetpass
}