import jwt from "jsonwebtoken";
import config from "config";
require("@babel/polyfill");

const jwtKey = config.get<string>("jwtKey");

export const signingJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(object, jwtKey, Object.assign({}, options));
};

export const verifyJwt = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, jwtKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.log("verify jwt error", error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
