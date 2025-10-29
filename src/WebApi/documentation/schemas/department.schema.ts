export const DepartmentSchemas = {
  DepartmentRequest: {
    type: "object",
    required: ["name", "description", "headId"],
    properties: {
      name: {
        type: "string",
        example: "Cirugía",
        description: "Nombre del departamento médico (por ejemplo: Cirugía, Pediatría, Cardiología).",
      },
      description: {
        type: "string",
        example: "Departamento encargado de realizar procedimientos quirúrgicos.",
        description: "Descripción del propósito y funciones del departamento.",
      },
      headId: {
        type: "string",
        example: "usr-12345",
        description: "Identificador del jefe del departamento.",
      },
    },
  },

  Department: {
    type: "object",
    required: ["id", "name", "description", "headId", "createdAt", "updatedAt"],
    properties: {
      id: {
        type: "string",
        example: "dept-001",
        description: "Identificador único del departamento.",
      },
      name: {
        type: "string",
        example: "Pediatría",
        description: "Nombre del departamento médico.",
      },
      description: {
        type: "string",
        example: "Departamento especializado en la atención médica de niños y adolescentes.",
        description: "Descripción detallada del departamento.",
      },
      headId: {
        type: "string",
        example: "usr-67890",
        description: "Identificador del jefe o responsable del departamento.",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:32:00.000Z",
        description: "Fecha de creación del registro del departamento.",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:35:00.000Z",
        description: "Fecha de la última actualización del registro.",
      },
    },
  },
};
