const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { secrets } = require('../../controller/auth/private-controller');

const checkToken = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('incorrect token');
    } else {
      next()
    }
  })
}

router.use(checkToken)

router.get('/secrets', secrets);

module.exports = router;