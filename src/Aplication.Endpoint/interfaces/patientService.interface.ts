import Patient from "../../Domain.Endpoint/entities/patient.model";
import { PatientRequest } from "../dtos/request/patient.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IPatientService {
  getPatients(): Promise<Patient[]>;
  getById(id: string): Promise<Patient | null>;
  getByAreaId(token: string): Promise<Patient[]>;
  addPatient(patient: PatientRequest, token:string): Promise<ServiceResult<Patient>>;
  updatePatient(
    id: string,
    patient: PatientRequest,
    token:string
  ): Promise<ServiceResult<Patient | null>>;
  deletePatient(id: string, token:string): Promise<{ success: boolean; message: string }>;
}
