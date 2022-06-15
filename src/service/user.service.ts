import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { IUser } from "../model/user.model";

export async function createUser(
  input: DocumentDefinition<
    Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

interface Icredential {
  email: string;
  password: string;
}

export async function validatePassword({ email, password }: Icredential) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}
