import { inject, injectable } from "tsyringe";
import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { IMedicalServiceRepository } from "../../Domain.Endpoint/interfaces/repositories/medicalService.interface";
import { MedicalServiceRequest } from "../dtos/request/medicalService.request";
import { IMedicalServiceService } from "../interfaces/medicalService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { MedicalServiceMapper } from "../mappers/medicalService.mapper";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class MedicalServiceService implements IMedicalServiceService {
  private readonly _medicalServiceRepository: IMedicalServiceRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IMedicalServiceRepository")
    medicalServiceRepository: IMedicalServiceRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLog") logRepository: IAuditLogRepository
  ) {
    this._medicalServiceRepository = medicalServiceRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getMedicalServices(): Promise<MedicalService[]> {
    return await this._medicalServiceRepository.getAll();
  }

  async getById(id: string): Promise<MedicalService | null> {
    return await this._medicalServiceRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<MedicalService[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._medicalServiceRepository.getByAreaId(
      currentUser.departmentId
    );
  }

  async addMedicalService(
    medicalService: MedicalServiceRequest,
    token: string
  ): Promise<ServiceResult<MedicalService>> {
    const currentUser = this.getCurrentUser(token);

    const newMedicalService = MedicalServiceMapper.toEntity(medicalService);
    await this._medicalServiceRepository.create(newMedicalService);

    const log = LOGMapper.toEntity({
      entity: "Medical Service",
      entityId: newMedicalService.id,
      action: Action.CREATE,
      changes: "Create new inventory",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return {
      success: true,
      message: "Medical service created",
      data: newMedicalService,
    };
  }

  async updateMedicalService(
    id: string,
    medicalService: MedicalServiceRequest,
    token: string
  ): Promise<ServiceResult<MedicalService | null>> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._medicalServiceRepository.getById(id);
    if (!existing) {
      return {
        success: false,
        message: "Medical Service not found",
        data: null,
      };
    }

    // actualizar solo las propiedades necesarias
    const updatedMedicalService = MedicalServiceMapper.updateEntity(
      existing,
      medicalService
    );
    await this._medicalServiceRepository.update(updatedMedicalService);

    const log = LOGMapper.toEntity({
      entity: "Medical Service",
      entityId: updatedMedicalService.id,
      action: Action.UPDATE,
      changes: "Update inventory",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return {
      success: true,
      message: "Medical Service updated",
      data: updatedMedicalService,
    };
  }

  async deleteMedicalService(
    id: string,
    token: string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._medicalServiceRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Medical Service not found" };
    }

    await this._medicalServiceRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "Medical Service",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete inventory",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Medical Service deleted" };
  }
}
