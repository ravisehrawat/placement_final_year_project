const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

// const client = new MongoClient(process.env.MONGO_URI, {
//   useNewUrlParser: true,
// });
console.log(process.env.MONGO_URI)
const client = mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Error: ", error);

    return error;
  });

module.exports = client;
