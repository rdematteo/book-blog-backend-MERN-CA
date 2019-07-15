//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require('express');
const Review = require('./models/Review');
const path = require('path');
const cors = require("cors");

//const emailSubscription = require('./controller/email-subscription/subscription')

const reviewRoutes = require('./routes/review-routes');
const emailSubscriptionRoutes = require('./routes/email-subscription/subscription');
//const authRoutes = require('./routes/auth/index');

//Create an app which an instance of express
const app = new express();
const port = process.env.Port ||  5500;
const mongoose = require('mongoose');
require('dotenv').config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Static folder
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', emailSubscriptionRoutes)

 // Connection of express routes with root directory
 app.use('/', reviewRoutes)
 app.use(require('./routes/auth'))



// connecting to mongodb from your application
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
  if(err) return console.log( `database not connected with ${err} 😩`)
  console.log("connected to mongodb ✅")
})

const Author = require('./models/Author');
const Publisher = require('./models/Publisher');
const Genre = require('./models/Genre');


app.post('/testseed', async(req, res) => {
  const { author, publisher, genre } =  req.body
 try{
   const newAuthor = await Author.create({name: author})
   const newPublisher = await Publisher.create({name: publisher})
   const newGenre = await Genre.create({name: genre})
   res.send(newAuthor, newPublisher, newGenre)
 }catch(err){
   res.send(`there's been an error: ${err}`)
 }

})

// app.get('/hello', (req, res) => {
//   res.send({
//     hello: 'hello world out there'
//   })
// })





app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})