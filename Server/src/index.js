import express from "express";
import dotenv from "dotenv";
import connect from "./Config/ConnectToDB.js";
import morgan from "morgan";
import authRouter from "./Routes/Auth.Route.js";
import userRouter from "./Routes/User.Route.js";
import messageRouter from "./Routes/Message.Route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);
connect();

app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`);
});
