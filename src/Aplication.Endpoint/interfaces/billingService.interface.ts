import Billing from "../../Domain.Endpoint/entities/billing.model";
import { BillingRequest } from "../dtos/request/billing.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IBillingService {
  getBillings(): Promise<Billing[]>;
  getById(id: string): Promise<Billing | null>;
  getByAreaId(token: string): Promise<Billing[]>;
  addBilling(
    billing: BillingRequest
  ): Promise<ServiceResult<Billing>>;
  updateBilling(
    id: string,
    billing: BillingRequest
  ): Promise<ServiceResult<Billing | null>>;
  deleteBilling(id: string): Promise<{ success: boolean; message: string }>;
}
