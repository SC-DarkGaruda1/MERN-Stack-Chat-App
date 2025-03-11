import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recieverID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
  },
  media: {
    type: String,
  },

  createdAt: {
    type: Number,
    default: new Date().getTime(),
  },

  updatedAt: {
    type: Number,
    default: 0,
  },
});

const Message = new mongoose.model("Message", messageSchema);

export default Message;
