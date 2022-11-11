const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;
// import the routers
require("./socket");
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");

mongoose
  .connect(
    "mongodb+srv://anas:RGOiW8sLqjQExuJJ@cluster0.zc8ky.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(
    () => {
      console.log("database connected");
    },
    (err) => {
      console.log(err);
    }
  );
// endpoints Router

app.use("/user", loginRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);
app.get("*", function (req, res) {
  const protocol = req.protocol;
  const host = req.hostname;
  const url = req.originalUrl;
  const port = process.env.PORT || PORT;

  const fullUrl = `${protocol}://${host}:${port}${url}`;

  const responseString = `Full URL is: ${fullUrl}`;
  res.send(responseString);
});
const url = app.listen(PORT, () => {
  console.log(`App listening at port :${PORT}`);
});
