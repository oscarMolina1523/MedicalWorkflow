import Patient from "../../entities/patient.model";

export interface IPatientRepository {
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient | null>;
  getByAreaId(areaId: string): Promise<Patient[]>
  create(patient: Patient): Promise<void>;
  update(patient: Patient): Promise<void>;
  delete(patient: Patient): Promise<void>;
}
