import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { MedicationRequest } from "../dtos/request/medication.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IMedicationService {
  getMedications(): Promise<Medication[]>;
  getById(id: string): Promise<Medication | null>;
  addMedication(medication: MedicationRequest): Promise<ServiceResult<Medication>>;
  updateMedication(
    id: string,
    medication: MedicationRequest
  ): Promise<ServiceResult<Medication | null>>;
  deleteMedication(id: string): Promise<{ success: boolean; message: string }>;
}
