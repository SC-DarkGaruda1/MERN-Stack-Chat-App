import express from "express";
import signup from "../Controllers/Auth Controllers/SignUp.Controller.js";
import login from "../Controllers/Auth Controllers/Login.Controller.js";
import logout from "../Controllers/Auth Controllers/Logout.Controller.js";
import auth from "../Middlewares/Auth.Middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",auth, logout);

export default router;
