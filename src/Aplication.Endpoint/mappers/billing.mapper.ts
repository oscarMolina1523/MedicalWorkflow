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

  static updateEntity(
    existing: Billing,
    dto: BillingRequest,
  ): Billing {

    return {
      ...existing, // mantiene id, createdAt, createdBy, etc.
      patientId: dto.patientId ?? existing.patientId,
      appointmentId: dto.appointmentId ?? existing.appointmentId,
      serviceId: dto.serviceId ?? existing.serviceId,
      amount: dto.amount ?? existing.amount,
      departmentId: dto.departmentId ?? existing.departmentId,
      status: dto.status ?? existing.status,
      paymentMethod: dto.paymentMethod ?? existing.paymentMethod,
      paidAt: dto.paidAt ?? existing.paidAt,
    };
  }
}
