import { Action } from "../../Domain.Endpoint/entities/action.enum";
import AuditLog from "../../Domain.Endpoint/entities/auditLog.model";
import { generateId } from "../../shared/utils/generateId";

export default class LOGMapper {
  static toEntity(
    dto: Omit<AuditLog, "id" | "performedAt">
  ): AuditLog {
    const now = new Date();

    return new AuditLog({
      id: generateId(),
      entity: dto.entity,
      entityId: dto.entityId,
      action: dto.action,
      changes: dto.changes,
      performedAt: now,
      performedBy: dto.performedBy,
    });
  }
}
