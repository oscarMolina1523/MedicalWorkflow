import express from "express";
import { container } from "tsyringe";
import MedicalServiceController from "../controllers/medicalService.controller";

const router = express.Router();
const medicalServiceController = container.resolve(MedicalServiceController);

router.get("/", medicalServiceController.getMedicalServices);

router.get("/area", medicalServiceController.getMedicalServiceByAreaId);

router.get("/:id", medicalServiceController.getMedicalServiceById);

router.post("/", medicalServiceController.addMedicalService);

router.put("/:id", medicalServiceController.updateMedicalService);

router.delete("/:id", medicalServiceController.deleteMedicalService);

export default router;