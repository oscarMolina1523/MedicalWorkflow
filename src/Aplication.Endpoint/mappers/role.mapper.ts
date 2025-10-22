import Role from "../../Domain.Endpoint/entities/role.model";
import { generateId } from "../../shared/utils/generateId";
import { RoleRequest } from "../dtos/request/role.request";

export class RoleMapper {
  static toEntity(dto: RoleRequest): Role {
    const now = new Date();

    return new Role({
      id: generateId(),
      name: dto.name,
      description: dto.description,
      hierarchyLevel: dto.hierarchyLevel,
      createdAt: now,
      updatedAt: now,
    });
  }
}
