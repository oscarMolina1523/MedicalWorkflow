export const AuditLogSchemas = {
  Action: {
    type: "string",
    description: "Type of action recorded in the audit log",
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
        description: "Unique audit record identifier",
        example: "log_001",
      },
      entity: {
        type: "string",
        description: "Name of the affected entity (User, Patient, Appointment, etc.)",
        example: "Patient",
      },
      entityId: {
        type: "string",
        description: "ID of the entity affected by the action",
        example: "pat_101",
      },
      action: {
        $ref: "#/components/schemas/Action",
      },
      changes: {
        type: "object",
        description: "Details of the changes made in JSON format",
        example: {
          before: { name: "Juan Pérez" },
          after: { name: "Juan Pérez López" },
        },
      },
      performedBy: {
        type: "string",
        description: "ID of the user who performed the action",
        example: "usr_admin",
      },
      performedAt: {
        type: "string",
        format: "date-time",
        description: "Date and time the action was performed",
        example: "2025-10-26T16:45:00Z",
      },
    },
  },
};
