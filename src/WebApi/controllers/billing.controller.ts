import { inject, injectable } from "tsyringe";
import { IBillingService } from "../../Aplication.Endpoint/interfaces/billingService.interface";
import { Request, Response } from "express";
import { BillingRequest } from "../../Aplication.Endpoint/dtos/request/billing.request";

@injectable()
export default class BillingController {
  private readonly service: IBillingService;

  constructor(@inject("IBillingService") service: IBillingService) {
    this.service = service;
  }

  getBillings = async (req: Request, res: Response) => {
    try {
      const billings = await this.service.getBillings();
      res.status(200).json({ success: true, data: billings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get billings" });
    }
  };

  getBillingById = async (req: Request, res: Response) => {
    const billingId: string | undefined = req.params.id;

    if (!billingId) {
      return res.status(400).json({ message: "Billing ID is required." });
    }

    try {
      const billing = await this.service.getById(billingId);

      if (billing) {
        res.status(200).json({ success: true, data: billing });
      } else {
        res.status(404).json({ message: "Billing not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get billing" });
    }
  };

  getBillingByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const billing = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: billing });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get billing by area" });
    }
  };

  addBilling = async (req: Request, res: Response) => {
    const billingDto: BillingRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (
      !billingDto.departmentId ||
      !billingDto.appointmentId ||
      !billingDto.patientId ||
      !billingDto.serviceId ||
      !billingDto.paymentMethod ||
      !billingDto.status ||
      !billingDto.amount 
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addBilling(billingDto, token);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch(error) {
      console.log("error controller:" , error);
      res.status(400).json({ message: "Failed to add the billing" });
    }
  };

  updateBilling = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: BillingRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Billing ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateBilling(id, updatedData, token);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Billing not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update billing" });
    }
  };

  deleteBilling = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const token = req.headers["authorization"] || "";
    if (!id) {
      return res.status(400).json({ message: "Billing ID is required." });
    }

    try {
      const result = await this.service.deleteBilling(id, token);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Billing deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Billing not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete billing" });
    }
  };
}
