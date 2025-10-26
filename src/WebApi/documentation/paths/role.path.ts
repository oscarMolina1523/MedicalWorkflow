import { RoleSchemas } from "../schemas/role.schema";

export const RolePaths = {
  "/roles": {
    get: {
      summary: "Obtener todos los roles",
      description: "Devuelve la lista completa de roles registrados en el sistema.",
      tags: ["Roles"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Lista de roles obtenida correctamente",
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
          description: "Error interno del servidor",
        },
      },
    },

    post: {
      summary: "Crear un nuevo rol",
      description: "Agrega un nuevo rol con nombre, descripción y nivel jerárquico.",
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
          description: "Rol creado correctamente",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: { type: "string", example: "Role created successfully" },
                  status: RoleSchemas.Role,
                },
              },
            },
          },
        },
        400: {
          description: "Datos inválidos o campos faltantes",
        },
      },
    },
  },

  "/roles/{id}": {
    get: {
      summary: "Obtener un rol por ID",
      description: "Devuelve la información detallada de un rol según su identificador.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Identificador único del rol",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Rol encontrado",
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
          description: "Rol no encontrado",
        },
        500: {
          description: "Error al obtener el rol",
        },
      },
    },

    put: {
      summary: "Actualizar un rol existente",
      description: "Permite actualizar el nombre, descripción o nivel jerárquico de un rol.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Identificador del rol a actualizar",
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
          description: "Rol actualizado correctamente",
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
          description: "Campos faltantes o inválidos",
        },
        404: {
          description: "Rol no encontrado",
        },
      },
    },

    delete: {
      summary: "Eliminar un rol",
      description: "Elimina un rol del sistema mediante su identificador.",
      tags: ["Roles"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Identificador del rol a eliminar",
        },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Rol eliminado correctamente",
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
          description: "Rol no encontrado",
        },
        400: {
          description: "Error al eliminar el rol",
        },
      },
    },
  },
};
