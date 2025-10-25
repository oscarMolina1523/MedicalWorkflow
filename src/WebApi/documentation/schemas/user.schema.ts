export const UserSchemas = {
  UserRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      departmentId: { type: "string" },
      roleId: { type: "string" },
      active: { type: "boolean" },
    },
  },
  UserResponse: {
    type: "object",
    properties: {
      id: { type: "string" },
      username: { type: "string" },
      email: { type: "string" },
      roleId: { type: "string" },
      active: { type: "boolean" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      createdBy: { type: "string" },
      updatedBy: { type: "string" },
      departmentId: { type: "string" },
    },
  },
};
