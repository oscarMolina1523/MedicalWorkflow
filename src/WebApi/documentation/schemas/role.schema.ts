export const RoleSchemas = {
  RoleRequest: {
    type: "object",
    required: ["name", "description", "hierarchyLevel"],
    properties: {
      name: {
        type: "string",
        example: "Doctor",
        description: "Role Name (CEO, Board, Department Head, Doctor, Nurse, Assistant, Admin)",
      },
      description: {
        type: "string",
        example: "Responsible for attending to patients.",
        description: "Description of the role or position in the organization",
      },
      hierarchyLevel: {
        type: "number",
        example: 4,
        description: "Hierarchical level of the role (1 = highest hierarchy, 7 = lowest)",
      },
    },
  },

  Role: {
    type: "object",
    required: ["id", "name", "description", "hierarchyLevel", "createdAt", "updatedAt"],
    properties: {
      id: {
        type: "string",
        example: "a1b2c3d4e5",
        description: "Unique role identifier",
      },
      name: {
        type: "string",
        example: "Doctor",
        description: "Role Name (CEO, Board, Department Head, Doctor, Nurse, Assistant, Admin)",
      },
      description: {
        type: "string",
        example: "Responsible for attending to patients.",
        description: "Description of the role or position in the organization",
      },
      hierarchyLevel: {
        type: "number",
        example: 4,
        description: "Hierarchical level of the role (1 = highest hierarchy, 7 = lowest)",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:32:00.000Z",
        description: "Date the record was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-26T14:35:00.000Z",
        description: "Date of last record update",
      },
    },
  },
};


