import Department from "../../Domain.Endpoint/entities/department.model";
import { DepartmentRequest } from "../dtos/request/department.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IDepartmentService {
  getDepartments(): Promise<Department[]>;
  getById(id: string): Promise<Department | null>;
  addDepartment(
    department: DepartmentRequest,
    token:string
  ): Promise<ServiceResult<Department>>;
  updateDepartment(
    id: string,
    department: DepartmentRequest, 
    token:string
  ): Promise<ServiceResult<Department | null>>;
  deleteDepartment(id: string, token:string): Promise<{ success: boolean; message: string }>;
}
