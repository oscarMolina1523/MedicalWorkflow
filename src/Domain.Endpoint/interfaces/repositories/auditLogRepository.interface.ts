import AuditLog from "../../entities/auditLog.model";

export interface IAuditLogRepository {
  getAll(): Promise<AuditLog[]>;
  create(auditLog: AuditLog): Promise<void>;
}
