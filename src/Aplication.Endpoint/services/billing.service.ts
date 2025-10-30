import { IAuditLogRepository } from "./../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import { inject, injectable } from "tsyringe";
import Billing from "../../Domain.Endpoint/entities/billing.model";
import { IBillingRepository } from "../../Domain.Endpoint/interfaces/repositories/billingRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { BillingRequest } from "../dtos/request/billing.request";
import { IBillingService } from "../interfaces/billingService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { BillingMapper } from "../mappers/billing.mapper";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class BillingService implements IBillingService {
  private readonly _billingRepository: IBillingRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IBillingRepository") billingRepository: IBillingRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._billingRepository = billingRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getBillings(): Promise<Billing[]> {
    return await this._billingRepository.getAll();
  }

  async getById(id: string): Promise<Billing | null> {
    return await this._billingRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<Billing[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._billingRepository.getByAreaId(currentUser.departmentId);
  }

  async addBilling(billing: BillingRequest, token:string): Promise<ServiceResult<Billing>> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }

    const newBilling = BillingMapper.toEntity(billing);
    await this._billingRepository.create(newBilling);
    
    const log = LOGMapper.toEntity({
      entity: "Billing",
      entityId: newBilling.id,
      action: Action.CREATE,
      changes: "Create new billing",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Billing created", data: newBilling };
  }

  async updateBilling(
    id: string,
    billing: BillingRequest,
    token:string
  ): Promise<ServiceResult<Billing | null>> {

    const currentUser = this.getCurrentUser(token);

    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }

    const existing = await this._billingRepository.getById(id);
    if (!existing) {
      return { success: false, message: "billing not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedBilling = BillingMapper.updateEntity(existing, billing);
    await this._billingRepository.update(updatedBilling);

    const log = LOGMapper.toEntity({
      entity: "Billing",
      entityId: existing.id,
      action: Action.UPDATE,
      changes: "Update billing",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Billing updated", data: updatedBilling };
  }

  async deleteBilling(
    id: string,
    token:string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }

    const existing = await this._billingRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Billing not found" };
    }

    const log = LOGMapper.toEntity({
      entity: "Billing",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "deleted billing",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    await this._billingRepository.delete(existing);
    return { success: true, message: "Billing deleted" };
  }
}
