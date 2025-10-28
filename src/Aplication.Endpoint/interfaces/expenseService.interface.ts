import Expense from "../../Domain.Endpoint/entities/expense.model";
import { ExpenseRequest } from "../dtos/request/expense.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IExpenseService {
  getExpenses(): Promise<Expense[]>;
  getById(id: string): Promise<Expense | null>;
  getByAreaId(token: string): Promise<Expense[]>;
  addExpense(
    expense: ExpenseRequest
  ): Promise<ServiceResult<Expense>>;
  updateExpense(
    id: string,
    expense: ExpenseRequest
  ): Promise<ServiceResult<Expense | null>>;
  deleteExpense(id: string): Promise<{ success: boolean; message: string }>;
}
