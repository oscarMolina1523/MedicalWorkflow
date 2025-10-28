import AuditLog from "../../Domain.Endpoint/entities/auditLog.model";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IAuditLogService {
  getAuditLogs(): Promise<AuditLog[]>;
  addAuditLog(
    auditLog: AuditLog
  ): Promise<ServiceResult<AuditLog>>;
}
