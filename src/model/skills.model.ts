import mongoose, { Mongoose } from "mongoose";

export interface ISkills extends mongoose.Document {
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillsSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const SkillModel = mongoose.model<ISkills>("Skills", SkillsSchema);

export default SkillModel;
