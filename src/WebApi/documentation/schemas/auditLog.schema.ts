export const AuditLogSchemas = {
  Action: {
    type: "string",
    description: "Tipo de acción registrada en el log de auditoría",
    enum: ["create", "update", "delete", "view", "login", "logout"],
    example: "update",
  },

  AuditLog: {
    type: "object",
    required: [
      "id",
      "entity",
      "entityId",
      "action",
      "changes",
      "performedBy",
      "performedAt",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único del registro de auditoría",
        example: "log_001",
      },
      entity: {
        type: "string",
        description: "Nombre de la entidad afectada (User, Patient, Appointment, etc.)",
        example: "Patient",
      },
      entityId: {
        type: "string",
        description: "ID de la entidad afectada por la acción",
        example: "pat_101",
      },
      action: {
        $ref: "#/components/schemas/Action",
      },
      changes: {
        type: "object",
        description: "Detalles de los cambios realizados en formato JSON",
        example: {
          before: { name: "Juan Pérez" },
          after: { name: "Juan Pérez López" },
        },
      },
      performedBy: {
        type: "string",
        description: "ID del usuario que realizó la acción",
        example: "usr_admin",
      },
      performedAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora en que se realizó la acción",
        example: "2025-10-26T16:45:00Z",
      },
    },
  },
};
