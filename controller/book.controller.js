const Book = require('../models/Book')

//Show book by title
const showBookByTitle = async (req, res) => {
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
}

// show one book
const showOneBook = async (req, res) => {
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
}

// Update book
const updateBook = async (req, res) => {
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
}

const deleteBook = async (req,res) => {
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
}

//app.post(‘/seed’, )

//Create Book
const createBook = async (req, res)=> {
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
  }
  }

module.exports = {showBookByTitle, showOneBook, updateBook, deleteBook, createBook}

