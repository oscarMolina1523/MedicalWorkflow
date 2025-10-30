import { inject, injectable } from "tsyringe";
import { IDepartmentService } from "../../Aplication.Endpoint/interfaces/departmentService.interface";
import { Request, Response } from "express";
import { DepartmentRequest } from "../../Aplication.Endpoint/dtos/request/department.request";

@injectable()
export default class DepartmentController {
  private readonly service: IDepartmentService;

  constructor(@inject("IDepartmentService") service: IDepartmentService) {
    this.service = service;
  }

  getDepartments = async (req: Request, res: Response) => {
    try {
      const department = await this.service.getDepartments();
      res.status(200).json({ success: true, data: department });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get departments" });
    }
  };

  getDepartmentById = async (req: Request, res: Response) => {
    const departmentId: string | undefined = req.params.id;

    if (!departmentId) {
      return res.status(400).json({ message: "Department ID is required." });
    }

    try {
      const department = await this.service.getById(departmentId);

      if (department) {
        res.status(200).json({ success: true, data: department });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get department" });
    }
  };

  addDepartment = async (req: Request, res: Response) => {
    const departmentDto: DepartmentRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (
      !departmentDto.name ||
      !departmentDto.description ||
      !departmentDto.headId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addDepartment(departmentDto, token);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the Department" });
    }
  };

  updateDepartment = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: DepartmentRequest = req.body;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Department ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateDepartment(id, updatedData, token);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update department" });
    }
  };

  deleteDepartment = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const token = req.headers["authorization"] || "";

    if (!id) {
      return res.status(400).json({ message: "Department ID is required." });
    }

    try {
      const result = await this.service.deleteDepartment(id, token);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Department deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete department" });
    }
  };
}
