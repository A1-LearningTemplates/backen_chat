const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const app = express();
app.use(express.json());
app.use(cors());
require("./models/db");
const server = http.Server(app);
const PORT = process.env.PORT || 5000;
// import the routers
const loginRouter = require("./routes/login");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");

// endpoints Router
app.use("/user", loginRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
const io = socket(server, { cors: { origin: "*" } });
const chat = io.of("/chat");

module.exports = { chat };
// require("./controllers/chat");
require("./controllers/conversation");

