import { inject, injectable } from "tsyringe";
import { ServiceResult } from "../utils/serviceResult.type";
import { IRoleService } from "../interfaces/roleService.interface";
import { IRoleRepository } from "../../Domain.Endpoint/interfaces/repositories/roleRepository.interface";
import Role from "../../Domain.Endpoint/entities/role.model";
import { RoleRequest } from "../dtos/request/role.request";
import { RoleMapper } from "../mappers/role.mapper";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class RoleService implements IRoleService {
  private readonly _roleRepository: IRoleRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IRoleRepository") roleRepository: IRoleRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._roleRepository = roleRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getRoles(): Promise<Role[]> {
    return await this._roleRepository.getAll();
  }

  async getById(id: string): Promise<Role | null> {
    return await this._roleRepository.getById(id);
  }

  async addRole(
    role: RoleRequest,
    token: string
  ): Promise<ServiceResult<Role>> {
    const currentUser = this.getCurrentUser(token);

    const newRole = RoleMapper.toEntity(role);

    await this._roleRepository.create(newRole);

    const log = LOGMapper.toEntity({
      entity: "Role",
      entityId: newRole.id,
      action: Action.CREATE,
      changes: "Create new role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Role created", data: newRole };
  }

  async updateRole(
    id: string,
    role: RoleRequest, token:string 
  ): Promise<ServiceResult<Role | null>> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._roleRepository.getById(id);

    if (!existing) {
      return { success: false, message: "Role not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedRole = RoleMapper.updateEntity(existing, role);

    await this._roleRepository.update(updatedRole);
    const log = LOGMapper.toEntity({
      entity: "Role",
      entityId: updatedRole.id,
      action: Action.UPDATE,
      changes: "Update role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Role updated", data: updatedRole };
  }

  async deleteRole(id: string, token: string): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._roleRepository.getById(id);

    if (!existing) {
      return { success: false, message: "Role not found" };
    }

    await this._roleRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "Role",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete role",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Role deleted" };
  }
}
