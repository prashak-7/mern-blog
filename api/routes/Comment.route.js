import express from "express";
import { addComment, getComments } from "../controllers/Comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.get("/get/:blogid", getComments);
CommentRoute.post("/add", addComment);

export default CommentRoute;
