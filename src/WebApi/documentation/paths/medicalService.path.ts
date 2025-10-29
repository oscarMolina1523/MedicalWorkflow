export const MedicalServicePaths = {
  "/services": {
    get: {
      summary: "Get all medical services",
      tags: ["MedicalServices"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of medical services",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/MedicalService" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new medical service",
      tags: ["MedicalServices"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicalServiceRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: { description: "Medical service created successfully" },
      },
    },
  },

  "/services/area": {
    get: {
      summary: "Get medical services by Area ID",
      tags: ["MedicalServices"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of medical services by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/MedicalService" },
              },
            },
          },
        },
        404: { description: "No medical services found for the given area" },
      },
    },
  },

  "/services/{id}": {
    get: {
      summary: "Get medical service by ID",
      tags: ["MedicalServices"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Medical service found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/MedicalService" },
            },
          },
        },
        404: { description: "Medical service not found" },
      },
    },
    put: {
      summary: "Update medical service by ID",
      tags: ["MedicalServices"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MedicalServiceRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Medical service updated successfully" },
        404: { description: "Medical service not found" },
      },
    },
    delete: {
      summary: "Delete medical service by ID",
      tags: ["MedicalServices"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Medical service deleted successfully" },
        404: { description: "Medical service not found" },
      },
    },
  },
};
