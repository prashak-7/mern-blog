import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
  getBlogByCategory,
  getBlogs,
  getRelatedBlogs,
  search,
  updateBlog,
} from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogRoute = express.Router();

BlogRoute.get("/related-blogs/:category/:blog", getRelatedBlogs);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/get-blog/:slug", getBlog);

BlogRoute.post("/add", authenticate, upload.single("file"), addBlog);
BlogRoute.get("/all-blogs", authenticate, getAllBlogs);
BlogRoute.get("/blogs", getBlogs);
BlogRoute.get("/edit/:blogid", authenticate, editBlog);
BlogRoute.put(
  "/update/:blogid",
  authenticate,
  upload.single("file"),
  updateBlog
);
BlogRoute.delete("/delete/:blogid", authenticate, deleteBlog);

BlogRoute.get("/search", search);

export default BlogRoute;
