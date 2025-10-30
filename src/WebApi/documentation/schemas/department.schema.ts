export const DepartmentSchemas = {
  DepartmentRequest: {
    type: "object",
    required: ["name", "description", "headId"],
    properties: {
      name: {
        type: "string",
        example: "Surgery",
        description: "Name of the medical department (for example: Surgery, Pediatrics, Cardiology).",
      },
      description: {
        type: "string",
        example: "Department in charge of performing surgical procedures.",
        description: "Description of the department's purpose and functions.",
      },
      headId: {
        type: "string",
        example: "usr-12345",
        description: "Department head identifier.",
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
        description: "Unique department identifier.",
      },
      name: {
        type: "string",
        example: "Pediatrics",
        description: "Name of the medical department.",
      },
      description: {
        type: "string",
        example: "Department specializing in the medical care of children and adolescents.",
        description: "Detailed description of the department.",
      },
      headId: {
        type: "string",
        example: "usr-67890",
        description: "Identifier of the head or person in charge of the department.",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:32:00.000Z",
        description: "Date of creation of the department record.",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:35:00.000Z",
        description: "Date of the last record update.",
      },
    },
  },
};
