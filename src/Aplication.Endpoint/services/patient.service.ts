import { inject, injectable } from "tsyringe";
import Patient from "../../Domain.Endpoint/entities/patient.model";
import { IPatientRepository } from "../../Domain.Endpoint/interfaces/repositories/patientRepository.interface";
import { PatientRequest } from "../dtos/request/patient.request";
import { IPatientService } from "../interfaces/patientService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { PatientMapper } from "../mappers/patient.mapper";

@injectable()
export default class PatientService implements IPatientService {
  private readonly _patientRepository: IPatientRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IPatientRepository") patientRepository: IPatientRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._patientRepository = patientRepository;
    this._tokenRepository = tokenRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getPatients(): Promise<Patient[]> {
    return await this._patientRepository.getAll();
  }

  async getById(id: string): Promise<Patient | null> {
    return await this._patientRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<Patient[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._patientRepository.getByAreaId(currentUser.departmentId);
  }

  async addPatient(
    patient: PatientRequest,
    token: string
  ): Promise<ServiceResult<Patient>> {
    const currentUser = this.getCurrentUser(token);
    const newPatient = PatientMapper.toEntity(patient, currentUser.id);
    await this._patientRepository.create(newPatient);

    return { success: true, message: "Patient created", data: newPatient };
  }

  async updatePatient(
    id: string,
    patient: PatientRequest,
    token:string
  ): Promise<ServiceResult<Patient | null>> {
    const existing = await this._patientRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Patient not found", data: null };
    }

    const currentUser = this.getCurrentUser(token);

    // actualizar solo las propiedades necesarias
    const updatedPatient = PatientMapper.updateEntity(existing, patient, currentUser.id);
    await this._patientRepository.update(updatedPatient);

    return { success: true, message: "Patient updated", data: updatedPatient };
  }

  async deletePatient(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._patientRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Patient not found" };
    }

    await this._patientRepository.delete(existing);
    return { success: true, message: "Patient deleted" };
  }
}
