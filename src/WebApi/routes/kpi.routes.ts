import express from "express";
import { container } from "tsyringe";
import KpiController from "../controllers/kpi.controller";

const router = express.Router();
const kpiController = container.resolve(KpiController);

router.get("/", kpiController.getKpis);

export default router;