import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default categorySchema;
