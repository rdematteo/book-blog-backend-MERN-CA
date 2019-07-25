const express = require("express");
const router = express.Router();
const controllerMethods = require("../../controller/review-controller");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      next();
    }
  } catch (err) {
    res.status(400).send("you have an error- token");
  }
};

router.use(isAuthenticated);

router.get("/reviews", controllerMethods.showAllReviews);

router.post("/createReview", upload, controllerMethods.createReview);

router.delete("/deleteReview", controllerMethods.deleteReview);

router.put("/updateReview", upload, controllerMethods.updateReview);

module.exports = router;
