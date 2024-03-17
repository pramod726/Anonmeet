import express from "express";
import protectRoute from "../middlewares/RouteProtector.js";
import { getUsersForSidebar } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsersForSidebar);

export default router;