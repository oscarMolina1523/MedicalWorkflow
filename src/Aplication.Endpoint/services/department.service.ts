import { inject, injectable } from "tsyringe";
import Department from "../../Domain.Endpoint/entities/department.model";
import { DepartmentRequest } from "../dtos/request/department.request";
import { IDepartmentService } from "../interfaces/departmentService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IDepartmentRepository } from "../../Domain.Endpoint/interfaces/repositories/departmentRepository.interface";
import { DepartmentMapper } from "../mappers/department.mapper";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class DepartmentService implements IDepartmentService {
  private readonly _departmentRepository: IDepartmentRepository;
  private readonly _logRepository: IAuditLogRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IDepartmentRepository")
    departmentRepository: IDepartmentRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository,
    @inject("ITokenRepository") TokenRepository: ITokenRepository
  ) {
    this._departmentRepository = departmentRepository;
    this._tokenRepository = TokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getDepartments(): Promise<Department[]> {
    return await this._departmentRepository.getAll();
  }

  async getById(id: string): Promise<Department | null> {
    return await this._departmentRepository.getById(id);
  }

  async addDepartment(
    department: DepartmentRequest,
    token: string
  ): Promise<ServiceResult<Department>> {
    const currentUser = this.getCurrentUser(token);

    const newDepartment = DepartmentMapper.toEntity(department);
    await this._departmentRepository.create(newDepartment);

    const log = LOGMapper.toEntity({
      entity: "Department",
      entityId: newDepartment.id,
      action: Action.CREATE,
      changes: "Create new Department",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return {
      success: true,
      message: "Department created",
      data: newDepartment,
    };
  }

  async updateDepartment(
    id: string,
    department: DepartmentRequest, token:string
  ): Promise<ServiceResult<Department | null>> {
    const currentUser = this.getCurrentUser(token);

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

    const log = LOGMapper.toEntity({
      entity: "Department",
      entityId: updatedDepartment.id,
      action: Action.UPDATE,
      changes: "Update Department",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);


    return {
      success: true,
      message: "Department updated",
      data: updatedDepartment,
    };
  }

  async deleteDepartment(
    id: string, token:string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._departmentRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Department not found" };
    }

    await this._departmentRepository.delete(existing);
    const log = LOGMapper.toEntity({
      entity: "Department",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete Department",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);
    return { success: true, message: "Department deleted" };
  }
}
