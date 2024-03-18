import express from "express";
import { getMessages, sendMessage, getallconversations } from "../controllers/Message.js";
import protectRoute from "../middlewares/RouteProtector.js";
// import newProtector from "../middlewares/NewProtector.js";

const router = express.Router();


router.get("/conversations", protectRoute, getallconversations);
router.get("/:id", getMessages);
router.post("/send/:id", sendMessage);

export default router;