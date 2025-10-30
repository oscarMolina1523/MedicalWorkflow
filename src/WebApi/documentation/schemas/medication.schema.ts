export const MedicationSchemas = {
  MedicationRequest: {
    type: "object",
    required: ["name", "description", "unit"],
    properties: {
      name: {
        type: "string",
        example: "Paracetamol",
        description: "Name of the medication.",
      },
      description: {
        type: "string",
        example: "Analgesic and antipyretic to relieve pain and fever.",
        description: "Brief description of the medication and its use.",
      },
      expirationDate: {
        type: "string",
        format: "date-time",
        example: "2026-05-15T00:00:00.000Z",
        description: "Expiration date of the medication (optional).",
      },
      unit: {
        type: "string",
        example: "tableta",
        description: "Unit of measurement for the medicine (for example: 'tablet', 'ml', 'capsule').",
      },
      active: {
        type: "boolean",
        example: true,
        description: "Indica si el medicamento está activo o disponible en inventario.",
      },
    },
  },

  Medication: {
    type: "object",
    required: ["id", "name", "description", "unit", "active"],
    properties: {
      id: {
        type: "string",
        example: "med-12345",
        description: "Unique drug identifier.",
      },
      name: {
        type: "string",
        example: "Paracetamol",
        description: "Name of the medication.",
      },
      description: {
        type: "string",
        example: "Analgesic and antipyretic to relieve pain and fever.",
        description: "Brief description of the medication and its use.",
      },
      expirationDate: {
        type: "string",
        format: "date-time",
        example: "2026-05-15T00:00:00.000Z",
        description: "Expiration date of the medication.",
      },
      unit: {
        type: "string",
        example: "tableta",
        description: "Unit of measurement for the medication.",
      },
      active: {
        type: "boolean",
        example: true,
        description: "Indicates whether the medication is active or available in stock.",
      },
    },
  },
};
