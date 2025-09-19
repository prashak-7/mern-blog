import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
    enums: ["user", "admin"],
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
