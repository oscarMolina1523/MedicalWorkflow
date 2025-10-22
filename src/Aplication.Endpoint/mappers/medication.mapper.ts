import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { generateId } from "../../shared/utils/generateId";
import { MedicationRequest } from "../dtos/request/medication.request";

export class MedicationMapper{
    static toEntity(dto: MedicationRequest): Medication {
        return new Medication({
            id: generateId(),
            name: dto.name,
            description: dto.description,
            expirationDate: dto.expirationDate,
            unit: dto.unit,
            active: dto.active,
        });
    }
}