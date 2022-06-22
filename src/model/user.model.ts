import mongoose, { HydratedDocument } from "mongoose";

var bcrypt = require("bcryptjs");
import config from "config";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<HydratedDocument<IUser>>("save", async function (next) {
  let user = this as IUser;
  if (!user.isModified) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((e: any) => false);
};

const UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
