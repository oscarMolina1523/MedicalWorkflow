import Department from "../../Domain.Endpoint/entities/department.model";
import { generateId } from "../../shared/utils/generateId";
import { DepartmentRequest } from "../dtos/request/department.request";

export class DepartmentMapper {
  static toEntity(dto: DepartmentRequest): Department {
    const now = new Date();

    return new Department({
      id: generateId(),
      name: dto.name,
      description: dto.description,
      headId: dto.headId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static updateEntity(existing: Department, dto: DepartmentRequest): Department {
    const now = new Date();

    return new Department({
      ...existing,
      name: dto.name.trim() ? dto.name: existing.name,
      description: dto.description.trim() ? dto.description: existing.description,
      headId: dto.headId.trim() ? dto.headId: existing.headId,
      updatedAt: now,
    });
  }
}
