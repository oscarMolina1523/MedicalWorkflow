export const BillingSchemas = {
  BillingStatus: {
    type: "string",
    description: "Estado actual de la factura",
    enum: ["pending", "paid", "canceled"],
    example: "pending",
  },

  Payment: {
    type: "string",
    description: "Método de pago utilizado",
    enum: ["cash", "card"],
    example: "cash",
  },

  BillingRequest: {
    type: "object",
    required: [
      "patientId",
      "serviceId",
      "departmentId",
      "amount",
      "status",
      "paymentMethod",
      "appointmentId",
    ],
    properties: {
      patientId: {
        type: "string",
        description: "ID del paciente",
        example: "pat_001",
      },
      appointmentId: {
        type: "string",
        description: "ID de la cita asociada (opcional)",
        example: "app_001",
      },
      serviceId: {
        type: "string",
        description: "ID del servicio médico facturado",
        example: "svc_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento",
        example: "dep_001",
      },
      amount: {
        type: "number",
        description: "Monto total calculado",
        example: 100.0,
      },
      status: {
        $ref: "#/components/schemas/BillingStatus",
      },
      paymentMethod: {
        $ref: "#/components/schemas/Payment",
      },
      paidAt: {
        type: "string",
        format: "date-time",
        description: "Fecha de pago (si aplica)",
        example: "2025-10-28T15:00:00Z",
      },
    },
  },

  Billing: {
    type: "object",
    required: [
      "id",
      "patientId",
      "serviceId",
      "departmentId",
      "amount",
      "status",
      "paymentMethod",
      "createdAt",
    ],
    properties: {
      id: {
        type: "string",
        description: "Identificador único de la factura",
        example: "bill_001",
      },
      patientId: {
        type: "string",
        description: "ID del paciente",
        example: "pat_001",
      },
      appointmentId: {
        type: "string",
        description: "ID de la cita asociada (opcional)",
        example: "app_001",
      },
      serviceId: {
        type: "string",
        description: "ID del servicio médico",
        example: "svc_001",
      },
      departmentId: {
        type: "string",
        description: "ID del departamento",
        example: "dep_001",
      },
      amount: {
        type: "number",
        description: "Monto total de la factura",
        example: 100.0,
      },
      status: {
        $ref: "#/components/schemas/BillingStatus",
      },
      paymentMethod: {
        $ref: "#/components/schemas/Payment",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Fecha de creación del registro",
        example: "2025-10-28T14:00:00Z",
      },
      paidAt: {
        type: "string",
        format: "date-time",
        description: "Fecha de pago (si aplica)",
        example: "2025-10-28T15:00:00Z",
      },
    },
  },
};
