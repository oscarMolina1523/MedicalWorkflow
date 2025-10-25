import { UserPaths } from "./paths/user.path";
import { UserSchemas } from "./schemas/user.schema";

export const OpenApiSpecification = {
  openapi: "3.0.0",
  info: {
    title: "Hospital Manager API",
    version: "1.0.0",
    description: "API to manage the workflow of an entire hospital with at least 10 departments, a board of directors, and a CEO, in roles, access, and permissions.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  paths: {
    ...UserPaths,
  },
  components: {
    schemas: {
      ...UserSchemas,
    },
  },
};
