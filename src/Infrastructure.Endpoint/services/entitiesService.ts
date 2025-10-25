import { EntityType } from "../utils/entityTypes";
import {
  SqlEntitySettings,
  SqlColumnSettings,
} from "../builders/sqlEntitySettings";
import { IEntitiesService } from "../interfaces/entitiesService.interface";
import { injectable } from "tsyringe";

@injectable()
export class EntitiesService implements IEntitiesService {
  private entities = new Map<EntityType, SqlEntitySettings>();

  constructor() {
    this.buildEntities();
  }

  GetSettings(type: EntityType): SqlEntitySettings {
    const settings = this.entities.get(type);
    if (!settings) {
      throw new Error(`Entidad no encontrada: ${type}`);
    }
    return settings;
  }

  private buildEntities(): void {
    this.entities.set(EntityType.Role, this.getRoleSettings());
    this.entities.set(EntityType.User, this.getUserSettings());
    this.entities.set(EntityType.Department, this.getDepartmentSettings());
    this.entities.set(EntityType.Patient, this.getPatientSettings());
    this.entities.set(EntityType.Medication, this.getMedicationSettings());
    this.entities.set(EntityType.MedicalService, this.getMedicalServiceSettings());
    this.entities.set(EntityType.Inventory, this.getInventorySettings());
    this.entities.set(EntityType.Appointment, this.getAppointmentSettings());
    this.entities.set(EntityType.Billing, this.getBillingSettings());
    this.entities.set(EntityType.Expense, this.getExpenseSettings());
    this.entities.set(EntityType.KPI, this.getKPISettings());
    this.entities.set(EntityType.AuditLog, this.getAuditLogSettings());
  }

  private getRoleSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
      new SqlColumnSettings("HIERARCHY_LEVEL", "hierarchyLevel", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
    ];
    return new SqlEntitySettings("ROLES", columns);
  }

  private getUserSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("USERNAME", "username", false),
      new SqlColumnSettings("EMAIL", "email", false),
      new SqlColumnSettings("PASSWORD", "password", false),
      new SqlColumnSettings("ROLE_ID", "roleId", false),
      new SqlColumnSettings("ACTIVE", "active", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
      new SqlColumnSettings("UPDATED_BY", "updatedBy", false),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
    ];
    return new SqlEntitySettings("USERS", columns);
  }

  private getDepartmentSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
      new SqlColumnSettings("HEAD_ID", "headId", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
    ];
    return new SqlEntitySettings("DEPARTMENTS", columns);
  }

  private getPatientSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("FIRST_NAME", "firstName", false),
      new SqlColumnSettings("LAST_NAME", "lastName", false),
      new SqlColumnSettings("BIRTH_DATE", "birthDate", false),
      new SqlColumnSettings("GENDER", "gender", false),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("MEDICAL_HISTORY", "medicalHistory", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
      new SqlColumnSettings("UPDATED_BY", "updatedBy", false),
    ];
    return new SqlEntitySettings("PATIENTS", columns);
  }

  private getMedicationSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
      new SqlColumnSettings("EXPIRATION_DATE", "expirationDate", false),
      new SqlColumnSettings("UNIT", "unit", false),
      new SqlColumnSettings("ACTIVE", "active", false),
    ];
    return new SqlEntitySettings("MEDICATIONS", columns);
  }

  private getMedicalServiceSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("BASE_COST", "baseCost", false),
      new SqlColumnSettings("ACTIVE", "active", false),
    ];
    return new SqlEntitySettings("MEDICAL_SERVICES", columns);
  }

  private getInventorySettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("MEDICATION_ID", "medicationId", false),
      new SqlColumnSettings("QUANTITY", "quantity", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
      new SqlColumnSettings("UPDATED_BY", "updatedBy", false),
    ];
    return new SqlEntitySettings("INVENTORIES", columns);
  }

  private getAppointmentSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("PATIENT_ID", "patientId", false),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("DOCTOR_ID", "doctorId", false),
      new SqlColumnSettings("SCHEDULED_AT", "scheduledAt", false),
      new SqlColumnSettings("STATUS", "status", false),
      new SqlColumnSettings("NOTES", "notes", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("UPDATED_AT", "updatedAt", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
      new SqlColumnSettings("UPDATED_BY", "updatedBy", false),
    ];
    return new SqlEntitySettings("APPOINTMENTS", columns);
  }

  private getBillingSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("PATIENT_ID", "patientId", false),
      new SqlColumnSettings("APPOINTMENT_ID", "appointmentId", false),
      new SqlColumnSettings("SERVICE_ID", "serviceId", false),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("AMOUNT", "amount", false),
      new SqlColumnSettings("STATUS", "status", false),
      new SqlColumnSettings("PAYMENT_METHOD", "paymentMethod", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("PAID_AT", "paidAt", false),
    ];
    return new SqlEntitySettings("BILLINGS", columns);
  }

  private getExpenseSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("DESCRIPTION", "description", false),
      new SqlColumnSettings("CATEGORY", "category", false),
      new SqlColumnSettings("AMOUNT", "amount", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
    ];
    return new SqlEntitySettings("EXPENSES", columns);
  }

  private getKPISettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("DEPARTMENT_ID", "departmentId", false),
      new SqlColumnSettings("NAME", "name", false),
      new SqlColumnSettings("VALUE", "value", false),
      new SqlColumnSettings("METRIC_DATE", "metricDate", false),
      new SqlColumnSettings("CREATED_AT", "createdAt", false),
      new SqlColumnSettings("CREATED_BY", "createdBy", false),
    ];
    return new SqlEntitySettings("KPIS", columns);
  }

  private getAuditLogSettings(): SqlEntitySettings {
    const columns: SqlColumnSettings[] = [
      new SqlColumnSettings("ID", "id", true),
      new SqlColumnSettings("ENTITY", "entity", false),
      new SqlColumnSettings("ENTITY_ID", "entityId", false),
      new SqlColumnSettings("ACTION", "action", false),
      new SqlColumnSettings("CHANGES", "changes", false),
      new SqlColumnSettings("PERFORMED_AT", "performedAt", false),
      new SqlColumnSettings("PERFORMED_BY", "performedBy", false),
    ];
    return new SqlEntitySettings("AUDIT_LOGS", columns);
  }
}
