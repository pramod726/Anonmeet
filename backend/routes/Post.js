import express from "express";
import { castvote, comment, create, createreply, deletecomment, deletepost, deletereply, deletesavepost, deletevote, getpost, hot, newsort, savepost, top } from "../controllers/Post.js";
import protectRoute from "../middlewares/RouteProtector.js";

const router = express.Router();

router.get("/hot", protectRoute, hot);
router.get("/top", protectRoute, top);
router.get("/new", protectRoute, newsort);

router.post("/create", protectRoute, create);
router.get("/:id", protectRoute, getpost);

router.post("/:id/vote", protectRoute, castvote);
router.delete("/:id/vote", protectRoute, deletevote);
router.post("/:id/comment", protectRoute, comment);

router.post("/:id/save", protectRoute, savepost);
router.delete("/:id/deletesave", protectRoute, deletesavepost);

router.delete("/:id", protectRoute, deletepost);
router.delete("/:id1/:id2", protectRoute, deletecomment);

router.post("/:id1/:id2", protectRoute, createreply);
router.delete("/:id1/:id2/:id3", protectRoute, deletereply);


export default router;