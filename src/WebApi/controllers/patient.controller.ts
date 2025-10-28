import { inject, injectable } from "tsyringe";
import { IPatientService } from "../../Aplication.Endpoint/interfaces/patientService.interface";
import { Request, Response } from "express";
import { PatientRequest } from "../../Aplication.Endpoint/dtos/request/patient.request";

@injectable()
export default class PatientController {
  private readonly service: IPatientService;

  constructor(@inject("IPatientService") service: IPatientService) {
    this.service = service;
  }

  getPatients = async (req: Request, res: Response) => {
    try {
      const patients = await this.service.getPatients();
      res.status(200).json({ success: true, data: patients });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get patients" });
    }
  };

  getPatientById = async (req: Request, res: Response) => {
    const patientId: string | undefined = req.params.id;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    try {
      const user = await this.service.getById(patientId);

      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ message: "patient not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get patient" });
    }
  };

  getPatientByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const patients = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: patients });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get patients by area" });
    }
  };

  addPatient = async (req: Request, res: Response) => {
    const patientDto: PatientRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (
      !patientDto.firstName ||
      !patientDto.lastName ||
      !patientDto.birthDate ||
      !patientDto.gender ||
      !patientDto.departmentId ||
      !patientDto.medicalHistory
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addPatient(patientDto, token);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the patient" });
    }
  };

  updatePatient = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: PatientRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updatePatient(id, updatedData, token);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update patient" });
    }
  };

  deletePatient = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    try {
      const result = await this.service.deletePatient(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Patient deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Patient not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete patient" });
    }
  };
}
