//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./routes/review-routes");
const emailSubscriptionRoutes = require("./routes/email-subscription/subscription");

//Create an app which an instance of express
const app = new express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
//app.use(express.static(path.join(__dirname, "/public")));
app.use("/", emailSubscriptionRoutes);

// Connection of express routes with root directory
app.use("/", reviewRoutes);
app.use(require("./routes/auth"));

module.exports = app