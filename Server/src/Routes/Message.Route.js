import express from "express";
import auth from "../Middlewares/Auth.Middleware.js";
import sendMessage from "../Controllers/Message Controllers/SendMessage.Controller.js";
import getUsersForSidebar from "../Controllers/Message Controllers/GetUsersForSidebar.Controller.js";
import getMessages from "../Controllers/Message Controllers/GetMessages.Controller.js";
const router = express.Router();

router.get("/users", auth, getUsersForSidebar);
router.get("/:id", auth, getMessages);
router.post("/send/:id", auth, sendMessage);

export default router;
