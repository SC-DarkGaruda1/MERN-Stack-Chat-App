import User from "../../Models/User.Model.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserID = req.user._id;
    const otherUsers = User.find({ _id: { $ne: { loggedInUserID } } }).select(
      "-password"
    );

    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default getUsersForSidebar;
