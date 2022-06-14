import { FilterQuery } from "mongoose";
import SessionModel, { ISession } from "../model/session.model";

export async function createSession(userId: string, userAgent: string) {
  //delete active session of user

  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSessions(query: FilterQuery<ISession>) {
  return SessionModel.find(query).lean();
}
