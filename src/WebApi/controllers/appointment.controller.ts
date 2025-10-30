import { inject, injectable } from "tsyringe";
import { IAppointmentService } from "../../Aplication.Endpoint/interfaces/appointmentService.interface";
import { Request, Response } from "express";
import { AppointmentRequest } from "../../Aplication.Endpoint/dtos/request/appointment.request";

@injectable()
export default class AppointmentController {
  private readonly service: IAppointmentService;

  constructor(@inject("IAppointmentService") service: IAppointmentService) {
    this.service = service;
  }

  getAppointments = async (req: Request, res: Response) => {
    try {
      const appointment = await this.service.getAppointments();
      res.status(200).json({ success: true, data: appointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get appointments" });
    }
  };

  getAppointmentById = async (req: Request, res: Response) => {
    const appointmentId: string | undefined = req.params.id;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required." });
    }

    try {
      const appointment = await this.service.getById(appointmentId);

      if (appointment) {
        res.status(200).json({ success: true, data: appointment });
      } else {
        res.status(404).json({ message: "Appointment not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get appointment" });
    }
  };

  getAppointmentByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const appointments = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get appointments by area" });
    }
  };

  addAppointment = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";
    const departmentDto: AppointmentRequest = req.body;

    if (
      !departmentDto.patientId ||
      !departmentDto.departmentId ||
      !departmentDto.doctorId ||
      !departmentDto.scheduledAt ||
      !departmentDto.status ||
      !departmentDto.notes
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addAppointment(departmentDto, token);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the Appointment" });
    }
  };

  updateAppointment = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: AppointmentRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateAppointment(
        id,
        updatedData,
        token
      );

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Appointment not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update appointment" });
    }
  };

  deleteAppointment = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const token = req.headers["authorization"] || "";
    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required." });
    }

    try {
      const result = await this.service.deleteAppointment(id, token);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Appointment deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Appointment not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete appointment" });
    }
  };
}
