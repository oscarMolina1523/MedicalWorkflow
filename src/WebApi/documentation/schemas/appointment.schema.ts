export const AppointmentSchemas = {
  AppointmentStatus: {
    type: "string",
    description: "Current status of medical appointment",
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
        description: "Patient ID assigned to the appointment",
        example: "pat_001",
      },
      departmentId: {
        type: "string",
        description: "ID of the department where the appointment is being made",
        example: "dep_12345",
      },
      doctorId: {
        type: "string",
        description: "Assigned Physician ID",
        example: "usr_doc_10",
      },
      scheduledAt: {
        type: "string",
        format: "date-time",
        description: "Date and time scheduled for the appointment",
        example: "2025-11-02T09:30:00Z",
      },
      status: {
        $ref: "#/components/schemas/AppointmentStatus",
      },
      notes: {
        type: "string",
        description: "Additional notes or reason for the appointment",
        example: "Post-operative follow-up consultation",
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
        description: "Unique appointment identifier",
        example: "app_001",
      },
      patientId: {
        type: "string",
        description: "Patient ID assigned to the appointment",
        example: "pat_001",
      },
      departmentId: {
        type: "string",
        description: "ID of the department where the appointment is being made",
        example: "dep_12345",
      },
      doctorId: {
        type: "string",
        description: "Assigned Physician ID",
        example: "usr_doc_10",
      },
      scheduledAt: {
        type: "string",
        format: "date-time",
        description: "Date and time scheduled for the appointment",
        example: "2025-11-02T09:30:00Z",
      },
      status: {
        $ref: "#/components/schemas/AppointmentStatus",
      },
      notes: {
        type: "string",
        description: "Additional notes or reason for the appointment",
        example: "General review",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Date the record was created",
        example: "2025-10-26T14:35:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Last update date",
        example: "2025-10-27T10:15:00Z",
      },
      createdBy: {
        type: "string",
        description: "ID of the user who created the appointment",
        example: "usr_admin",
      },
      updatedBy: {
        type: "string",
        description: "ID of the user who last updated the appointment",
        example: "usr_jefeDepto",
      },
    },
  },
};
