import mongoose from "mongoose";

export interface IMetaData extends mongoose.Document {
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

const MetaDataSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const MetaDataModel = mongoose.model<IMetaData>("MetaData", MetaDataSchema);

export default MetaDataModel;
