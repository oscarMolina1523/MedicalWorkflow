import "reflect-metadata";
import cors from "cors";
import "./WebApi/dependencyContainer";
import express from "express";
import userRoutes from "./WebApi/routes/user.routes";
import { initializeDatabase } from "./Infrastructure.Endpoint/database/turso_db";
import { OpenApiSpecification } from "./WebApi/documentation/openapi";
import { apiReference } from "@scalar/express-api-reference";

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

app.use("/users", userRoutes);


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
