import express from "express";
import protectRoute from "../middlewares/RouteProtector.js";
import { getUsersForSidebar } from "../controllers/User.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);

export default router;