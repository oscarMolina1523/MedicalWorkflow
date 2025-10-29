import { AppointmentPaths } from "./paths/appointment.path";
import { AuditLogPaths } from "./paths/auditLog.path";
import { AuthPaths } from "./paths/auth.path";
import { BillingPaths } from "./paths/billing.path";
import { DepartmentPaths } from "./paths/department.path";
import { ExpensePaths } from "./paths/expense.path";
import { InventoryPaths } from "./paths/inventory.path";
import { MedicalServicePaths } from "./paths/medicalService.path";
import { MedicationPaths } from "./paths/medication.path";
import { PatientPaths } from "./paths/patient.path";
import { RolePaths } from "./paths/role.path";
import { UserPaths } from "./paths/user.path";
import { AppointmentSchemas } from "./schemas/appointment.schema";
import { AuditLogSchemas } from "./schemas/auditLog.schema";
import { BillingSchemas } from "./schemas/billing.schema";
import { DepartmentSchemas } from "./schemas/department.schema";
import { ExpenseSchemas } from "./schemas/expense.schema";
import { InventorySchemas } from "./schemas/inventory.schema";
import { MedicalServiceSchemas } from "./schemas/medicalService.schema";
import { MedicationSchemas } from "./schemas/medication.schema";
import { PatientSchemas } from "./schemas/patient.schema";
import { RoleSchemas } from "./schemas/role.schema";
import { UserSchemas } from "./schemas/user.schema";

export const OpenApiSpecification = {
  openapi: "3.0.0",
  info: {
    title: "Hospital Manager API",
    version: "1.0.0",
    description: "API to manage the workflow of an entire hospital with at least 10 departments, a board of directors, and a CEO, in roles, access, and permissions.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  security: [
    {
      BearerAuth: [],
    },
  ],
  paths: {
    ...UserPaths,
    ...AuthPaths,
    ...RolePaths,
    ...MedicationPaths,
    ...DepartmentPaths,
    ...PatientPaths,
    ...AppointmentPaths,
    ...InventoryPaths,
    ...AuditLogPaths,
    ...MedicalServicePaths,
    ...BillingPaths,
    ...ExpensePaths
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...UserSchemas,
      ...RoleSchemas,
      ...MedicationSchemas,
      ...DepartmentSchemas,
      ...PatientSchemas,
      ...AppointmentSchemas,
      ...InventorySchemas,
      ...AuditLogSchemas,
      ...MedicalServiceSchemas,
      ...BillingSchemas,
      ...ExpenseSchemas
    },
  },
};
