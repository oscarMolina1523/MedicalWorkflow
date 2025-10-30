export const KpiSchemas = {

  KpiName: {
    type: "string",
    description: "Tipo de KPI (indicador de rendimiento)",
    enum: [
      "DAILY_PROFIT",
      "WEEKLY_PROFIT",
      "MONTHLY_PROFIT",
      "YEARLY_PROFIT",
      "PATIENT_GROWTH",
      "REVENUE",
      "CRITICAL_STOCK",
    ],
    example: "DAILY_PROFIT",
  },

  Kpi: {
    type: "object",
    required: [
      "id",
      "name",
      "value",
      "metricDate",
      "createdAt",
      "createdBy",
    ],
    properties: {
      id: {
        type: "string",
        description: "Unique KPI identifier.",
        example: "kpi_001",
      },
      departmentId: {
        type: "string",
        nullable: true,
        description: "Department ID associated with the KPI.",
        example: "dep_001",
      },
      name: {
        $ref: "#/components/schemas/KpiName",
      },
      value: {
        type: "number",
        description: "KPI value.",
        example: 12500.75,
      },
      metricDate: {
        type: "string",
        format: "date-time",
        description: "date of the period that the KPI represents.",
        example: "2025-10-29T00:00:00Z",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Date the record was created.",
        example: "2025-10-29T01:23:45Z",
      },
      createdBy: {
        type: "string",
        description: "User or system that created the record.",
        example: "system",
      },
    },
  },
};
