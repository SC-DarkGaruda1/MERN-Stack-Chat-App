import Message from "../../Models/Message.Model.js";

const getMessages = async (req, res) => {
  try {
    const { id: userToChatID } = req.params;
    const myID = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderID: myID, recieverID: userToChatID },
        { senderID: userToChatID, recieverID: myID },
      ],
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default getMessages;
