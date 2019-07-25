const Review = require("../models/Review");
const Author = require("../models/Author");
const Publisher = require("../models/Publisher");
const Genre = require("../models/Genre");
const AWS = require("aws-sdk");
require("dotenv").config();

const s3credentials = new AWS.S3({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY
});

//show all review
const showAllReviews = async (req, res) => {
  // console.log("in show all reviews");

  /*the below code allows developors to hit backend if wanting to search for author/isbn/publisher/genre
  the application search the data from state*/

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
    const reviews = await Review.find().sort( [['_id', -1]] )
      .populate("author")
      .populate("genre")
      .populate("publisher");
    res.send({ reviews });
  } catch (err) {
    res.send(err);
  }
};


// Update review
const updateReview = async (req, res) => {
  console.log("in update Review");

  //updates review without uploading new image
  if (!req.file) {
    console.log("no file/file buffer exists");
    const reviewData = JSON.parse(req.body.data);
    console.log(reviewData);

    const { id } = reviewData;
    const { newReview } = reviewData;
    console.log(newReview);

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
      seoKeyword,
      url
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
      seoKeyword: seoKeyword,
      url: url
    };

    await Review.updateOne({ _id: id }, updatedReview);
    const reviews = await Review.find().sort( [['_id', -1]] )
      .populate("author")
      .populate("genre")
      .populate("publisher");
    res.send({ reviews });
  } else {
    console.log("file buffer/image exists");

    //updates review with new image
    let fileParams = {
      Bucket: "bookmarks-rag",
      Body: req.file.buffer,
      Key: "bookmarks-" + req.file.originalname,
      ACL: "public-read",
      ContentType: req.file.mimetype
    };

    try {
      s3credentials.upload(fileParams, async (err, datam) => {
        if (err) {
          res.send("you got an error");
        } else {
          const imageUrl = datam.Location;
          const reviewData = JSON.parse(req.body.data);
          const { id } = reviewData;
          const { newReview } = reviewData;

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
            seoKeyword,
            url
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
            seoKeyword: seoKeyword,
            url: imageUrl
          };

          await Review.updateOne({ _id: id }, updatedReview);
          const reviews = await Review.find().sort( [['_id', -1]] )
            .populate("author")
            .populate("genre")
            .populate("publisher");
          res.send({ reviews });
        }
      });
    } catch (err) {
      return res.status(400).json(`in post catch err with error: ${err}`);
    }
  }
};

const deleteReview = async (req, res) => {
  console.log("in deleteReview");
  console.log(req.body);
  const { title } = req.body.data;
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

  let fileParams = {
    Bucket: "bookmarks-rag",
    Body: req.file.buffer,
    Key: "bookmarks-" + req.file.originalname,
    ACL: "public-read",
    ContentType: req.file.mimetype
  };

  try {
    s3credentials.upload(fileParams, async (err, datam) => {
      if (err) {
        // handle the error
        // res.send('you got an error')
      } else {
        // here you have access to the AWS url through data.Location
        // you could store this string in your database
        console.log(datam.Location);
        const imageUrl = datam.Location;
        // res.send('all good')
        console.log(imageUrl);

        const reviewData = JSON.parse(req.body.data);
        console.log(reviewData);

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
        } = reviewData;

        const foundAuthor = await findAuthor(author);
        const foundPublisher = await findPublisher(publisher);
        const foundGenre = await findGenre(genre);
        const handleGenrePromises = await Promise.all(foundGenre);

        const newReview = await new Review({
          title: title,
          author: foundAuthor,
          review: review,
          publisher: foundPublisher,
          yearPublished: yearPublished,
          genre: handleGenrePromises,
          isbn: isbn,
          linkToBuy: linkToBuy,
          topPick: topPick,
          seoKeyword: seoKeyword,
          url: imageUrl
        });
        console.log(newReview);

        const savedReview = await newReview.save();
        // console.log(savedReview);
        // res.send(savedReview);
        const reviews = await Review.find().sort( [['_id', -1]] )
            .populate("author")
            .populate("genre")
            .populate("publisher");
          res.send({ reviews });
      }
    });
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
  updateReview,
  deleteReview,
  createReview,
  showAllReviews,
  seedData
};
