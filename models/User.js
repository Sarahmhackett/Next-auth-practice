import mongoose, { Schema, model, models } from "mongoose";

// define a new Mongoose schema for a user
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true, // auto-creates createdAt and updatedAt
  }
);

// Prevent model overwrite during hot reloads in dev
const User = models.User || model("User", UserSchema);

export default User;
