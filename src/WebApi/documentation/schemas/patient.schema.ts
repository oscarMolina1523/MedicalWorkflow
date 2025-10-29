export const PatientSchemas = {
  PatientRequest: {
    type: "object",
    required: [
      "firstName",
      "lastName",
      "birthDate",
      "gender",
      "departmentId",
      "medicalHistory",
    ],
    properties: {
      firstName: {
        type: "string",
        description: "Nombre del paciente",
        example: "Juan",
      },
      lastName: {
        type: "string",
        description: "Apellido del paciente",
        example: "Pérez",
      },
      birthDate: {
        type: "string",
        format: "date",
        description: "Fecha de nacimiento del paciente (YYYY-MM-DD)",
        example: "1990-05-12",
      },
      gender: {
        type: "string",
        description: "Género del paciente",
        enum: ["Masculino", "Femenino", "Otro"],
        example: "Masculino",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento donde está asignado el paciente",
        example: "dep_12345",
      },
      medicalHistory: {
        type: "string",
        description:
          "Historial médico (JSON o texto estructurado con diagnósticos y tratamientos)",
        example: "{\"diagnosis\":\"Gripe\",\"treatments\":[\"Paracetamol\"]}",
      },
    },
  },

  Patient: {
    type: "object",
    required: [
      "id",
      "firstName",
      "lastName",
      "birthDate",
      "gender",
      "departmentId",
      "medicalHistory",
      "createdAt",
      "updatedAt",
      "createdBy",
      "updatedBy",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único del paciente",
        example: "pat_001",
      },
      firstName: {
        type: "string",
        description: "Nombre del paciente",
        example: "Juan",
      },
      lastName: {
        type: "string",
        description: "Apellido del paciente",
        example: "Pérez",
      },
      birthDate: {
        type: "string",
        format: "date",
        description: "Fecha de nacimiento del paciente (YYYY-MM-DD)",
        example: "1990-05-12",
      },
      gender: {
        type: "string",
        description: "Género del paciente",
        enum: ["Masculino", "Femenino", "Otro"],
        example: "Masculino",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento asignado",
        example: "dep_12345",
      },
      medicalHistory: {
        type: "string",
        description:
          "Historial médico (JSON o texto estructurado con diagnósticos y tratamientos)",
        example: "{\"diagnosis\":\"Asma\",\"treatments\":[\"Inhalador\"]}",
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
        description: "ID del usuario que creó el registro",
        example: "usr_admin",
      },
      updatedBy: {
        type: "string",
        description: "ID del usuario que realizó la última actualización",
        example: "usr_jefeDepto",
      },
    },
  },
};
