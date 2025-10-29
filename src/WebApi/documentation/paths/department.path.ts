export const DepartmentPaths = {
  "/departments": {
    get: {
      summary: "Get all departments",
      tags: ["Departments"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of departments",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Department" },
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create a new department",
      tags: ["Departments"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/DepartmentRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Department created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Department" },
            },
          },
        },
      },
    },
  },

  "/departments/{id}": {
    get: {
      summary: "Get department by ID",
      tags: ["Departments"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Department found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Department" },
            },
          },
        },
        404: { description: "Department not found" },
      },
    },

    put: {
      summary: "Update department by ID",
      tags: ["Departments"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/DepartmentRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Department updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Department" },
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete department by ID",
      tags: ["Departments"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Department deleted successfully" },
        404: { description: "Department not found" },
      },
    },
  },
};
