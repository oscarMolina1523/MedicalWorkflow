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
      active: dto.active,
    });
  }
}
