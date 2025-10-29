export const ExpensePaths = {
  "/expenses": {
    get: {
      summary: "Get all expenses",
      tags: ["Expenses"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of expenses",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Expense" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new expense",
      tags: ["Expenses"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ExpenseRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: { description: "Expense created successfully" },
      },
    },
  },

  "/expenses/area": {
    get: {
      summary: "Get expenses by Area ID",
      tags: ["Expenses"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of expenses by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Expense" },
              },
            },
          },
        },
        404: { description: "No expenses found for the given area" },
      },
    },
  },

  "/expenses/{id}": {
    get: {
      summary: "Get expense by ID",
      tags: ["Expenses"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Expense found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Expense" },
            },
          },
        },
        404: { description: "Expense not found" },
      },
    },
    put: {
      summary: "Update expense by ID",
      tags: ["Expenses"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ExpenseRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Expense updated successfully" },
        404: { description: "Expense not found" },
      },
    },
    delete: {
      summary: "Delete expense by ID",
      tags: ["Expenses"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Expense deleted successfully" },
        404: { description: "Expense not found" },
      },
    },
  },
};
