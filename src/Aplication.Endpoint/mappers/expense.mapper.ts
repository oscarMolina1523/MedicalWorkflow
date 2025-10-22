import Expense from "../../Domain.Endpoint/entities/expense.model";
import { generateId } from "../../shared/utils/generateId";
import { ExpenseRequest } from "../dtos/request/expense.request";

export class ExpenseMapper {
  static toEntity(dto: ExpenseRequest): Expense {
    const now = new Date();

    return new Expense({
      id: generateId(),
      departmentId: dto.departmentId,
      description: dto.description,
      category: dto.category,
      amount: dto.amount,
      createdAt: now,
    });
  }
}
