import express from "express";
import { login, logout, signup } from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/forget-password",forgetPassword);
// router.post("/reset-password", resetPassword);


export default router;