const express = require('express');
const router = express.Router();
const controllerMethods = require('../controller/book.controller');

router.get('/book/title/:name', controllerMethods.showBookByTitle)

//router.get('/Books', controllerMethods.showAllBooks)

router.put('/book/title/:name', controllerMethods.updateBook)

router.delete('/book/title/:title', controllerMethods.deleteBook)

router.post('/seed', controllerMethods.createBook)

module.exports = router