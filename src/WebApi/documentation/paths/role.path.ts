import { RoleSchemas } from "../schemas/role.schema";

export const RolePaths = {
  "/roles": {
    get: {
      summary: "Get all roles",
      description: "Returns the complete list of roles registered in the system.",
      tags: ["Roles"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of roles obtained successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: RoleSchemas.Role,
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Internal Server Error",
        },
      },
    },

    post: {
      summary: "Create a new role",
      description: "Add a new role with a name, description, and hierarchical level.",
      tags: ["Roles"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: RoleSchemas.RoleRequest,
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: {
          description: "Successfully created role",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Successfully created role" },
                  status: RoleSchemas.Role,
                },
              },
            },
          },
        },
        400: {
          description: "Invalid data or missing fields",
        },
      },
    },
  },

  "/roles/{id}": {
    get: {
      summary: "Get a role by ID",
      description: "Returns detailed information about a role based on its identifier.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Unique role identifier",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Found role",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  data: RoleSchemas.Role,
                },
              },
            },
          },
        },
        404: {
          description: "Rol not found",
        },
        500: {
          description: "Error obtaining the role",
        },
      },
    },

    put: {
      summary: "Update an existing role",
      description: "Allows you to update the name, description, or hierarchical level of a role.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Identifier of the role to be updated",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: RoleSchemas.RoleRequest,
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Role updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Role updated successfully" },
                  data: RoleSchemas.Role,
                },
              },
            },
          },
        },
        400: {
          description: "Missing or invalid fields",
        },
        404: {
          description: "Rol not found",
        },
      },
    },

    delete: {
      summary: "Delete a role",
      description: "Remove a system role using its identifier.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Identifier of the role to be deleted",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Successfully deleted role",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Role deleted successfully" },
                },
              },
            },
          },
        },
        404: {
          description: "Rol not found",
        },
        400: {
          description: "Error deleting the role",
        },
      },
    },
  },
};
