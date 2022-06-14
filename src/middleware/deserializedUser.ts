import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const deserializedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //strip the Bearer word fromt the authorization header
  const Bearer = await get(req, "headers.authorization", "");

  if (!Bearer) {
    return next();
  }
  const accessToken = Bearer.split(" ")[1];
  //verify token
  const { decoded, expired } = await verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};

export default deserializedUser;
