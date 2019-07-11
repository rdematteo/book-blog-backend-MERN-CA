//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require('express');
const Book = require('./models/Book');
const bookRoutes = require('./routes/book.routes');

//Create an app which an instance of express
const app = new express();
const port = 5500;
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURIENV = process.env.MONGO_URI;
app.use(express.json());

// Define the development database
const mongoURI = 'mongodb://localhost/bookmarks'

// connecting to mongodb from your application
mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
   if(err) return console.log( `database not connected with ${err}`)
   console.log("connected to mongodb")
 })

 // Connection of express routes with root directory
 app.use('/', bookRoutes)

app.get('/', (req,res)=> {
res.send('hello world')
})

app.get('/book/title/:name', async (req, res) => {
     //console.log("hello")
    const { name } = req.params;
  console.log(req.params)
  //console.log(name)
  try {
    const myString = name
    const findBook = await Book.find({ Title: name})
    console.log(findBook)
    res.send(findBook);
  }
  catch(err) { 
    console.log('error')
      res.json(err);
       }
  })

  //Update book

  app.put('/book/title/:name', async (req, res) => {
   const { name } = req.params;
   const { newTitle } = req.body

    
 try {
  const findBook = await Book.findOne({ Title: name})
  findBook.Title = newTitle
  await findBook.save()
  res.send(findBook)

}
catch(err) { 
  console.log('error')
    res.status(400).json(err);
     }
 })

app.post('/seed', async (req, res)=> {
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
    //console.log(savedBook)
    res.send(`saved ${savedBook.Title} book in database`)
  } catch(err) {
    res.status().status(400).send(`${err} problem`)
    //console.log(`${err} problem`)
  }
})

app.delete('/book/title/:title', async (req,res) => {
  const { title } = req.params

  try {
    const doc = await Book.findOneAndDelete({ Title: title})
    if(!doc){
      res.status(404).send(`No Book ${title} found`)
    }
    console.log(doc);
    res.send(`${doc.Title} deleted from database`)
  } catch(err) {
  //return res.send(`No Book ${title} found`)
   return res.status(400).json(err)
  }
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})