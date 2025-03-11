import User from "../Models/User.Model.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: `Unauthorized! Token Not Found!`, success: false });

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken)
      return res
        .status(403)
        .json({ message: `Forbidden! Bad Token!`, success: false });

    const userData = await User.findById(decodedToken.id).select("-password");
    userData.lastSeen = new Date().getTime();

    await userData.save();

    req.user = userData;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: true });
  }
};

export default auth;
