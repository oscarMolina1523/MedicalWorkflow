export interface MedicationRequest {
  name: string;
  description: string;
  expirationDate?: Date;
  unit: string; // "tableta", "ml", etc.
}
