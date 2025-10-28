import Billing from "../../entities/billing.model";

export interface IBillingRepository {
  getAll(): Promise<Billing[]>;
  getById(id: string): Promise<Billing | null>;
  getByAreaId(areaId: string): Promise<Billing[]>;
  create(billing: Billing): Promise<void>;
  update(billing: Billing): Promise<void>;
  delete(billing: Billing): Promise<void>;
}
