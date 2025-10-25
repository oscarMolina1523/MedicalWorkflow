import { UserSchemas } from "../schemas/user.schema";

export const AuthPaths = {
  "/auth/login": {
    post: {
      summary: "Authenticate user and obtain token",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", example: "usuario@correo.com" },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login exitoso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Login exitoso" },
                  user: UserSchemas.UserResponse,
                  token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Credenciales inválidas",
        },
        500: {
          description: "Error interno del servidor",
        },
      },
    },
  },
  "/auth/register": {
    post: {
      tags: ["Auth"],
      summary: "Register new user",
      description:
        "Creates a new user in the system and returns its public data.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UserSchemas.UserRequest,
          },
        },
      },
      responses: {
        201: {
          description: "Usuario registrado exitosamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Usuario registrado exitosamente",
                  },
                  user: UserSchemas.UserResponse,
                },
              },
            },
          },
        },
        400: {
          description: "Campos inválidos o usuario ya existente",
        },
        500: {
          description: "Error interno del servidor",
        },
      },
    },
  },

  "/auth/logout": {
    post: {
      tags: ["Auth"],
      summary: "Logout user",
      description:
        "Ends the user session.",
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Logout exitoso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Sesión cerrada correctamente",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
