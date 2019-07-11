//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require('express');
const Book = require('./models/Book');

//Create an app which an instance of express
const app = new express();
const port = process.env.Port ||  5500;
const mongoose = require('mongoose');
require('dotenv').config();
// const mongoURIENV = process.env.MONGO_URI;
app.use(express.json());

// Define the development database
// const mongoURI = 'mongodb://localhost/bookmarks'

// connecting to mongodb from your application
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, (err) => {
   if(err) return console.log( `database not connected with ${err} 😩`)
   console.log("connected to mongodb ✅")
 })

app.get('/hello', (req, res) => {
  res.send({
    hello: 'hello world'
  })
})


app.get('/', (req,res)=> {
res.send('hello worlds')
})

app.post('/seed', async (req, res)=> {
  // console.log(req.body)
  const { Title, Author, Review, Publisher, YearPublished, Genre, ISBN, LinkToBuy, TopPick, SeoKeyword } = req.body
  try {
    const newReview = new Book ({
      Title: Title,
      Author: Author,
      Review: Review,
      Publisher: Publisher,
      YearPublished: YearPublished,
      Genre: [Genre],
      ISBN: ISBN,
      LinkToBuy: LinkToBuy,
      TopPick: TopPick,
      SeoKeyword: SeoKeyword,   
    })
    // res.send(newReview);
    const savedReview = await newReview.save()
    console.log(savedReview)
    res.send({savedReview: savedReview})
  } catch(err) {
    console.log(`${err} problem`)
    res.send(`${err} problem`)
  }
  })


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})