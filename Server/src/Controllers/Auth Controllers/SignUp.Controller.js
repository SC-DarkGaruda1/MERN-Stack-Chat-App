import { validateEmail } from "../../Validators/Email.Validator.js";
import { validatePassword } from "../../Validators/Password.Validator.js";
import { validateUsername } from "../../Validators/Username.Validator.js";
import bcrypt from "bcryptjs";
import User from "../../Models/User.Model.js";
const signup = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password)
    return res.status(400).json({
      message: `None of the required fields can be empty`,
      success: false,
    });

  if (!validateEmail(email))
    return res.status(400).json({
      message: `Email doesnt satisfy required criteria`,
      success: false,
    });

  if (!validateUsername(username))
    return res.status(400).json({
      message: `Username doesnt satisfy required criteria`,
      success: false,
    });

  if (!validatePassword(password))
    return res.status(400).json({
      message: `Password doesnt satisfy required criteria`,
      success: false,
    });

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        message: `Email ID is already associated with an account`,
        success: false,
      });
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists)
      return res.status(400).json({
        message: `Username is already associated with an account`,
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: `New User Created`, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: `Internal Server Error`, success: false });
  }
};

export default signup;
