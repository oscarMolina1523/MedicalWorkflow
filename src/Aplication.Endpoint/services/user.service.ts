import { inject, injectable } from "tsyringe";
import { ServiceResult } from "../utils/serviceResult.type";
import { IUserService } from "../interfaces/userService.interface";
import { IUserRepository } from "../../Domain.Endpoint/interfaces/repositories/userRepository.interface";
import { UserResponse } from "../dtos/response/user.response";
import User from "../../Domain.Endpoint/entities/user.model";
import { UserRequest } from "../dtos/request/user.request";
import { UserMapper } from "../mappers/user.mapper";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IUserRepository") userRepository: IUserRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._userRepository = userRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getUsers(): Promise<UserResponse[]> {
    return await this._userRepository.getAll();
  }

  async getById(id: string): Promise<UserResponse | null> {
    return await this._userRepository.getById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this._userRepository.getByEmail(email);
  }

  async getByAreaId(token: string): Promise<UserResponse[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._userRepository.getByAreaId(currentUser.departmentId);
  }

  async registerUser(user: UserRequest): Promise<ServiceResult<UserResponse>> {
    const newUser = UserMapper.toEntity(user, "system");
    await this._userRepository.create(newUser);

    const log = LOGMapper.toEntity({
      entity: "User",
      entityId: newUser.id,
      action: Action.CREATE,
      changes: "Register new user (public)",
      performedBy: "system",
    });

    await this._logRepository.create(log);

    return { success: true, message: "User registered", data: newUser };
  }

  async addUser(
    user: UserRequest,
    token: string
  ): Promise<ServiceResult<UserResponse>> {
    const currentUser = this.getCurrentUser(token);
    const newUser = UserMapper.toEntity(user, currentUser.id);
    await this._userRepository.create(newUser);

    const log = LOGMapper.toEntity({
      entity: "User",
      entityId: newUser.id,
      action: Action.CREATE,
      changes: "Create new role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "User created", data: newUser };
  }

  async updateUser(
    id: string,
    user: UserRequest,
    token: string
  ): Promise<ServiceResult<UserResponse | null>> {
    const existing = await this._userRepository.getByIdWithPassword(id);
    if (!existing) {
      return { success: false, message: "User not found", data: null };
    }

    const currentUser = this.getCurrentUser(token);

    // actualizar solo las propiedades necesarias
    const updatedUser = UserMapper.updateEntity(existing, user, currentUser.id);
    await this._userRepository.update(updatedUser);

    const log = LOGMapper.toEntity({
      entity: "User",
      entityId: updatedUser.id,
      action: Action.UPDATE,
      changes: "Update role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "User updated", data: updatedUser };
  }

  async deleteUser(
    id: string,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._userRepository.getById(id);
    if (!existing) {
      return { success: false, message: "User not found" };
    }

    await this._userRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "User",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "User deleted" };
  }
}
