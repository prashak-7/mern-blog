import express from "express";
import {
  addComment,
  commentCount,
  getComments,
} from "../controllers/Comment.controller.js";

const CommentRoute = express.Router();

CommentRoute.get("/get/:blogid", getComments);
CommentRoute.get("/get-count/:blogid", commentCount);
CommentRoute.post("/add", addComment);

export default CommentRoute;
