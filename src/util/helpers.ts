import {
  EMAIL_TOKEN_EXPIRATION_MINUTES,
  AUTHENTICATION_TOKEN_EXPIRATION_HOURS,
} from "./constants";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./constants";

//generate a random 8 digit number as an emailToken
export const _generateEmailToken = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

export const _generateAuthToken = (tokenId: number): string => {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
};

export const expirationTime = new Date(
  new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES * 60000,
);

export const authenticationExpirationTime = new Date(
  new Date().getTime() + AUTHENTICATION_TOKEN_EXPIRATION_HOURS * 3600000,
);
