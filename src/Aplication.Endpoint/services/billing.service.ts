import { inject, injectable } from "tsyringe";
import Billing from "../../Domain.Endpoint/entities/billing.model";
import { IBillingRepository } from "../../Domain.Endpoint/interfaces/repositories/billingRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { BillingRequest } from "../dtos/request/billing.request";
import { IBillingService } from "../interfaces/billingService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { BillingMapper } from "../mappers/billing.mapper";

@injectable()
export default class BillingService implements IBillingService {
  private readonly _billingRepository: IBillingRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IBillingRepository") billingRepository: IBillingRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._billingRepository = billingRepository;
    this._tokenRepository = tokenRepository;
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

  async addBilling(billing: BillingRequest): Promise<ServiceResult<Billing>> {
    const newBilling = BillingMapper.toEntity(billing);
    await this._billingRepository.create(newBilling);

    return { success: true, message: "Billing created", data: newBilling };
  }

  async updateBilling(
    id: string,
    billing: BillingRequest
  ): Promise<ServiceResult<Billing | null>> {
    const existing = await this._billingRepository.getById(id);
    if (!existing) {
      return { success: false, message: "billing not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedBilling = BillingMapper.updateEntity(existing, billing);
    await this._billingRepository.update(updatedBilling);

    return { success: true, message: "Billing updated", data: updatedBilling };
  }

  async deleteBilling(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._billingRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Billing not found" };
    }

    await this._billingRepository.delete(existing);
    return { success: true, message: "Billing deleted" };
  }
}
