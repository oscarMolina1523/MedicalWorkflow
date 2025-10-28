import { inject, injectable } from "tsyringe";
import Department from "../../Domain.Endpoint/entities/department.model";
import { DepartmentRequest } from "../dtos/request/department.request";
import { IDepartmentService } from "../interfaces/departmentService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IDepartmentRepository } from "../../Domain.Endpoint/interfaces/repositories/departmentRepository.interface";
import { DepartmentMapper } from "../mappers/department.mapper";

@injectable()
export default class DepartmentService implements IDepartmentService {
  private readonly _departmentRepository: IDepartmentRepository;

  constructor(
    @inject("IDepartmentRepository") departmentRepository: IDepartmentRepository
  ) {
    this._departmentRepository = departmentRepository;
  }

  async getDepartments(): Promise<Department[]> {
    return await this._departmentRepository.getAll();
  }

  async getById(id: string): Promise<Department | null> {
    return await this._departmentRepository.getById(id);
  }

  async addDepartment(
    department: DepartmentRequest
  ): Promise<ServiceResult<Department>> {
    const newDepartment = DepartmentMapper.toEntity(department);
    await this._departmentRepository.create(newDepartment);

    return {
      success: true,
      message: "Department created",
      data: newDepartment,
    };
  }

  async updateDepartment(
    id: string,
    department: DepartmentRequest
  ): Promise<ServiceResult<Department | null>> {
    const existing = await this._departmentRepository.getById(id);

    if (!existing) {
      return { success: false, message: "Department not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedDepartment = DepartmentMapper.updateEntity(
      existing,
      department
    );

    await this._departmentRepository.update(updatedDepartment);

    return {
      success: true,
      message: "Department updated",
      data: updatedDepartment,
    };
  }

  async deleteDepartment(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._departmentRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Department not found" };
    }

    await this._departmentRepository.delete(existing);
    return { success: true, message: "Department deleted" };
  }
}
