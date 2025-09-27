import express from "express";
import {
  addComment,
  commentCount,
  deleteComment,
  getAllComments,
  getComments,
} from "../controllers/Comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-all-comments", getAllComments);
CommentRoute.get("/get-count/:blogid", commentCount);
CommentRoute.post("/add", addComment);
CommentRoute.delete("/delete/:commentid", deleteComment);

export default CommentRoute;
