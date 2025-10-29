export const ExpenseSchemas = {
  OperatingCosts: {
    type: "string",
    description: "Categoría del gasto operativo",
    enum: ["inventory", "salary", "maintenance", "other"],
    example: "inventory",
  },

  ExpenseRequest: {
    type: "object",
    required: ["departmentId", "description", "category", "amount"],
    properties: {
      departmentId: {
        type: "string",
        description: "ID del departamento responsable del gasto",
        example: "dep_001",
      },
      description: {
        type: "string",
        description: "Descripción detallada del gasto",
        example: "Compra de guantes quirúrgicos",
      },
      category: {
        $ref: "#/components/schemas/OperatingCosts",
      },
      amount: {
        type: "number",
        description: "Monto del gasto",
        example: 250.0,
      },
    },
  },

  Expense: {
    type: "object",
    required: [
      "id",
      "departmentId",
      "description",
      "category",
      "amount",
      "createdAt",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único del gasto",
        example: "exp_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento responsable",
        example: "dep_001",
      },
      description: {
        type: "string",
        description: "Descripción detallada del gasto",
        example: "Compra de guantes quirúrgicos",
      },
      category: {
        $ref: "#/components/schemas/OperatingCosts",
      },
      amount: {
        type: "number",
        description: "Monto del gasto",
        example: 250.0,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Fecha de registro del gasto",
        example: "2025-10-28T10:30:00Z",
      },
    },
  },
};
