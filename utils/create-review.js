const Author = require('../models/Author')
const Publisher = require('../models/Publisher')
const Genre = require('../models/Genre')

const findAuthor = async (author) => {
  const findAuthor = await Author.findOne({name: author})
  if (!findAuthor){
    const newAuthor = await Author.create({name: author})
    const authorId = newAuthor._id
    console.log(`new author _id = ${authorId}`)
    return await authorId
  } else {
    const authorId = findAuthor._id
    console.log(`existing author id = ${authorId._id}`);
    return await authorId
  }

}

const findPublisher = async (publisher)=> {
  const findPublisher = await Publisher.findOne({name: publisher})
  if (!findPublisher){
    const newPublisher = await Publisher.create({name: publisher})
    const publisherId = newPublisher._id
    console.log(`new publisher _id = ${publisherId}`)
    return await publisherId
  } else {
    const publisherId = findPublisher._id
    console.log(`existing publisher id = ${publisherId._id}`);
    return await publisherId
  }

}

const findGenre = async (genre) => {
  const genreArray = await genre.map(async(item)=>{
    const findGenre = await Genre.findOne({name: item})
    if (!findGenre) {
      const newGenre = await Genre.create({name: item})
      const genreId = newGenre._id
      return genreId
    } else {
      return findGenre._id
    }
  })
  return await genreArray
} 





module.exports = {
  findAuthor, 
  findPublisher, 
  findGenre 
}