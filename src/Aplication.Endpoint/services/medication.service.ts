import { inject, injectable } from "tsyringe";
import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { MedicationRequest } from "../dtos/request/medication.request";
import { IMedicationService } from "../interfaces/medicationService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IMedicationRepository } from "../../Domain.Endpoint/interfaces/repositories/medicationRepository.interface";
import { MedicationMapper } from "../mappers/medication.mapper";

@injectable()
export default class MedicationService implements IMedicationService {
  private readonly _medicationRepository: IMedicationRepository;
  constructor(
    @inject("IMedicationRepository") medicationRepository: IMedicationRepository
  ) {
    this._medicationRepository = medicationRepository;
  }

  async getMedications(): Promise<Medication[]> {
    return await this._medicationRepository.getAll();
  }

  async getById(id: string): Promise<Medication | null> {
    return await this._medicationRepository.getById(id);
  }

  async addMedication(
    medication: MedicationRequest
  ): Promise<ServiceResult<Medication>> {
    const newMedication = MedicationMapper.toEntity(medication);

    await this._medicationRepository.create(newMedication);

    return {
      success: true,
      message: "Medication created",
      data: newMedication,
    };
  }

  async updateMedication(
    id: string,
    medication: MedicationRequest
  ): Promise<ServiceResult<Medication | null>> {
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

    return {
      success: true,
      message: "Medication updated",
      data: updatedMedication,
    };
  }

  async deleteMedication(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._medicationRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Medication not found" };
    }

    await this._medicationRepository.delete(existing);
    return { success: true, message: "Medication deleted" };
  }
}
