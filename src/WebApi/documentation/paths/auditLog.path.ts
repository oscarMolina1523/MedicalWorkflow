export const AuditLogPaths = {
  "/logs": {
    get: {
      tags: ["AuditLogs"],
      summary: "Obtain all audit logs",
      description:
        "Returns a complete list of system audit logs, including actions performed by users and corresponding dates.",
      responses: {
        200: {
          description: "List of audit records obtained successfully",
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
          description: "Internal server error retrieving logs",
        },
      },
    },
  },
};
