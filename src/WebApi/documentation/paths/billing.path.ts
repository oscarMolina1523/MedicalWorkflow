export const BillingPaths = {
  "/billings": {
    get: {
      summary: "Get all billings",
      tags: ["Billings"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of billings",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Billing" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new billing",
      tags: ["Billings"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/BillingRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: { description: "Billing created successfully" },
      },
    },
  },

  "/billings/area": {
    get: {
      summary: "Get billings by Area ID",
      tags: ["Billings"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of billings by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Billing" },
              },
            },
          },
        },
        404: { description: "No billings found for the given area" },
      },
    },
  },

  "/billings/{id}": {
    get: {
      summary: "Get billing by ID",
      tags: ["Billings"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Billing found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Billing" },
            },
          },
        },
        404: { description: "Billing not found" },
      },
    },
    put: {
      summary: "Update billing by ID",
      tags: ["Billings"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/BillingRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Billing updated successfully" },
        404: { description: "Billing not found" },
      },
    },
    delete: {
      summary: "Delete billing by ID",
      tags: ["Billings"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Billing deleted successfully" },
        404: { description: "Billing not found" },
      },
    },
  },
};
