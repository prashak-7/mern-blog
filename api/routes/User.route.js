import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute = express.Router();
UserRoute.use(authenticate);
UserRoute.get("/get-user/:userid", getUser);
UserRoute.get("/get-all-users", getAllUsers);
UserRoute.put("/update-user/:userid", upload.single("file"), updateUser);
UserRoute.delete("/delete/:id", deleteUser);

export default UserRoute;
