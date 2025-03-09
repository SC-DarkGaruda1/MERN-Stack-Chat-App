import User from "../../Models/User.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      message: `None of the required fields can be empty`,
      success: false,
    });

  try {
    const userExists = await User.findOne({ email, username });

    if (!userExists) {
      return res.status(400).json({
        message: `No Account Found With The Given Email ID And Username`,
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userExists.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        message: `Invalid Credentials`,
        success: false,
      });

    const token = await jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.cookie("token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    userExists.lastLogin = new Date().getTime();
    await userExists.save();

    return res
      .status(200)
      .json({ message: `Logged In Successfully`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default login;
