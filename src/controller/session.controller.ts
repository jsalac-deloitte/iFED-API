import { Request, Response } from "express";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signingJwt } from "../utils/jwt.utils";
import config from "config";
import { IUser } from "../model/user.model";

export async function createUserSessionHandler(req: Request, res: Response) {
  //validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    res.status(401).send("Invalid Email or Password");
  }

  //create session
  const session = await createSession(user._id, req.get("user-agent") || "");
  //create an access token

  const accessToken = signingJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl"), algorithm: "HS256" } // 15 minutes
  );
  //create refresh token

  const refreshToken = signingJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>("accessTokenTtl") } // 15 minutes
  );
  //return access and refreshed token

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = await res.locals.user._id;
  const sessions = await findSessions({ user: userId, valid: true });
  return res.send(sessions);
}
