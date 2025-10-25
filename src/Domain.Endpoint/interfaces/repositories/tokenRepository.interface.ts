import { UserResponse } from "../../../Aplication.Endpoint/dtos/response/user.response";

export interface ITokenRepository {
  generateAccesToken(user: UserResponse): string;
}
