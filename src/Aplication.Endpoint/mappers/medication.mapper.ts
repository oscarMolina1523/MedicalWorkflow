import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { generateId } from "../../shared/utils/generateId";
import { MedicationRequest } from "../dtos/request/medication.request";
import { createOneYearExpirationDate } from "../utils/dateHelpers";

export class MedicationMapper {
  static toEntity(dto: MedicationRequest): Medication {
    return new Medication({
      id: generateId(),
      name: dto.name,
      description: dto.description ?? "no description provided",
      expirationDate: dto.expirationDate ?? createOneYearExpirationDate(),
      unit: dto.unit,
      active: dto.active,
    });
  }

  static updateEntity(
    existing: Medication,
    dto: MedicationRequest
  ): Medication {

    return new Medication({
      ...existing,
      name: dto.name.trim() ?? existing.name,
      description: dto.description.trim() ?? existing.description,
      expirationDate: dto.expirationDate ?? existing.expirationDate,
      unit: dto.unit.trim() ?? existing.unit,
      active: dto.active ?? existing.active,
    });
  }
}
