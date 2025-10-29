import express from "express";
import { container } from "tsyringe";
import AuditLogController from "../controllers/auditLog.controller";

const router = express.Router();
const auditLogController = container.resolve(AuditLogController);

router.get("/", auditLogController.getAuditLogs);

export default router;