import { inject, injectable } from "tsyringe";
import { IAuditLogService } from "../../Aplication.Endpoint/interfaces/auditLogService.interface";
import {Request, Response} from "express";

@injectable()
export default class AuditLogController {
  private readonly service: IAuditLogService;

  constructor(@inject("IAuditLogService") service: IAuditLogService) {
    this.service = service;
  }

  getAuditLogs = async (req: Request, res: Response) => {
    try {
      const auditLogs = await this.service.getAuditLogs();
      res.status(200).json({ success: true, data: auditLogs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get auditLogs" });
    }
  };
}
