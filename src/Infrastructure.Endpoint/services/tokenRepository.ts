import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { injectable } from "tsyringe";
import { UserResponse } from "../../Aplication.Endpoint/dtos/response/user.response";
dotenv.config();

@injectable()
export default class TokenRepository implements ITokenRepository {
  generateAccesToken(user: UserResponse):string{
    const secret = process.env.SECRET;
    if (!secret)
      throw new Error("JWT SECRET is not defined in environment variables");

    return jwt.sign(user, secret, { expiresIn: "1d" });
  }
}
