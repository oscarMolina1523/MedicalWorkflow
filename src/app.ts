import "reflect-metadata";
import cors from "cors";
import "./WebApi/dependencyContainer";
import express from "express";
import userRoutes from "./WebApi/routes/user.routes";
import authRoutes from "./WebApi/routes/auth.routes";
import roleRoutes from "./WebApi/routes/role.routes";
import departmentRoutes from "./WebApi/routes/department.routes";
import patientRoutes from "./WebApi/routes/patient.routes";
import appointmentRoutes from "./WebApi/routes/appointment.routes";
import inventoryRoutes from "./WebApi/routes/inventory.routes";
import auditLogRoutes from "./WebApi/routes/auditLog.routes";
import medicalServiceRoutes from "./WebApi/routes/medicalService.routes";
import billingRoutes from "./WebApi/routes/billing.routes";
import expenseRoutes from "./WebApi/routes/expense.routes";
import { initializeDatabase } from "./Infrastructure.Endpoint/database/turso_db";
import { OpenApiSpecification } from "./WebApi/documentation/openapi";
import { apiReference } from "@scalar/express-api-reference";
import { validateToken } from "./WebApi/middlewares/auth.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(
  "/api-docs",
  apiReference({
    spec: {
      content: OpenApiSpecification,
    },
  })
);

app.use("/auth", authRoutes);
app.use("/users", validateToken, userRoutes);
app.use("/roles", validateToken, roleRoutes);
app.use("/departments", validateToken, departmentRoutes);
app.use("/patients", validateToken, patientRoutes);
app.use("/appointments", validateToken, appointmentRoutes);
app.use("/inventories", validateToken, inventoryRoutes);
app.use("/logs", validateToken, auditLogRoutes);
app.use("/services", validateToken, medicalServiceRoutes);
app.use("/billings", validateToken, billingRoutes);
app.use("/expenses", validateToken, expenseRoutes);

async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
      console.log(
        `Documentación de Swagger en http://localhost:${PORT}/api-docs`
      );
    });
  } catch(error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
