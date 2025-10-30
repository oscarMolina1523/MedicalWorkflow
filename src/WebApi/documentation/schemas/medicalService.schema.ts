export const MedicalServiceSchemas = {
  MedicalServiceRequest: {
    type: "object",
    required: ["name", "departmentId", "baseCost", "active"],
    properties: {
      name: {
        type: "string",
        description: "Name of medical service (e.g., 'General consultation', 'Ultrasound')",
        example: "General inquiry",
      },
      departmentId: {
        type: "string",
        description: "ID of the department responsible for the service",
        example: "dep_001",
      },
      baseCost: {
        type: "number",
        description: "Base cost of medical service",
        example: 50.0,
      },
      active: {
        type: "boolean",
        description: "Indicates whether the service is active or suspended",
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
        description: "Unique identifier of the medical service",
        example: "svc_001",
      },
      name: {
        type: "string",
        description: "Name of medical service",
        example: "General consultation",
      },
      departmentId: {
        type: "string",
        description: "ID of the department responsible for the service",
        example: "dep_001",
      },
      baseCost: {
        type: "number",
        description: "Base cost of medical service in dollars",
        example: 50.0,
      },
      active: {
        type: "boolean",
        description: "Service status (active or inactive)",
        example: true,
      },
    },
  },
};
