import Role from "../../Domain.Endpoint/entities/role.model";
import { RoleRequest } from "../dtos/request/role.request";
import { ServiceResult } from "../utils/serviceResult.type";


export interface IRoleService {
  getRoles(): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  addRole(role: RoleRequest): Promise<ServiceResult<Role>>;
  updateRole(id: string, role: RoleRequest): Promise<ServiceResult<Role | null>>;
  deleteRole(id: string): Promise<{ success: boolean; message: string }>;
}