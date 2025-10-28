import { inject, injectable } from "tsyringe";
import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { IMedicalServiceRepository } from "../../Domain.Endpoint/interfaces/repositories/medicalService.interface";
import { MedicalServiceRequest } from "../dtos/request/medicalService.request";
import { IMedicalServiceService } from "../interfaces/medicalService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { MedicalServiceMapper } from "../mappers/medicalService.mapper";

@injectable()
export default class MedicalServiceService implements IMedicalServiceService {
  private readonly _medicalServiceRepository: IMedicalServiceRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IMedicalServiceRepository")
    medicalServiceRepository: IMedicalServiceRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._medicalServiceRepository = medicalServiceRepository;
    this._tokenRepository = tokenRepository;
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
    medicalService: MedicalServiceRequest
  ): Promise<ServiceResult<MedicalService>> {
    const newMedicalService = MedicalServiceMapper.toEntity(medicalService);
    await this._medicalServiceRepository.create(newMedicalService);

    return {
      success: true,
      message: "Patient created",
      data: newMedicalService,
    };
  }

  async updateMedicalService(
    id: string,
    medicalService: MedicalServiceRequest
  ): Promise<ServiceResult<MedicalService | null>> {
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

    return {
      success: true,
      message: "Medical Service updated",
      data: updatedMedicalService,
    };
  }

  async deleteMedicalService(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._medicalServiceRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Medical Service not found" };
    }

    await this._medicalServiceRepository.delete(existing);
    return { success: true, message: "Medical Service deleted" };
  }
}
