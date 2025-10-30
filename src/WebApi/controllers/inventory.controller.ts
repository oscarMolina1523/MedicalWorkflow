import { inject, injectable } from "tsyringe";
import { IInventoryService } from "../../Aplication.Endpoint/interfaces/inventoryService.interface";
import { Request, Response } from "express";
import { InventoryRequest } from "../../Aplication.Endpoint/dtos/request/inventory.request";

@injectable()
export default class InventoryController {
  private readonly service: IInventoryService;

  constructor(@inject("IInventoryService") service: IInventoryService) {
    this.service = service;
  }

  getInventories = async (req: Request, res: Response) => {
    try {
      const inventories = await this.service.getInventories();
      res.status(200).json({ success: true, data: inventories });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get inventories" });
    }
  };

  getInventoryById = async (req: Request, res: Response) => {
    const inventoryId: string | undefined = req.params.id;

    if (!inventoryId) {
      return res.status(400).json({ message: "Inventory ID is required." });
    }

    try {
      const inventory = await this.service.getById(inventoryId);

      if (inventory) {
        res.status(200).json({ success: true, data: inventory });
      } else {
        res.status(404).json({ message: "Inventory not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get inventory" });
    }
  };

  getInventoryByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const inventories = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: inventories });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get inventories by area" });
    }
  };

  addInventory = async (req: Request, res: Response) => {
    const inventoryDto: InventoryRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (
      !inventoryDto.departmentId ||
      !inventoryDto.medicationId ||
      !inventoryDto.quantity
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addInventory(inventoryDto, token);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the inventory" });
    }
  };

  updateInventory = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: InventoryRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Inventory ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateInventory(
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
        res.status(404).json({ message: "Inventory not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update inventory" });
    }
  };

  deleteInventory = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Inventory ID is required." });
    }

    try {
      const result = await this.service.deleteInventory(id, token);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Inventory deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Inventory not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete inventory" });
    }
  };
}
