import express from "express";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  getComments,
} from "../controllers/Comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const CommentRoute = express.Router();

CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-all-comments", authenticate, getAllComments);
CommentRoute.get("/get-count/:blogid", commentCount);
CommentRoute.post("/add", authenticate, addComment);
CommentRoute.delete("/delete/:commentid", authenticate, deleteComment);

export default CommentRoute;
