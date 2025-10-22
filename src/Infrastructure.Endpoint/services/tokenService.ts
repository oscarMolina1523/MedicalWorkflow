import { Request, Response, NextFunction } from "express";
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

export function decodeToken(req: Request): UserRequest {
  const secret = process.env.SECRET;
  if (!secret) throw new Error("JWT SECRET is not defined");

  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new Error("No token provided");

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  const decoded = jwt.verify(token, secret) as UserRequest;
  return decoded;
}