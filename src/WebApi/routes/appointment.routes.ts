import express from "express";
import { container } from "tsyringe";
import AppointmentController from "../controllers/appointment.controller";

const router = express.Router();
const appointmentController = container.resolve(AppointmentController);

router.get("/", appointmentController.getAppointments);

router.get("/area", appointmentController.getAppointmentByAreaId);

router.get("/:id", appointmentController.getAppointmentById);

router.post("/", appointmentController.addAppointment);

router.put("/:id", appointmentController.updateAppointment);

router.delete("/:id", appointmentController.deleteAppointment);

export default router;