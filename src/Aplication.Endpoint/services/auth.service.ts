import { inject, injectable } from "tsyringe";
import { UserResponse } from "../dtos/response/user.response";
import { IAuthService } from "../interfaces/authService.interface";
import { AuthResult } from "../utils/authResult.type";
import { ServiceResult } from "../utils/serviceResult.type";
import { IUserService } from "../interfaces/userService.interface";
import bcrypt from "bcryptjs/umd/types";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { UserMapper } from "../mappers/user.mapper";

@injectable()
export default class AuthService implements IAuthService {
  private readonly _userService: IUserService;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IUserService") userService: IUserService,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._userService = userService;
    this._tokenRepository = tokenRepository;
  }

  async login(
    email: string,
    password: string
  ): Promise<AuthResult<UserResponse>> {
    const user = await this._userService.getByEmail(email);
    if (!user) {
      return { message: "Usuario incorrecto" };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { message: "Credenciales inválidas" };
    }

    const data = UserMapper.toPublic(user);

    const token = this._tokenRepository.generateAccesToken(data);

    return { message: "Login exitoso", data: data, token };
  }

  register(): Promise<ServiceResult<UserResponse>> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
