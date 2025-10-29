export const MedicalServiceSchemas = {
  MedicalServiceRequest: {
    type: "object",
    required: ["name", "departmentId", "baseCost", "active"],
    properties: {
      name: {
        type: "string",
        description: "Nombre del servicio médico (ej. 'Consulta general', 'Ecografía')",
        example: "Consulta general",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento responsable del servicio",
        example: "dep_001",
      },
      baseCost: {
        type: "number",
        description: "Costo base del servicio médico",
        example: 50.0,
      },
      active: {
        type: "boolean",
        description: "Indica si el servicio está activo o suspendido",
        example: true,
      },
    },
  },

  MedicalService: {
    type: "object",
    required: ["id", "name", "departmentId", "baseCost", "active"],
    properties: {
      id: {
        type: "string",
        description: "Identificador único del servicio médico",
        example: "svc_001",
      },
      name: {
        type: "string",
        description: "Nombre del servicio médico",
        example: "Consulta general",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento responsable del servicio",
        example: "dep_001",
      },
      baseCost: {
        type: "number",
        description: "Costo base del servicio médico en dólares",
        example: 50.0,
      },
      active: {
        type: "boolean",
        description: "Estado del servicio (activo o inactivo)",
        example: true,
      },
    },
  },
};
