export const InventorySchemas = {
  InventoryRequest: {
    type: "object",
    required: ["departmentId", "medicationId", "quantity"],
    properties: {
      departmentId: {
        type: "string",
        description: "ID of the department that has the medication",
        example: "dep_001",
      },
      medicationId: {
        type: "string",
        description: "Drug ID in inventory",
        example: "med_045",
      },
      quantity: {
        type: "number",
        description: "Current quantity available in inventory",
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
        description: "Unique inventory record identifier",
        example: "inv_001",
      },
      departmentId: {
        type: "string",
        description: "ID of the department that manages the medication",
        example: "dep_001",
      },
      medicationId: {
        type: "string",
        description: "Associated drug ID",
        example: "med_045",
      },
      quantity: {
        type: "number",
        description: "Quantity currently available in inventory",
        example: 120,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Date the record was created",
        example: "2025-10-26T15:30:00Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Last date of record update",
        example: "2025-10-27T09:45:00Z",
      },
      createdBy: {
        type: "string",
        description: "User ID of the person who created the record",
        example: "usr_admin",
      },
      updatedBy: {
        type: "string",
        description: "User ID of the person who last updated the record",
        example: "usr_jefeDepto",
      },
    },
  },
};
