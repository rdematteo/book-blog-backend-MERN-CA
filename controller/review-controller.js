const Review = require('../models/Review')
const Author = require('../models/Author')
const Publisher = require('../models/Publisher')


//show all review
const showAllReviews = async (req, res) => {
  console.log('in show all reviews')
  try {
    const reviews = await Review.find().populate('author').populate('genre').populate('publisher')
  res.send({reviews})
  } catch (err){
      res.send(err)
    }
}


//Show review by title
const showReviewByTitle = async (req, res) => {
  //console.log("hello")
 const { name } = req.params;
console.log(req.params)
//console.log(name)
try {
 const myString = name
 const findReview = await Review.find({ title: name})
 console.log(findReview)
 res.send(findReview);
}
catch(err) { 
 console.log('error')
   res.json(err);
    }
}

// show one review
const showOneReview = async (req, res) => {
  //console.log("hello")
 const { name } = req.params;
console.log(req.params)
//console.log(name)
try {
 const findReview = await Review.find({ title: name})
 console.log(findReview)
 res.send(findReview);
}
catch(err) { 
 console.log('error')
   res.json(err);
    }
}

// Update review
const updateReview = async (req, res) => {
  const { name } = req.params;
  const { newTitle } = req.body
 
try {
 const findReview = await Review.findOne({ title: name})
 findReview.title = newTitle
 await findReview.save()
 res.send(findReview)
}
catch(err) { 
 console.log('error')
   res.status(400).json(err);
    }
}

const deleteReview = async (req,res) => {
  const { title } = req.params

  try {
    const doc = await Review.findOneAndDelete({ title: title})
    if(!doc){
      res.status(404).send(`No Review ${title} found`)
    }
    console.log(doc);
    res.send(`${doc.title} deleted from database`)
  } catch(err) {
  //return res.send(`No Review ${title} found`)
   return res.status(400).json(err)
  }
}

//app.post(‘/seed’, )

//Create Review
const createReview = async (req, res)=> {
  
  const { title, author, review, publisher, yearPublished, genre, isbn, linkToBuy, topPick, seoKeyword } = req.body
  
  try {
    // res.send(authors)
    const findAuthor = await Author.findOne({name: author})
    if (!findAuthor){
      const newAuthor = await Author.create({name: author})
      const authorId = newAuthor._id
      console.log(`new author _id = ${authorId}`)
    } else {
      const authorId = findAuthor._id
      console.log(`existing author id = ${authorId._id}`);
    }

    const findPublisher = await Publisher.findOne({name: publisher})
    if (!findPublisher){
      const newPublisher = await Publisher.create({name: publisher})
      const publisherId = newPublisher._id
      console.log(`new publisher _id = ${publisherId}`)
    } else {
      const publisherId = findPublisher._id
      console.log(`existing publisher id = ${publisherId._id}`);
    }

  } catch(err){
    return res.status(400).json(`in post catch err with error: ${err}`)

  }
  




//need to write if statements here if Author, Publisher doesn't exist.
// try{
//   const newAuthor = await Author.create({name: author})
//   const newPublisher = await Publisher.create({name: publisher})
//   const newGenre = await Genre.create({name: genre})
//   res.send(newAuthor, newPublisher, genre)
// }catch(err){
//   res.send(`there's been an error: ${err}`)
// }

  // try {
  //   const newReview = new Review ({
  //     title: title,
  //     author: authorId,
  //     review: review,
  //     publisher: publisherId,
  //     yearPublished: yearPublished,
  //     genre: [genre],
  //     isbn: isbn,
  //     linkToBuy: linkToBuy,
  //     topPick: topPick,
  //     seoKeyword: seoKeyword,
  //   })
  //   // res.send(newReview);
  //   const savedReview = await newReview.save()
  //   console.log(savedReview)
  //   res.send({savedReview: savedReview})
  // } catch(err) {
  //   console.log(`${err} problem`)
  // }
  }

module.exports = {showReviewByTitle, showOneReview, updateReview, deleteReview, createReview, showAllReviews}

