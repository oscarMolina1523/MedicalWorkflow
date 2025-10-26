import { Medication } from "../../entities/medication.model";

export interface IMedicationRepository {
  getAll(): Promise<Medication[]>;
  getById(id: string): Promise<Medication | null>;
  create(medication: Medication): Promise<void>;
  update(medication: Medication): Promise<void>;
  delete(medication: Medication): Promise<void>;
}
