import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRequest } from "../../Aplication.Endpoint/dtos/request/user.request";
dotenv.config();


export function generateAccesToken(user: UserRequest) {
  const secret = process.env.SECRET;
  if (!secret)
    throw new Error("JWT SECRET is not defined in environment variables");

  return jwt.sign(user, secret, { expiresIn: "1d" });
}