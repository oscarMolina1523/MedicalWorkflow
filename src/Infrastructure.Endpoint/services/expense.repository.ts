import { inject, injectable } from "tsyringe";
import Expense from "../../Domain.Endpoint/entities/expense.model";
import { IExpenseRepository } from "../../Domain.Endpoint/interfaces/repositories/expenseRepository.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class ExpenseRepository implements IExpenseRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Expense[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Expense)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Expense({
          id: row["ID"],
          departmentId: row["DEPARTMENT_ID"],
          description: row["DESCRIPTION"],
          category: row["CATEGORY"],
          createdAt: row["CREATED_AT"],
          amount: row["AMOUNT"],
        })
    );
  }

  async getById(id: string): Promise<Expense | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Expense)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Expense({
      id: row["ID"],
      departmentId: row["DEPARTMENT_ID"],
      description: row["DESCRIPTION"],
      category: row["CATEGORY"],
      createdAt: row["CREATED_AT"],
      amount: row["AMOUNT"],
    });
  }

  async getByAreaId(areaId: string): Promise<Expense[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Expense)
      .WithOperation(SqlReadOperation.SelectByField);

    if (!builder.WithField) {
      throw new Error("WithField no implementado");
    }

    const readCommand = builder.WithField("departmentId", areaId).BuildReader();

    const rows = await this._connection.executeQuery(readCommand);
    if (!rows || rows.length === 0) return [];

    return rows.map(
      (row) =>
        ({
          id: row["ID"],
          departmentId: row["DEPARTMENT_ID"],
          description: row["DESCRIPTION"],
          category: row["CATEGORY"],
          createdAt: row["CREATED_AT"],
          amount: row["AMOUNT"],
        } as Expense)
    );
  }

  async create(expense: Expense): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Expense, expense)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(expense: Expense): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Expense, expense)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(expense: Expense): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Expense, expense)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
