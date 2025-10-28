import { inject, injectable } from "tsyringe";
import Expense from "../../Domain.Endpoint/entities/expense.model";
import { IExpenseRepository } from "../../Domain.Endpoint/interfaces/repositories/expenseRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { ExpenseRequest } from "../dtos/request/expense.request";
import { IExpenseService } from "../interfaces/expenseService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { ExpenseMapper } from "../mappers/expense.mapper";

@injectable()
export default class ExpenseService implements IExpenseService {
  private readonly _expenseRepository: IExpenseRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IExpenseRepository") expenseRepository: IExpenseRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._expenseRepository = expenseRepository;
    this._tokenRepository = tokenRepository;
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

  async addExpense(expense: ExpenseRequest): Promise<ServiceResult<Expense>> {
    const newExpense = ExpenseMapper.toEntity(expense);
    await this._expenseRepository.create(newExpense);

    return { success: true, message: "Expense created", data: newExpense };
  }

  async updateExpense(
    id: string,
    expense: ExpenseRequest
  ): Promise<ServiceResult<Expense | null>> {
    const existing = await this._expenseRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Expense not found", data: null };
    }

    // actualizar solo las propiedades necesarias
    const updatedPatient = ExpenseMapper.updateEntity(existing, expense);
    await this._expenseRepository.update(updatedPatient);

    return { success: true, message: "Expense updated", data: updatedPatient };
  }

  async deleteExpense(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._expenseRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Expense not found" };
    }

    await this._expenseRepository.delete(existing);
    return { success: true, message: "Expense deleted" };
  }
}
