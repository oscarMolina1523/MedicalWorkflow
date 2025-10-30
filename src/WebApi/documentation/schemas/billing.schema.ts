export const BillingSchemas = {
  BillingStatus: {
    type: "string",
    description: "Current status of the invoice",
    enum: ["pending", "paid", "canceled"],
    example: "pending",
  },

  Payment: {
    type: "string",
    description: "Payment method used",
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
        description: "Patient ID",
        example: "pat_001",
      },
      appointmentId: {
        type: "string",
        description: "Associated appointment ID (optional)",
        example: "app_001",
      },
      serviceId: {
        type: "string",
        description: "Billed medical service ID",
        example: "svc_001",
      },
      departmentId: {
        type: "string",
        description: "Department ID",
        example: "dep_001",
      },
      amount: {
        type: "number",
        description: "Total amount calculated",
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
        description: "Payment date (if applicable)",
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
        description: "Unique invoice identifier",
        example: "bill_001",
      },
      patientId: {
        type: "string",
        description: "Patient ID",
        example: "pat_001",
      },
      appointmentId: {
        type: "string",
        description: "Associated appointment ID (optional)",
        example: "app_001",
      },
      serviceId: {
        type: "string",
        description: "Medical Service ID",
        example: "svc_001",
      },
      departmentId: {
        type: "string",
        description: "Department ID",
        example: "dep_001",
      },
      amount: {
        type: "number",
        description: "Total invoice amount",
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
        description: "Date the record was created",
        example: "2025-10-28T14:00:00Z",
      },
      paidAt: {
        type: "string",
        format: "date-time",
        description: "Payment date (if applicable)",
        example: "2025-10-28T15:00:00Z",
      },
    },
  },
};
