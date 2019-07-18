const Review = require("../models/Review");
const Author = require("../models/Author");
const Publisher = require("../models/Publisher");
const Genre = require("../models/Genre");


//show all review
const showAllReviews = async (req, res) => {
  // console.log("in show all reviews");

  // //search by author
  // const findAuthor = await Author.findOne({ name: "Andre Pirlo" });
  // const author_id = findAuthor._id;
  // const findReviewsByAuthor = await Review.find({ author: author_id })
  //   .populate("author")
  //   .populate("genre")
  //   .populate("publisher");
  // // res.send(findReviewsByAuthor)

  // //search by isbn
  // const findIsbn = await Review.findOne({ isbn: "12345" })
  //   .populate("author")
  //   .populate("genre")
  //   .populate("publisher");
  // // res.send(findIsbn)

  // //search by publisher
  // const findPublisher = await Publisher.findOne({ name: "Coder Academy" });
  // const publisher_id = findPublisher._id;
  // // console.log(publisher_id);
  // const findReviewsByPublisher = await Review.find({ publisher: publisher_id })
  //   .populate("author")
  //   .populate("genre")
  //   .populate("publisher");
  // // res.send(findReviewsByPublisher)

  // //search by genre
  // const findGenre = await Genre.findOne({ name: "Memoir" });
  // const genre_id = findGenre._id;
  // // console.log(genre_id);
  // const findReviewsByGenre = await Review.find({ genre: genre_id })
  //   .populate("author")
  //   .populate("genre")
  //   .populate("publisher");
  // // res.send(findReviewsByGenre);

  try {
    const reviews = await Review.find().populate('author').populate('genre').populate('publisher')
  res.send({reviews})
  } catch (err){
      res.send(err)
    }
};

//Show review by title
const showReviewByTitle = async (req, res) => {
  const { name } = req.params;
  try {
    const myString = name;
    const findReview = await Review.find({ title: name });
    res.send(findReview);
  } catch (err) {
    res.json(err);
  }
};

// show one review
const showOneReview = async (req, res) => {
  const { name } = req.params;
  try {
    const findReview = await Review.find({ title: name });
    res.send(findReview);
  } catch (err) {
    res.json(err);
  }
};

// Update review
const updateReview = async (req, res) => {
  console.log("in update Review");
  const { id } = req.body
  const { newReview } = req.body
  
  const {
    title,
    author,
    review,
    publisher,
    yearPublished,
    genre,
    isbn,
    linkToBuy,
    topPick,
    seoKeyword
  } = newReview;

  const foundAuthor = await findAuthor(author);
  const foundPublisher = await findPublisher(publisher);
  const foundGenre = await findGenre(genre);
  const handleGenrePromises = await Promise.all(foundGenre);
  
  const updatedReview = {
    title: title,
    author: foundAuthor,
    review: review,
    publisher: foundPublisher,
    yearPublished: yearPublished,
    genre: handleGenrePromises,
    isbn: isbn,
    linkToBuy: linkToBuy,
    topPick: topPick,
    seoKeyword: seoKeyword
  }

  try {
    await Review.updateOne({"_id": id}, updatedReview)

    const reviews = await Review.find().populate('author').populate('genre').populate('publisher')
  res.send({reviews})

  } catch (err) {
    return res.status(400).json(`in post catch err with error: ${err}`);
  }

};

const deleteReview = async (req, res) => {
  const { title } = req.body
  try {
    const doc = await Review.findOneAndDelete({ title: title });

    if (!doc) {
      res.status(404).send(`No Review ${title} found`);
    }
    
    res.send(`${doc.title} deleted from database`);
  } catch (err) {
    return res.status(400).json(err);
  }
};

//Create Review
const createReview = async (req, res) => {
  const data = req.body
  
  const {
    title,
    author,
    review,
    publisher,
    yearPublished,
    genre,
    isbn,
    linkToBuy,
    topPick,
    seoKeyword
  } = req.body;

  const foundAuthor = await findAuthor(author);
  const foundPublisher = await findPublisher(publisher);
  const foundGenre = await findGenre(genre);
  const handleGenrePromises = await Promise.all(foundGenre);

  try {
    const newReview = new Review({
      title: title,
      author: foundAuthor,
      review: review,
      publisher: foundPublisher,
      yearPublished: yearPublished,
      genre: handleGenrePromises,
      isbn: isbn,
      linkToBuy: linkToBuy,
      topPick: topPick,
      seoKeyword: seoKeyword
    });
    console.log(newReview);
    const savedReview = await newReview.save();
    res.send({ savedReview: savedReview });
  } catch (err) {
    return res.status(400).json(`in post catch err with error: ${err}`);
  }
};

const seedData = async (req, res) => {
  const { author, publisher, genre } = req.body;
  try {
    const newAuthor = await Author.create({ name: author });
    const newPublisher = await Publisher.create({ name: publisher });
    const newGenre = await Genre.create({ name: genre });
    res.send(newAuthor, newPublisher, newGenre);
  } catch (err) {
    res.send(`there's been an error: ${err}`);
  }
};



const findAuthor = async author => {
  const findAuthor = await Author.findOne({ name: author });
  if (!findAuthor) {
    const newAuthor = await Author.create({ name: author });
    const authorId = newAuthor._id;
    return await authorId;
  } else {
    const authorId = findAuthor._id;
    return await authorId;
  }
};

const findPublisher = async publisher => {
  const findPublisher = await Publisher.findOne({ name: publisher });
  if (!findPublisher) {
    const newPublisher = await Publisher.create({ name: publisher });
    const publisherId = newPublisher._id;
    return await publisherId;
  } else {
    const publisherId = findPublisher._id;
    return await publisherId;
  }
};

const findGenre = async genre => {
  const genreArray = await genre.map(async item => {
    const findGenre = await Genre.findOne({ name: item });
    if (!findGenre) {
      const newGenre = await Genre.create({ name: item });
      const genreId = newGenre._id;
      return genreId;
    } else {
      return findGenre._id;
    }
  });
  return await genreArray;
};



module.exports = {
  showReviewByTitle,
  showOneReview,
  updateReview,
  deleteReview,
  createReview,
  showAllReviews,
  seedData
};
