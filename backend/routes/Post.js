import express from "express";
import { comment, create, deletecomment, deletepost, getpost, hot, newsort, top } from "../controllers/Post.js";

const router = express.Router();

router.get("/hot", hot);
router.get("/top", top);
router.get("/new", newsort);

router.post("/create", create);
router.post("/:id/comment", comment);
router.get("/:id", getpost);

router.delete("/:id", deletepost);
router.delete("/:id1/:id2", deletecomment);


export default router;