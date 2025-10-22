import Patient from "../../Domain.Endpoint/entities/patient.model";
import { generateId } from "../../shared/utils/generateId";
import { PatientRequest } from "../dtos/request/patient.request";

export class PatientMapper {
  static toEntity(dto: PatientRequest, currentUser: string): Patient {
    const now = new Date();

    return new Patient({
      id: generateId(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: dto.birthDate,
      gender: dto.gender,
      departmentId: dto.departmentId,
      medicalHistory: dto.medicalHistory,
      createdAt: now,
      updatedAt: now,
      createdBy: currentUser,
      updatedBy: currentUser,
    });
  }
}
