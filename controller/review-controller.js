const Review = require('../models/Review')
const { findAuthor, findPublisher, findGenre } = require('../utils/create-review')

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
  
  const foundAuthor = await findAuthor(author)
  const foundPublisher = await findPublisher(publisher)
  const foundGenre = await findGenre(genre) 
  await console.log(foundAuthor);
  await console.log(foundPublisher);
  await console.log(foundGenre);

    try {
      const newReview = new Review ({
        title: title,
        author: foundAuthor,
        review: review,
        publisher: foundPublisher,
        yearPublished: yearPublished,
        genre: foundGenre,
        isbn: isbn,
        linkToBuy: linkToBuy,
        topPick: topPick,
        seoKeyword: seoKeyword,
      })
      // res.send(newReview);
      const savedReview = await newReview.save()
      console.log(savedReview)
      res.send({savedReview: savedReview})

    
    } catch(err){
    return res.status(400).json(`in post catch err with error: ${err}`)

  }
}
  

module.exports = {showReviewByTitle, showOneReview, updateReview, deleteReview, createReview, showAllReviews}

