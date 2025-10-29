export const InventorySchemas = {
  InventoryRequest: {
    type: "object",
    required: ["departmentId", "medicationId", "quantity"],
    properties: {
      departmentId: {
        type: "string",
        description: "ID del departamento que posee el medicamento",
        example: "dep_001",
      },
      medicationId: {
        type: "string",
        description: "ID del medicamento en el inventario",
        example: "med_045",
      },
      quantity: {
        type: "number",
        description: "Cantidad actual disponible en inventario",
        example: 120,
      },
    },
  },

  Inventory: {
    type: "object",
    required: [
      "id",
      "departmentId",
      "medicationId",
      "quantity",
      "createdAt",
      "updatedAt",
      "createdBy",
      "updatedBy",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único del registro de inventario",
        example: "inv_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento que gestiona el medicamento",
        example: "dep_001",
      },
      medicationId: {
        type: "string",
        description: "ID del medicamento asociado",
        example: "med_045",
      },
      quantity: {
        type: "number",
        description: "Cantidad disponible actualmente en inventario",
        example: 120,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Fecha en la que se creó el registro",
        example: "2025-10-26T15:30:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Última fecha de actualización del registro",
        example: "2025-10-27T09:45:00Z",
      },
      createdBy: {
        type: "string",
        description: "ID del usuario que creó el registro",
        example: "usr_admin",
      },
      updatedBy: {
        type: "string",
        description: "ID del usuario que actualizó el registro por última vez",
        example: "usr_jefeDepto",
      },
    },
  },
};
