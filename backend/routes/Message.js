import express from "express";
import { getMessages, sendMessage } from "../controllers/Message.js";
import protectRoute from "../middlewares/RouteProtector.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;