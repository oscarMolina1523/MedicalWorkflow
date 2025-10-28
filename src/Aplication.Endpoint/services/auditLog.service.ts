import { inject, injectable } from "tsyringe";
import AuditLog from "../../Domain.Endpoint/entities/auditLog.model";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import { IAuditLogService } from "../interfaces/auditLogService.interface";
import { ServiceResult } from "../utils/serviceResult.type";

@injectable()
export default class AuditLogService implements IAuditLogService {
  private readonly _auditLogRepository: IAuditLogRepository;

  constructor(
    @inject("IAuditLogRepository") auditLogRepository: IAuditLogRepository
  ) {
    this._auditLogRepository = auditLogRepository;
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return await this._auditLogRepository.getAll();
  }

  async addAuditLog(auditLog: AuditLog): Promise<ServiceResult<AuditLog>> {
    await this._auditLogRepository.create(auditLog);

    return { success: true, message: "AuditLog created", data: auditLog };
  }
}
