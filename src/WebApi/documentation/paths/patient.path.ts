export const PatientPaths = {
  "/patients": {
    get: {
      summary: "Get all patients",
      tags: ["Patients"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of patients",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Patient" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new patient",
      tags: ["Patients"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/PatientRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: { description: "Patient created successfully" },
      },
    },
  },

  "/patients/area": {
    get: {
      summary: "Get patients by Area ID",
      tags: ["Patients"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of patients by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Patient" },
              },
            },
          },
        },
        404: { description: "No patients found for the given area" },
      },
    },
  },

  "/patients/{id}": {
    get: {
      summary: "Get patient by ID",
      tags: ["Patients"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Patient found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Patient" },
            },
          },
        },
        404: { description: "Patient not found" },
      },
    },
    put: {
      summary: "Update patient by ID",
      tags: ["Patients"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/PatientRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Patient updated successfully" },
        404: { description: "Patient not found" },
      },
    },
    delete: {
      summary: "Delete patient by ID",
      tags: ["Patients"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Patient deleted successfully" },
        404: { description: "Patient not found" },
      },
    },
  },
};
