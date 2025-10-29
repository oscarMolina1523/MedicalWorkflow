export const MedicationPaths = {
  "/medications": {
    get: {
      summary: "Get all medications",
      tags: ["Medications"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of medications",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Medication" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new medication",
      tags: ["Medications"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicationRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Medication created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Medication" },
            },
          },
        },
      },
    },
  },

  "/medications/{id}": {
    get: {
      summary: "Get medication by ID",
      tags: ["Medications"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Medication found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Medication" },
            },
          },
        },
        404: { description: "Medication not found" },
      },
    },

    put: {
      summary: "Update medication by ID",
      tags: ["Medications"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicationRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Medication updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Medication" },
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete medication by ID",
      tags: ["Medications"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Medication deleted successfully" },
        404: { description: "Medication not found" },
      },
    },
  },
};
