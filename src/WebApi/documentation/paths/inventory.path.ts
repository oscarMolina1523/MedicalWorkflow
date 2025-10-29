export const InventoryPaths = {
  "/inventories": {
    get: {
      summary: "Get all inventory items",
      tags: ["Inventories"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of all inventory items",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Inventory" },
              },
            },
          },
        },
      },
    },
    post: {
      summary: "Add a new inventory item",
      tags: ["Inventories"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/InventoryRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        201: {
          description: "Inventory item created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Inventory" },
            },
          },
        },
      },
    },
  },

  "/inventories/area": {
    get: {
      summary: "Get inventory items by Area ID",
      tags: ["Inventories"],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "List of inventory items by area",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/Inventory" },
              },
            },
          },
        },
        404: { description: "No inventory found for the given area" },
      },
    },
  },

  "/inventories/{id}": {
    get: {
      summary: "Get inventory item by ID",
      tags: ["Inventories"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Inventory item found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Inventory" },
            },
          },
        },
        404: { description: "Inventory item not found" },
      },
    },
    put: {
      summary: "Update inventory item by ID",
      tags: ["Inventories"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/InventoryRequest" },
          },
        },
      },
      security: [{ BearerAuth: [] }],
      responses: {
        200: {
          description: "Inventory item updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Inventory" },
            },
          },
        },
        404: { description: "Inventory item not found" },
      },
    },
    delete: {
      summary: "Delete inventory item by ID",
      tags: ["Inventories"],
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: "Inventory item deleted successfully" },
        404: { description: "Inventory item not found" },
      },
    },
  },
};
