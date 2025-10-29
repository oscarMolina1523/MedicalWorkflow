import { inject, injectable } from "tsyringe";
import { IMedicationService } from "../../Aplication.Endpoint/interfaces/medicationService.interface";
import { Request, Response } from "express";
import { MedicationRequest } from "../../Aplication.Endpoint/dtos/request/medication.request";

@injectable()
export default class MedicationController {
  private readonly service: IMedicationService;

  constructor(@inject("IMedicationService") service: IMedicationService) {
    this.service = service;
  }

  getMedications = async (req: Request, res: Response) => {
    try {
      const medications = await this.service.getMedications();
      res.status(200).json({ success: true, data: medications });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get medications" });
    }
  };

  getMedicationById = async (req: Request, res: Response) => {
    const medicationId: string | undefined = req.params.id;

    if (!medicationId) {
      return res.status(400).json({ message: "Medication ID is required." });
    }

    try {
      const medication = await this.service.getById(medicationId);

      if (medication) {
        res.status(200).json({ success: true, data: medication });
      } else {
        res.status(404).json({ message: "medication not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get medication" });
    }
  };

  addMedication = async (req: Request, res: Response) => {
    const medicationDto: MedicationRequest = req.body;

    if (
      !medicationDto.name ||
      !medicationDto.description ||
      !medicationDto.unit
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addMedication(medicationDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the medication" });
    }
  };

  updateMedication = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: MedicationRequest = req.body;

    if (!id) {
      return res.status(400).json({ message: "Medication ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateMedication(id, updatedData);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Medication not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update medication" });
    }
  };

  deleteMedication = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Medication ID is required." });
    }

    try {
      const result = await this.service.deleteMedication(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Medication deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Medication not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete medication" });
    }
  };
}
