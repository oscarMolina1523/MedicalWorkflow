import { inject, injectable } from "tsyringe";
import Department from "../../Domain.Endpoint/entities/department.model";
import { IDepartmentRepository } from "../../Domain.Endpoint/interfaces/repositories/departmentRepository.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class DepartmentRepository implements IDepartmentRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Department[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Department)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Department({
          id: row["ID"],
          name: row["NAME"],
          description: row["DESCRIPTION"],
          headId: row["HEAD_ID"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
        })
    );
  }

  async getById(id: string): Promise<Department | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Department)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Department({
      id: row["ID"],
      name: row["NAME"],
      description: row["DESCRIPTION"],
      headId: row["HEAD_ID"],
      createdAt: row["CREATED_AT"],
      updatedAt: row["UPDATED_AT"],
    });
  }

  async create(department: Department): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Department, department)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(department: Department): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Department, department)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(department: Department): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Department, department)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
