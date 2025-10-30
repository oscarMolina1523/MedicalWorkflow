export const KpiPaths = {
  "/kpis": {
    get: {
      summary: "Get all KPI records",
      tags: ["KPIs"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of KPI metrics",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Kpi" },
              },
            },
          },
        },
      },
    },
  },
};
