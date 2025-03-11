import cloudinary from "../../Config/Cloudinary.js";
import Message from "../../Models/Message.Model.js";

const sendMessage = async (req, res) => {
  const myID = req.user._id;
  const { id: userToChatID } = req.params;
  try {
    const { text, media } = req.body;

    let mediaURL;
    if (media) {
      const uploadResponse = await cloudinary.uploader.upload(media);
      mediaURL = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderID: myID,
      recieverID: userToChatID,
      text,
      media: mediaURL,
    });

    await newMessage.save();

    // todo real time functionality using socket io

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default sendMessage;
