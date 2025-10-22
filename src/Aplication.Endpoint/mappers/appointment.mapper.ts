import Appointment from "../../Domain.Endpoint/entities/appointment.model";
import { generateId } from "../../shared/utils/generateId";
import { AppointmentRequest } from "../dtos/request/appointment.request";

export class AppointmentMapper {
  static toEntity(dto: AppointmentRequest, currentUser: string): Appointment {
    const now = new Date();

    return new Appointment({
      id: generateId(),
      patientId: dto.patientId,
      departmentId: dto.departmentId,
      doctorId: dto.doctorId,
      scheduledAt: dto.scheduledAt,
      status: dto.status,
      notes: dto.notes,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      updatedBy: currentUser,
    });
  }
}
