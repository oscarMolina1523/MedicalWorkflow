import User from "../../Domain.Endpoint/entities/user.model";
import { generateId } from "../../shared/utils/generateId";
import { UserRequest } from "../dtos/request/user.request";
import { UserResponse } from "../dtos/response/user.response";


export class UserMapper {
  static toEntity(dto: UserRequest, currentUser:string, departmentId:string): User {
    const now = new Date();

    return new User({
      id: generateId(),
      username: dto.username ?? dto.email.split("@")[0], 
      email: dto.email,
      password: dto.password,
      roleId: dto.roleId ?? "default-role-id",
      active: true,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      updatedBy: currentUser,
      departmentId: departmentId,
    });
  }

  static toPublic(user: User):UserResponse {
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
