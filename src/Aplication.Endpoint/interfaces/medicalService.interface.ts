import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { MedicalServiceRequest } from "../dtos/request/medicalService.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IMedicalServiceService {
  getMedicalServices(): Promise<MedicalService[]>;
  getById(id: string): Promise<MedicalService | null>;
  getByAreaId(token: string): Promise<MedicalService[]>;
  addMedicalService(
    medicalService: MedicalServiceRequest,
  ): Promise<ServiceResult<MedicalService>>;
  updateMedicalService(
    id: string,
    medicalService: MedicalServiceRequest,
  ): Promise<ServiceResult<MedicalService | null>>;
  deleteMedicalService(id: string): Promise<{ success: boolean; message: string }>;
}
