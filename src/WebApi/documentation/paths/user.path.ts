export const UserPaths = {
  "/users": {
    get: {
      summary: "Get all users",
      tags: ["Users"],
      responses: {
        200: {
          description: "List of users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/UserResponse" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UserRequest" },
          },
        },
      },
      responses: {
        201: { description: "User created successfully" },
      },
    },
  },
  "/users/{id}": {
    get: {
      summary: "Get user by ID",
      tags: ["Users"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "User found" },
        404: { description: "User not found" },
      },
    },
    put: {
      summary: "Update user",
      tags: ["Users"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UserRequest" },
          },
        },
      },
      responses: {
        200: { description: "User updated" },
      },
    },
    delete: {
      summary: "Delete user",
      tags: ["Users"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "User deleted" },
      },
    },
  },
};
