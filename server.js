//This will search for the module express in the node-modules and import it in for use in this appliction

const express = require('express');

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


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})