export const ExpenseSchemas = {
  OperatingCosts: {
    type: "string",
    description: "Operating Expense Category",
    enum: ["inventory", "salary", "maintenance", "other"],
    example: "inventory",
  },

  ExpenseRequest: {
    type: "object",
    required: ["departmentId", "description", "category", "amount"],
    properties: {
      departmentId: {
        type: "string",
        description: "ID of the department responsible for the expenditure",
        example: "dep_001",
      },
      description: {
        type: "string",
        description: "Detailed description of the expense",
        example: "Purchase of surgical gloves",
      },
      category: {
        $ref: "#/components/schemas/OperatingCosts",
      },
      amount: {
        type: "number",
        description: "Amount of expense",
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
        description: "Unique expenditure identifier",
        example: "exp_001",
      },
      departmentId: {
        type: "string",
        description: "Responsible department ID",
        example: "dep_001",
      },
      description: {
        type: "string",
        description: "Detailed description of the expense",
        example: "Purchase of surgical gloves",
      },
      category: {
        $ref: "#/components/schemas/OperatingCosts",
      },
      amount: {
        type: "number",
        description: "Amount of expense",
        example: 250.0,
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Expense recording date",
        example: "2025-10-28T10:30:00Z",
      },
    },
  },
};
