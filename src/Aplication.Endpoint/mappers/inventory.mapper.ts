import Inventory from "../../Domain.Endpoint/entities/inventory.model";
import { generateId } from "../../shared/utils/generateId";
import { InventoryRequest } from "../dtos/request/inventory.request";

export class InventoryMapper {
  static toEntity(dto: InventoryRequest, currentUser: string): Inventory {
    const now = new Date();
    return new Inventory({
      id: generateId(),
      departmentId: dto.departmentId,
      medicationId: dto.medicationId,
      quantity: dto.quantity,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      updatedBy: currentUser,
    });
  }

  static updateEntity(
    existing: Inventory,
    dto: InventoryRequest,
    currentUser: string
  ): Inventory {
    const now = new Date();

    return {
      ...existing, // mantiene id, createdAt, createdBy, etc.
      departmentId: dto.departmentId.trim() ? dto.departmentId: existing.departmentId,
      medicationId: dto.medicationId.trim() ? dto.medicationId: existing.medicationId,
      quantity: dto.quantity ?? existing.quantity,
      updatedAt: now,
      updatedBy: currentUser,
    };
  }
}
