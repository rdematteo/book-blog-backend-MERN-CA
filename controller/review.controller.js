const Review = require('../models/Review')


//show all review
const showAllReviews = async (req, res) => {
  console.log('in show all reviews')
  const reviews = await Review.find()
  res.send({reviews})
  const allReviews = reviews[0]
  // console.log(allReviews);

  const review = await Review.findOne({ title: 'Soccer: The Real Football'}).populate('Genre')
  console.log(review);
  // .exec((err, review) => {
  //   console.log(review)
    

  // })
    



}


//Show review by title
const showReviewByTitle = async (req, res) => {
  //console.log("hello")
 const { name } = req.params;
console.log(req.params)
//console.log(name)
try {
 const myString = name
 const findReview = await Review.find({ Title: name})
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
 const myString = name
 const findReview = await Review.find({ Title: name})
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
 const findReview = await Review.findOne({ Title: name})
 findReview.Title = newTitle
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
    const doc = await Review.findOneAndDelete({ Title: title})
    if(!doc){
      res.status(404).send(`No Review ${title} found`)
    }
    console.log(doc);
    res.send(`${doc.Title} deleted from database`)
  } catch(err) {
  //return res.send(`No Review ${title} found`)
   return res.status(400).json(err)
  }
}

//app.post(‘/seed’, )

//Create Review
const createReview = async (req, res)=> {
  // console.log(req.body)
  const { title, author, review, publisher, yearPublished, genre, isbn, linkToBuy, topPick, seoKeyword } = req.body

//need to write if statements here if Author, Publisher doesn't exist.

  try {
    const newReview = new Review ({
      title: title,
      author: author,
      review: review,
      publisher: publisher,
      yearPublished: yearPublished,
      genre: [genre],
      isbn: isbn,
      linkToBuy: linkToBuy,
      topPick: topPick,
      seoKeyword: seoKeyword,
    })
    // res.send(newReview);
    const savedReview = await newReview.save()
    console.log(savedReview)
    res.send({savedReview: savedReview})
  } catch(err) {
    console.log(`${err} problem`)
  }
  }

module.exports = {showReviewByTitle, showOneReview, updateReview, deleteReview, createReview, showAllReviews}

