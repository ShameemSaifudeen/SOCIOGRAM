import mongoose, { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    
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
    password: {
      type: String,

    },
  },
  { timestamps: true }
);

const Admin = model("Admin", adminSchema);

export default Admin;
