import express from "express";
import { comment, create, getpost } from "../controllers/Post.js";

const router = express.Router();

router.post("/create", create);
router.post("/:id/comment", comment);
router.get("/:id", getpost);

export default router;