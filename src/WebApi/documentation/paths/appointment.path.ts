export const AppointmentPaths = {
  "/appointments": {
    get: {
      summary: "Get all appointments",
      tags: ["Appointments"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of appointments",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Appointment" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new appointment",
      tags: ["Appointments"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AppointmentRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: {
          description: "Appointment created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Appointment" },
            },
          },
        },
      },
    },
  },

  "/appointments/area": {
    get: {
      summary: "Get appointments by Area ID",
      tags: ["Appointments"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of appointments by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Appointment" },
              },
            },
          },
        },
        404: { description: "No appointments found for the given area" },
      },
    },
  },

  "/appointments/{id}": {
    get: {
      summary: "Get appointment by ID",
      tags: ["Appointments"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Appointment found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Appointment" },
            },
          },
        },
        404: { description: "Appointment not found" },
      },
    },
    put: {
      summary: "Update appointment by ID",
      tags: ["Appointments"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AppointmentRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Appointment updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Appointment" },
            },
          },
        },
        404: { description: "Appointment not found" },
      },
    },
    delete: {
      summary: "Delete appointment by ID",
      tags: ["Appointments"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Appointment deleted successfully" },
        404: { description: "Appointment not found" },
      },
    },
  },
};
