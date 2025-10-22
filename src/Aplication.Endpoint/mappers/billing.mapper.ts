import Billing from "../../Domain.Endpoint/entities/billing.model";
import { generateId } from "../../shared/utils/generateId";
import { BillingRequest } from "../dtos/request/billing.request";

export class BillingMapper {
  static toEntity(dto: BillingRequest): Billing {
    const now = new Date();
    return new Billing({
      id: generateId(),
      patientId: dto.patientId,
      appointmentId: dto.appointmentId,
      serviceId: dto.serviceId,
      amount: dto.amount,
      departmentId: dto.departmentId,
      status: dto.status,
      paymentMethod: dto.paymentMethod,
      createdAt: now,
      paidAt: dto.paidAt,
    });
  }
}
