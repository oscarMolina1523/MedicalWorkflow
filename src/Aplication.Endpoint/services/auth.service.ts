import { inject, injectable } from "tsyringe";
import { UserResponse } from "../dtos/response/user.response";
import { IAuthService } from "../interfaces/authService.interface";
import { AuthResult } from "../utils/authResult.type";
import { ServiceResult } from "../utils/serviceResult.type";
import { IUserService } from "../interfaces/userService.interface";
import bcrypt from "bcryptjs/umd/types";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { UserMapper } from "../mappers/user.mapper";
import { UserRequest } from "../dtos/request/user.request";

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

  async register(user: UserRequest): Promise<ServiceResult<UserResponse>> {
    const existing = await this._userService.getByEmail(user.email);
    if (existing) {
      return { success: false, message: "El correo ya está registrado" };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const created = await this._userService.addUser(
      {
        ...user,
        password: hashedPassword,
      } as UserRequest,
      "system"
    );

    if (!created.success || !created.data) {
      return { success:false, message: "Error al registrar usuario" };
    }

    return {success:true, message: "Usuario registrado exitosamente", data: created.data };
  }

  logout(): string {
    const result="Se ha cerrado sesión correctamente";
    return result;
  }
}
