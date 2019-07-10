//This will search for the module express in the node-modules and import it in for use in this appliction
const express = require('express');
const Book = require('./models/Book');

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
    //console.log("hello")
   const { name } = req.params;
   const { newTitle } = req.body
  //  console.log(name)
  //  console.log(newTitle)
   
 //console.log(req.params)
 
 try {
  //const myString = name
  const findBook = await Book.findOne({ Title: name})
  console.log('inside try')
  console.log(findBook)
  //findBook.Title = newTitle
  findBook.Title = newTitle
  console.log('findBook.Title')
  console.log(findBook.Title)
  console.log('findBook')
  console.log(findBook)
  findBook.save()
  //console.log(updatedBook)



//console.log(updatedBook)
  // const saveBook = await findBook[0].Title.save()
  // console.log(saveBook)
  // res.send(saveBook);
}
catch(err) { 
  console.log('error')
    res.json(err);
     }
//  try {
//    //const myString = name
//    const newTitle = await Book.findOneAndUpdate({ Title: name}, {$set: {Title: newTitle}})
//    console.log(newTitle)
//    res.send(newTitle);
//  }
//  catch(err) { 
//    console.log('error')
//      res.json(err);
//       }
 })
  
// app.get('book/:id', (req, res) => {
//   console.log("hello")
//   const { id } = req.params;
// console.log(req.params)

//   Book.find({ id: id })
//     .then(book => {
//       return res.send(book);
//     })
//     .catch(err => {
//     return res.json(err);
//      })
// })

app.post('/seed', async (req, res)=> {
  //console.log(req.body.books[0].Title)
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
  const saveBook = await newBook.save()
  console.log(saveBook)
  res.send('hello world')
  } catch(err) {
    console.log(`${err} problem`)
  }
  })


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})