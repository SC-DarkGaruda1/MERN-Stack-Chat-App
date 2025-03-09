import express from "express";
import auth from "../Middlewares/Auth.Middleware.js";
import updateProfile from "../Controllers/User Controllers/UpdateProfile.Controller.js";
import isAuthenticated from "../Controllers/User Controllers/IsAuthenticated.Controller.js";

const router = express.Router();

router.put("/update-profile", auth, updateProfile);
router.get("/is-authenticated", auth, isAuthenticated);

export default router;
