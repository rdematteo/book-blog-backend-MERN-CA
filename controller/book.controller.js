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

//Create Book
const createBook = async (req, res)=> {
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
}

module.exports = {showBookByTitle, showOneBook, updateBook, deleteBook, createBook}

