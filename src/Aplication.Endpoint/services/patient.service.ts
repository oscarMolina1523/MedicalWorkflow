import { inject, injectable } from "tsyringe";
import Patient from "../../Domain.Endpoint/entities/patient.model";
import { IPatientRepository } from "../../Domain.Endpoint/interfaces/repositories/patientRepository.interface";
import { PatientRequest } from "../dtos/request/patient.request";
import { IPatientService } from "../interfaces/patientService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { PatientMapper } from "../mappers/patient.mapper";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class PatientService implements IPatientService {
  private readonly _patientRepository: IPatientRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IPatientRepository") patientRepository: IPatientRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._patientRepository = patientRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
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

    const log = LOGMapper.toEntity({
      entity: "Patient",
      entityId: newPatient.id,
      action: Action.CREATE,
      changes: "Create new patient",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Patient created", data: newPatient };
  }

  async updatePatient(
    id: string,
    patient: PatientRequest,
    token: string
  ): Promise<ServiceResult<Patient | null>> {
    const existing = await this._patientRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Patient not found", data: null };
    }

    const currentUser = this.getCurrentUser(token);

    // actualizar solo las propiedades necesarias
    const updatedPatient = PatientMapper.updateEntity(
      existing,
      patient,
      currentUser.id
    );
    await this._patientRepository.update(updatedPatient);

    const log = LOGMapper.toEntity({
      entity: "Patient",
      entityId: updatedPatient.id,
      action: Action.UPDATE,
      changes: "Update patient",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Patient updated", data: updatedPatient };
  }

  async deletePatient(
    id: string, token:string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._patientRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Patient not found" };
    }

    await this._patientRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "Patient",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete patient",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Patient deleted" };
  }
}
