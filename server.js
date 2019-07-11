//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require('express');
const Book = require('./models/Book');

//Create an app which an instance of express
const app = new express();
const port = process.env.Port ||  5500;
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURIENV = process.env.MONGO_URI;
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
    hello: 'hello'
  })
})


app.get('/', (req,res)=> {
res.send('hello world')
})

app.post('/seed', async (req, res)=> {
  console.log(req.body.books[0].Title)
  const { books } = req.body
  console.log(books)
  try {
    const newBook = new Book ({
      Title: books[0].Title,
      Author: books[0].Author,
      Review: books[0].Review,
      Publisher: books[0].Publisher,
      YearPublished: books[0].YearPublished,
      Genre: [books[0].Genre],
      ISBN: books[0].ISBN,
      LinkToBuy:books[0].LinkToBuy,
      TopPick: books[0].TopPick,
      SeoKeyword: books[0].SeoKeyword,   
    })
  const savedBook = await newBook.save()
  console.log(savedBook)
  res.send({savedBook: savedBook})
  } catch(err) {
    console.log(`${err} problem`)
  }
  })


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})