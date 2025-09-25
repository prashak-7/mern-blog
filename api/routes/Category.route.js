import express from "express";
import {
  addCategory,
  deleteCategory,
  showCategory,
  updateCategory,
  getAllCategory,
} from "../controllers/Category.controller.js";

const CategoryRoute = express.Router();

CategoryRoute.get("/all-category", getAllCategory);
CategoryRoute.post("/add", addCategory);
CategoryRoute.put("/update/:categoryid", updateCategory);
CategoryRoute.get("/show/:categoryid", showCategory);
CategoryRoute.delete("/delete/:categoryid", deleteCategory);

export default CategoryRoute;
