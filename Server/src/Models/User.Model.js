import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: { type: String, default: `` },

  accountCreatedAt: { type: Number, default: new Date().getTime() },
  lastLogin: { type: Number, default: 0 },
  accountUpdatedAt: { type: Number, default: 0 },
  lastSeen :{type:Number,default:0}
});

const User = new mongoose.model("User", userSchema);

export default User;
