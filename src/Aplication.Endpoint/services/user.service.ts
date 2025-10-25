import { inject, injectable } from "tsyringe";
import { ServiceResult } from "../utils/serviceResult.type";
import { IUserService } from "../interfaces/userService.interface";
import { IUserRepository } from "../../Domain.Endpoint/interfaces/repositories/userRepository.interface";
import { UserResponse } from "../dtos/response/user.response";
import User from "../../Domain.Endpoint/entities/user.model";
import { UserRequest } from "../dtos/request/user.request";
import { UserMapper } from "../mappers/user.mapper";

@injectable()
export default class UserService implements IUserService {
  private readonly _userRepository: IUserRepository;
  constructor(@inject("IUserRepository") userRepository: IUserRepository) {
    this._userRepository = userRepository;
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

  async getByAreaId(areaId: string): Promise<UserResponse[]> {
    return await this._userRepository.getByAreaId(areaId);
  }

  async addUser(
    user: UserRequest,
    currentUserId: string
  ): Promise<ServiceResult<UserResponse>> {
    const newUser = UserMapper.toEntity(user, currentUserId);
    await this._userRepository.create(newUser);

    return { success: true, message: "User created", data: newUser };
  }

  async updateUser(
    id: string,
    user: UserRequest,
    currentUserId: string
  ): Promise<ServiceResult<UserResponse | null>> {
    const existing = await this._userRepository.getByIdWithPassword(id);
    if (!existing) {
      return { success: false, message: "User not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedUser = UserMapper.updateEntity(existing, user, currentUserId);
    await this._userRepository.update(updatedUser);

    return { success: true, message: "User updated", data: updatedUser };
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._userRepository.getById(id);
    if (!existing) {
      return { success: false, message: "User not found" };
    }

    await this._userRepository.delete(existing);
    return { success: true, message: "User deleted" };
  }
}
