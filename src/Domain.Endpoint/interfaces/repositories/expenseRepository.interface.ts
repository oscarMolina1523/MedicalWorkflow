import Expense from "../../entities/expense.model";

export interface IExpenseRepository {
  getAll(): Promise<Expense[]>;
  getById(id: string): Promise<Expense | null>;
  getByAreaId(areaId: string): Promise<Expense[]>;
  create(expense: Expense): Promise<void>;
  update(expense: Expense): Promise<void>;
  delete(expense: Expense): Promise<void>;
}
