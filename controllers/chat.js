const { chat } = require("../index");
let sessionID = [];
const addSessionID = (id) => {
  sessionID.push(id);
};
const removeSessionID = (id) => {
  sessionID = sessionID.filter((ele) => {
    return ele.socket !== id;
  });
};
chat.emit("hi", "hi");
// chat.on("connection", (socket) => {
//   console.log("connected");
//   const data = {
//     socket: socket.id,
//     userName: socket.handshake.query.userName,
//     _id: socket.handshake.query._id,
//   };
//   addSessionID(data);
//   chat.emit("receivedConnection", sessionID);

//   socket.on("disconnect", () => {
//     removeSessionID(socket.id);
//     chat.emit("receivedDisconnect", sessionID);
//   });
//   socket.on("message", (dataMessage) => {
//     chat
//       .to([dataMessage.receiver.socket, socket.id])
//       .emit("messageToClient", dataMessage);
//   });
//   socket.on("typing", (id) => {
//     socket.to(id).emit("isTyping");
//   });
//   socket.on("send_new_conversation", (data) => {
//     socket.to(data.socket).emit("get_new_conversation", data);
//   });
// });
