import User from "../../Domain.Endpoint/entities/user.model";
import { generateId } from "../../shared/utils/generateId";
import { UserRequest } from "../dtos/request/user.request";
import { UserResponse } from "../dtos/response/user.response";

export class UserMapper {
  static toEntity(dto: UserRequest, currentUser: string): User {
    const now = new Date();

    return new User({
      id: generateId(),
      username: dto.username ?? dto.email.split("@")[0],
      email: dto.email,
      password: dto.password,
      roleId: dto.roleId ?? "r-viewer",
      active: dto.active,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      updatedBy: currentUser,
      departmentId: dto.departmentId,
    });
  }

  static updateEntity(
    existing: UserResponse,
    dto: UserRequest,
    currentUser: string
  ): UserResponse {
    const now = new Date();

    return({
      ...existing, // mantiene id, createdAt, createdBy, etc.
      username: dto.username ?? existing.username,
      email: dto.email ?? existing.email,
      //password: dto.password ?? existing.password,
      roleId: dto.roleId ?? existing.roleId,
      active: dto.active ?? existing.active,
      departmentId: dto.departmentId ?? existing.departmentId,
      updatedAt: now,
      updatedBy: currentUser,
    });
  }

  static toPublic(user: User): UserResponse {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      active: user.active,
      departmentId: user.departmentId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
    };
  }
}
