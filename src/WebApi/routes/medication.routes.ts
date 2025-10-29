import express from "express";
import { container } from "tsyringe";
import MedicationController from "../controllers/medicationController";

const router = express.Router();
const medicationController = container.resolve(MedicationController);

router.get("/", medicationController.getMedications);

router.get("/:id", medicationController.getMedicationById);

router.post("/", medicationController.addMedication);

router.put("/:id", medicationController.updateMedication);

router.delete("/:id", medicationController.deleteMedication);

export default router;