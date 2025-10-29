export const AuditLogPaths = {
  "/logs": {
    get: {
      tags: ["AuditLogs"],
      summary: "Obtener todos los registros de auditoría",
      description:
        "Devuelve una lista completa de los registros de auditoría del sistema, incluyendo acciones realizadas por los usuarios y fechas correspondientes.",
      responses: {
        200: {
          description: "Lista de registros de auditoría obtenida correctamente",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/AuditLog",
                },
              },
            },
          },
        },
        500: {
          description: "Error interno del servidor al obtener los registros",
        },
      },
    },
  },
};
