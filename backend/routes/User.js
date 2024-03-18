import express from "express";
import protectRoute from "../middlewares/RouteProtector.js";
import { follow, getUsersForSidebar, getallcomments, getallposts, getallsaved, getallupvotes } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsersForSidebar);
router.get("/post", protectRoute, getallposts);
router.get("/comment",protectRoute, getallcomments);
router.get("/saved", protectRoute, getallsaved);
router.get("/upvote", protectRoute, getallupvotes);
router.post("/follow/:id1", protectRoute, follow);

export default router;