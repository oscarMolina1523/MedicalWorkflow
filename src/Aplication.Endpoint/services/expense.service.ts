import { inject, injectable } from "tsyringe";
import Expense from "../../Domain.Endpoint/entities/expense.model";
import { IExpenseRepository } from "../../Domain.Endpoint/interfaces/repositories/expenseRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { ExpenseRequest } from "../dtos/request/expense.request";
import { IExpenseService } from "../interfaces/expenseService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ExpenseMapper } from "../mappers/expense.mapper";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import LOGMapper from "../mappers/log.mapper";
import { Action } from "../../Domain.Endpoint/entities/action.enum";

@injectable()
export default class ExpenseService implements IExpenseService {
  private readonly _expenseRepository: IExpenseRepository;
  private readonly _tokenRepository: ITokenRepository;
  private readonly _logRepository: IAuditLogRepository;

  constructor(
    @inject("IExpenseRepository") expenseRepository: IExpenseRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository,
    @inject("IAuditLogRepository") logRepository: IAuditLogRepository
  ) {
    this._expenseRepository = expenseRepository;
    this._tokenRepository = tokenRepository;
    this._logRepository = logRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getExpenses(): Promise<Expense[]> {
    return await this._expenseRepository.getAll();
  }

  async getById(id: string): Promise<Expense | null> {
    return await this._expenseRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<Expense[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._expenseRepository.getByAreaId(currentUser.departmentId);
  }

  async addExpense(
    expense: ExpenseRequest,
    token: string
  ): Promise<ServiceResult<Expense>> {
    const currentUser = this.getCurrentUser(token);

    const newExpense = ExpenseMapper.toEntity(expense);
    await this._expenseRepository.create(newExpense);

    const log = LOGMapper.toEntity({
      entity: "Expense",
      entityId: newExpense.id,
      action: Action.CREATE,
      changes: "Create new expense",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Expense created", data: newExpense };
  }

  async updateExpense(
    id: string,
    expense: ExpenseRequest, token:string
  ): Promise<ServiceResult<Expense | null>> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._expenseRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Expense not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedExpense = ExpenseMapper.updateEntity(existing, expense);
    await this._expenseRepository.update(updatedExpense);

    const log = LOGMapper.toEntity({
      entity: "Expense",
      entityId: updatedExpense.id,
      action: Action.UPDATE,
      changes: "Update expense",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Expense updated", data: updatedExpense };
  }

  async deleteExpense(
    id: string, token:string
  ): Promise<{ success: boolean; message: string }> {
    const currentUser = this.getCurrentUser(token);

    const existing = await this._expenseRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Expense not found" };
    }

    await this._expenseRepository.delete(existing);

    const log = LOGMapper.toEntity({
      entity: "Expense",
      entityId: existing.id,
      action: Action.DELETE,
      changes: "Delete expense",
      performedBy: currentUser.id,
    });

    await this._logRepository.create(log);

    return { success: true, message: "Expense deleted" };
  }
}
