import express from "express";
import { container } from "tsyringe";
import PatientController from "../controllers/patient.controller";

const router = express.Router();
const patientController = container.resolve(PatientController);

router.get("/", patientController.getPatients);

router.get("/area", patientController.getPatientByAreaId);

router.get("/:id", patientController.getPatientById);

router.post("/", patientController.addPatient);

router.put("/:id", patientController.updatePatient);

router.delete("/:id", patientController.deletePatient);

export default router;