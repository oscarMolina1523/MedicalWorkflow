import { inject, injectable } from "tsyringe";
import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { MedicationRequest } from "../dtos/request/medication.request";
import { IMedicationService } from "../interfaces/medicationService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IMedicationRepository } from "../../Domain.Endpoint/interfaces/repositories/medicationRepository.interface";
import { MedicationMapper } from "../mappers/medication.mapper";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class MedicationService implements IMedicationService {
  private readonly _medicationRepository: IMedicationRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IMedicationRepository")
    medicationRepository: IMedicationRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._medicationRepository = medicationRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getMedications(): Promise<Medication[]> {
    return await this._medicationRepository.getAll();
  }

  async getById(id: string): Promise<Medication | null> {
    return await this._medicationRepository.getById(id);
  }

  async addMedication(
    medication: MedicationRequest,
    token: string
  ): Promise<ServiceResult<Medication>> {
    const currentUser = this.getCurrentUser(token);
    const newMedication = MedicationMapper.toEntity(medication);

    await this._medicationRepository.create(newMedication);

    const log = LOGMapper.toEntity({
      entity: "Medication",
      entityId: newMedication.id,
      action: Action.CREATE,
      changes: "Create new medication",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return {
      success: true,
      message: "Medication created",
      data: newMedication,
    };
  }

  async updateMedication(
    id: string,
    medication: MedicationRequest, 
    token:string
  ): Promise<ServiceResult<Medication | null>> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._medicationRepository.getById(id);

    if (!existing) {
      return { success: false, message: "Medication not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedMedication = MedicationMapper.updateEntity(
      existing,
      medication
    );

    await this._medicationRepository.update(updatedMedication);

    const log = LOGMapper.toEntity({
      entity: "Medication",
      entityId: updatedMedication.id,
      action: Action.UPDATE,
      changes: "Update medication",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return {
      success: true,
      message: "Medication updated",
      data: updatedMedication,
    };
  }

  async deleteMedication(
    id: string, token:string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._medicationRepository.getById(id);

    if (!existing) {
      return { success: false, message: "Medication not found" };
    }

    await this._medicationRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "Medication",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete medication",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Medication deleted" };
  }
}
