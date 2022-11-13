const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://anas:gZ1HNZAztk9XdNvw@cluster0.zc8ky.mongodb.net/?retryWrites=true&w=majority").then(
  () => {
    console.log("database connected");
  },
  (err) => {
    console.log(err);
  }
);
