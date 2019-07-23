const express = require('express');
const router = express.Router();
const controllerMethods = require('../../controller/review-controller')
//const { register, login } = require('../controllers/auth-controller')
// const { register, login, reset, forgot, forgotPass,resetpass } = require('../../controller/auth/auth-contoller')
const jwt = require('jsonwebtoken');
const multer = require('multer');

// multer handles image buffer object, adds req.file to endpoint
const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file');


const isAuthenticated = async (req, res, next) => {
  
  console.log(req.headers);
  console.log(req.body);
  
  try {
    const token = req.headers.token
    console.log(`in isAuthenticated token:${token}`);
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      next();
    }
    }catch (err) {
      res.status(400).send("you have an error- token");
    }
  }

router.use(isAuthenticated)

router.post('/createReview', upload, controllerMethods.createReview)

router.delete('/deleteReview', controllerMethods.deleteReview)

router.put('/updateReview', upload, controllerMethods.updateReview)





module.exports = router;