import { inject, injectable } from "tsyringe";
import { IMedicalServiceService } from "../../Aplication.Endpoint/interfaces/medicalService.interface";
import { Request, Response } from "express";
import { MedicalServiceRequest } from "../../Aplication.Endpoint/dtos/request/medicalService.request";

@injectable()
export default class MedicalServiceController {
  private readonly service: IMedicalServiceService;

  constructor(
    @inject("IMedicalServiceService") service: IMedicalServiceService
  ) {
    this.service = service;
  }

  getMedicalServices = async (req: Request, res: Response) => {
    try {
      const medicalServices = await this.service.getMedicalServices();
      res.status(200).json({ success: true, data: medicalServices });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get medicalServices" });
    }
  };

  getMedicalServiceById = async (req: Request, res: Response) => {
    const medicalServiceId: string | undefined = req.params.id;

    if (!medicalServiceId) {
      return res
        .status(400)
        .json({ message: "Medical Service ID is required." });
    }

    try {
      const medicalService = await this.service.getById(medicalServiceId);

      if (medicalService) {
        res.status(200).json({ success: true, data: medicalService });
      } else {
        res.status(404).json({ message: "Medical service not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get medical service" });
    }
  };

  getMedicalServiceByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const medicalServices = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: medicalServices });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Failed to get medicalServices by area" });
    }
  };

  addMedicalService = async (req: Request, res: Response) => {
    const medicalServiceDto: MedicalServiceRequest = req.body;

    if (
      !medicalServiceDto.name ||
      !medicalServiceDto.departmentId ||
      !medicalServiceDto.baseCost ||
      !medicalServiceDto.active
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addMedicalService(medicalServiceDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the medical service" });
    }
  };

  updateMedicalService = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: MedicalServiceRequest = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Medical service ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateMedicalService(id, updatedData);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Medical service not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update medical service" });
    }
  };

  deleteMedicalService = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Medical service ID is required." });
    }

    try {
      const result = await this.service.deleteMedicalService(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Medical service deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Medical service not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete medical service" });
    }
  };
}
