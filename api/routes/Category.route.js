import express from "express";
import {
  addCategory,
  deleteCategory,
  showCategory,
  updateCategory,
  getAllCategory,
} from "../controllers/Category.controller.js";
import { onlyAdmin } from "../middleware/onlyAdmin.js";

const CategoryRoute = express.Router();

CategoryRoute.get("/all-category", getAllCategory);
CategoryRoute.post("/add", onlyAdmin, addCategory);
CategoryRoute.put("/update/:categoryid", onlyAdmin, updateCategory);
CategoryRoute.get("/show/:categoryid", onlyAdmin, showCategory);
CategoryRoute.delete("/delete/:categoryid", onlyAdmin, deleteCategory);

export default CategoryRoute;
