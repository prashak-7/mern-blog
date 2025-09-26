import express from "express";
import {
  addBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlog,
  getBlogByCategory,
  getRelatedBlogs,
  search,
  updateBlog,
} from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";

const BlogRoute = express.Router();

BlogRoute.get("/all-blogs", getAllBlogs);
BlogRoute.get("/related-blogs/:category/:blog", getRelatedBlogs);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/get-blog/:slug", getBlog);
BlogRoute.post("/add", upload.single("file"), addBlog);
BlogRoute.get("/edit/:blogid", editBlog);
BlogRoute.put("/update/:blogid", upload.single("file"), updateBlog);
BlogRoute.delete("/delete/:blogid", deleteBlog);

BlogRoute.get("/search", search);

export default BlogRoute;
