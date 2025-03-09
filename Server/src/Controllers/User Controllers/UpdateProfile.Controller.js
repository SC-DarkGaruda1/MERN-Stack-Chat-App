import cloudinary from "../../Config/Cloudinary.js";
import User from "../../Models/User.Model.js";

const updateProfile = async (req, res) => {
  const { profilePic } = req.body;

  const userID = req.user._id;

  if (!profilePic)
    return res
      .status(400)
      .json({ message: `Profile Picture Cannot Be Empty`, success: false });

  const uploadResponse = cloudinary.uploader.upload(profilePic);
  const updatedUser = await User.findByIdAndUpdate(
    userID,
    {
      profilePic: uploadResponse.secure_url,
      accountUpdatedAt: new Date().getTime(),
    },
    { new: true }
  );
};

export default updateProfile;
