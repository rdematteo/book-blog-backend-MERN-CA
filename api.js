const PORT = process.env.PORT || 5500;
const mongoose = require("mongoose");
const app = require('./server')

// connecting to mongodb from your application
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) return console.log(`database not connected with ${err} 😩`);
  console.log("connected to mongodb ✅");
});

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});