import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,

    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    number: {
        type: Number,
       
        // unique: true,
    },
    password: {
      type: String,

    },
    displayPicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    report:[]
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
