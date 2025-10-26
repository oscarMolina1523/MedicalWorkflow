export const RoleSchemas = {
  RoleRequest: {
    type: "object",
    required: ["name", "description", "hierarchyLevel"],
    properties: {
      name: {
        type: "string",
        example: "Medico",
        description: "Nombre del rol (CEO, Junta, JefeDepto, Medico, Enfermero, Auxiliar, Admin)",
      },
      description: {
        type: "string",
        example: "Encargado de atender a los pacientes.",
        description: "Descripción del rol o puesto en la organización",
      },
      hierarchyLevel: {
        type: "number",
        example: 4,
        description: "Nivel jerárquico del rol (1 = mayor jerarquía, 7 = menor)",
      },
    },
  },

  RoleResponse: {
    type: "object",
    required: ["id", "name", "description", "hierarchyLevel", "createdAt", "updatedAt"],
    properties: {
      id: {
        type: "string",
        example: "a1b2c3d4e5",
        description: "Identificador único del rol",
      },
      name: {
        type: "string",
        example: "Medico",
        description: "Nombre del rol (CEO, Junta, JefeDepto, Medico, Enfermero, Auxiliar, Admin)",
      },
      description: {
        type: "string",
        example: "Encargado de atender a los pacientes.",
        description: "Descripción del rol o puesto en la organización",
      },
      hierarchyLevel: {
        type: "number",
        example: 4,
        description: "Nivel jerárquico del rol (1 = mayor jerarquía, 7 = menor)",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:32:00.000Z",
        description: "Fecha de creación del registro",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:35:00.000Z",
        description: "Fecha de última actualización del registro",
      },
    },
  },
};


