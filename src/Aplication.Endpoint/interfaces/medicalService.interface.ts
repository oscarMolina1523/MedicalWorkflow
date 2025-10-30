import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { MedicalServiceRequest } from "../dtos/request/medicalService.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IMedicalServiceService {
  getMedicalServices(): Promise<MedicalService[]>;
  getById(id: string): Promise<MedicalService | null>;
  getByAreaId(token: string): Promise<MedicalService[]>;
  addMedicalService(
    medicalService: MedicalServiceRequest,
    token:string
  ): Promise<ServiceResult<MedicalService>>;
  updateMedicalService(
    id: string,
    medicalService: MedicalServiceRequest,
    token:string
  ): Promise<ServiceResult<MedicalService | null>>;
  deleteMedicalService(id: string, token:string): Promise<{ success: boolean; message: string }>;
}
