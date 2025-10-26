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

  static updateEntity(existing: Role, dto: RoleRequest): Role {
    const now = new Date();

    return new Role({
      ...existing,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      hierarchyLevel: dto.hierarchyLevel ?? existing.hierarchyLevel,
      updatedAt: now,
    });
  }
}
