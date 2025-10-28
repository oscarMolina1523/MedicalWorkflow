import MedicalService from "../../entities/medicalService.model";

export interface IMedicalServiceRepository {
  getAll(): Promise<MedicalService[]>;
  getById(id: string): Promise<MedicalService | null>;
  getByAreaId(areaId: string): Promise<MedicalService[]>;
  create(medicalService: MedicalService): Promise<void>;
  update(medicalService: MedicalService): Promise<void>;
  delete(medicalService: MedicalService): Promise<void>;
}
