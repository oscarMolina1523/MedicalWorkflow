export const MedicationSchemas = {
  MedicationRequest: {
    type: "object",
    required: ["name", "description", "unit"],
    properties: {
      name: {
        type: "string",
        example: "Paracetamol",
        description: "Nombre del medicamento.",
      },
      description: {
        type: "string",
        example: "Analgésico y antipirético para aliviar el dolor y la fiebre.",
        description: "Descripción breve del medicamento y su uso.",
      },
      expirationDate: {
        type: "string",
        format: "date-time",
        example: "2026-05-15T00:00:00.000Z",
        description: "Fecha de vencimiento del medicamento (opcional).",
      },
      unit: {
        type: "string",
        example: "tableta",
        description: "Unidad de medida del medicamento (por ejemplo: 'tableta', 'ml', 'cápsula').",
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
        description: "Identificador único del medicamento.",
      },
      name: {
        type: "string",
        example: "Paracetamol",
        description: "Nombre del medicamento.",
      },
      description: {
        type: "string",
        example: "Analgésico y antipirético para aliviar el dolor y la fiebre.",
        description: "Descripción breve del medicamento y su uso.",
      },
      expirationDate: {
        type: "string",
        format: "date-time",
        example: "2026-05-15T00:00:00.000Z",
        description: "Fecha de vencimiento del medicamento.",
      },
      unit: {
        type: "string",
        example: "tableta",
        description: "Unidad de medida del medicamento.",
      },
      active: {
        type: "boolean",
        example: true,
        description: "Indica si el medicamento está activo o disponible en inventario.",
      },
    },
  },
};
