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

  static updateEntity(existing: Patient, dto: PatientRequest, currentUser: string): Patient {
    const now = new Date();

    return {
      ...existing, // mantiene id, createdAt, createdBy, etc.
      firstName: dto.firstName.trim() ? dto.firstName: existing.firstName,
      lastName: dto.lastName.trim() ? dto.lastName: existing.lastName,
      birthDate: dto.birthDate ?? existing.birthDate,
      gender: dto.gender.trim() ? dto.gender: existing.gender,
      departmentId: dto.departmentId.trim() ? dto.departmentId: existing.departmentId,
      medicalHistory: dto.medicalHistory.trim() ? dto.medicalHistory: existing.medicalHistory,
      updatedAt: now,
      updatedBy: currentUser,
    };
  }
}
