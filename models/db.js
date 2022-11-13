const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Chat_app").then(
  () => {
    console.log("database connected");
  },
  (err) => {
    console.log(err);
  }
);
