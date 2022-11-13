conversationModle = require("../models/conversationSchema");

const createConversation = async (req, res) => {
  const { userName, _id } = req.body;
  const newConv = conversationModle({ user_id: _id });
  try {
    const newCreateConversation = await newConv.save();
    if (newCreateConversation) {
      return res.status(201).json({
        success: true,
        message: "user created",
        data: { userName, _id },
      });
    }
    throw Error;
  } catch (error) {
    if (error.keyPattern.user_id) {
      res.status(500).json({
        success: false,
        message: `Conversation with user id :${_id} already exist`,
        error,
      });
      return;
    }
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const updateConversation = async (req, res, next) => {
  const { person, user_id, socket_ids } = req.body;
  try {
    const result = await conversationModle
      .findOneAndUpdate(
        { user_id: [user_id, person] },
        { $addToSet: { persons: { person } } },
        { new: true }
      )
      .select({ persons: { $elemMatch: { person: person } }, user_id });
    await result.populate("user_id", "userName");
    await result.populate("persons.person", "userName");
    if (result) {
      emitConv(socket_ids[1], result);
      return res.status(201).json({
        success: true,
        message: "New conversation created",
        data: result.persons[0].person,
      }); //
    }
    throw Error;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
const emitConv = (id, result) => {
  const { chat } = require("../index");
  chat.to(id).emit("conv", {
    person: { person: result.user_id, socket: socket_ids[0] },
  });
};
const getConversationById = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const data = await conversationModle
      .findOne({ user_id })
      .populate("persons.person", "userName");

    if (data) {
      return res.status(200).json({
        success: true,
        message: " the Conversation",
        data,
      });
    }
    throw Error;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error,
    });
  }
};
module.exports = {
  createConversation,
  getConversationById,
  updateConversation,
};
