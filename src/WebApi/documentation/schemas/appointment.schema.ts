export const AppointmentSchemas = {
  AppointmentStatus: {
    type: "string",
    description: "Estado actual de la cita médica",
    enum: ["scheduled", "completed", "canceled"],
    example: "scheduled",
  },

  AppointmentRequest: {
    type: "object",
    required: [
      "patientId",
      "departmentId",
      "doctorId",
      "scheduledAt",
      "status",
      "notes",
    ],
    properties: {
      patientId: {
        type: "string",
        description: "ID del paciente asignado a la cita",
        example: "pat_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento donde se realiza la cita",
        example: "dep_12345",
      },
      doctorId: {
        type: "string",
        description: "ID del médico asignado",
        example: "usr_doc_10",
      },
      scheduledAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora programada para la cita",
        example: "2025-11-02T09:30:00Z",
      },
      status: {
        $ref: "#/components/schemas/AppointmentStatus",
      },
      notes: {
        type: "string",
        description: "Notas adicionales o motivo de la cita",
        example: "Consulta de seguimiento postoperatorio",
      },
    },
  },

  Appointment: {
    type: "object",
    required: [
      "id",
      "patientId",
      "departmentId",
      "doctorId",
      "scheduledAt",
      "status",
      "notes",
      "createdAt",
      "updatedAt",
      "createdBy",
      "updatedBy",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único de la cita",
        example: "app_001",
      },
      patientId: {
        type: "string",
        description: "ID del paciente asignado a la cita",
        example: "pat_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento donde se realiza la cita",
        example: "dep_12345",
      },
      doctorId: {
        type: "string",
        description: "ID del médico asignado",
        example: "usr_doc_10",
      },
      scheduledAt: {
        type: "string",
        format: "date-time",
        description: "Fecha y hora programada para la cita",
        example: "2025-11-02T09:30:00Z",
      },
      status: {
        $ref: "#/components/schemas/AppointmentStatus",
      },
      notes: {
        type: "string",
        description: "Notas adicionales o motivo de la cita",
        example: "Revisión general",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Fecha de creación del registro",
        example: "2025-10-26T14:35:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Última fecha de actualización",
        example: "2025-10-27T10:15:00Z",
      },
      createdBy: {
        type: "string",
        description: "ID del usuario que creó la cita",
        example: "usr_admin",
      },
      updatedBy: {
        type: "string",
        description: "ID del usuario que actualizó la cita por última vez",
        example: "usr_jefeDepto",
      },
    },
  },
};
