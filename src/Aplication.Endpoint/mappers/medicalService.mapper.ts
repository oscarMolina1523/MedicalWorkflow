import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { generateId } from "../../shared/utils/generateId";
import { MedicalServiceRequest } from "../dtos/request/medicalService.request";

export class MedicalServiceMapper {
  static toEntity(dto: MedicalServiceRequest): MedicalService {
    return new MedicalService({
      id: generateId(),
      name: dto.name,
      departmentId: dto.departmentId,
      baseCost: dto.baseCost,
      active: dto.active ?? true,
    });
  }

  static updateEntity(
    existing: MedicalService,
    dto: MedicalServiceRequest,
  ): MedicalService {

    return {
      ...existing, // conserva id, createdAt, createdBy, etc.
      name: dto.name ?? existing.name,
      departmentId: dto.departmentId ?? existing.departmentId,
      baseCost: dto.baseCost ?? existing.baseCost,
      active: dto.active ?? existing.active,
    };
  }
}
