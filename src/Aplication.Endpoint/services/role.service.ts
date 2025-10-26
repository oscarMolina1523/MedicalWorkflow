import { inject, injectable } from "tsyringe";
import { ServiceResult } from "../utils/serviceResult.type";
import { IRoleService } from "../interfaces/roleService.interface";
import { IRoleRepository } from "../../Domain.Endpoint/interfaces/repositories/roleRepository.interface";
import Role from "../../Domain.Endpoint/entities/role.model";
import { RoleRequest } from "../dtos/request/role.request";
import { RoleMapper } from "../mappers/role.mapper";

@injectable()
export default class RoleService implements IRoleService {
  private readonly _roleRepository: IRoleRepository;

  constructor(@inject("IRoleRepository") roleRepository: IRoleRepository) {
    this._roleRepository = roleRepository;
  }

  async getRoles(): Promise<Role[]> {
    return await this._roleRepository.getAll();
  }

  async getById(id: string): Promise<Role | null> {
    return await this._roleRepository.getById(id);
  }

  async addRole(role: RoleRequest): Promise<ServiceResult<Role>> {
    const newRole = RoleMapper.toEntity(role);
    await this._roleRepository.create(newRole);

    return { success: true, message: "Role created", data: newRole };
  }

  async updateRole(
    id: string,
    role: RoleRequest
  ): Promise<ServiceResult<Role | null>> {
    const existing = await this._roleRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Role not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedRole = RoleMapper.updateEntity(existing, role);

    await this._roleRepository.update(updatedRole);

    return { success: true, message: "Role updated", data:updatedRole };
  }

  async deleteRole(id: string): Promise<{ success: boolean; message: string }> {
    const existing = await this._roleRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Role not found" };
    }

    await this._roleRepository.delete(existing);
    return { success: true, message: "Role deleted" };
  }
}
