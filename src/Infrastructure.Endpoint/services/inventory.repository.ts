import { inject, injectable } from "tsyringe";
import Inventory from "../../Domain.Endpoint/entities/inventory.model";
import { IInventoryRepository } from "../../Domain.Endpoint/interfaces/repositories/inventoryRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class InventoryRepository implements IInventoryRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Inventory[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Inventory)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Inventory({
          id: row["ID"],
          departmentId: row["DEPARTMENT_ID"],
          medicationId: row["MEDICATION_ID"],
          quantity: row["QUANTITY"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        })
    );
  }

  async getById(id: string): Promise<Inventory | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Inventory)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Inventory({
      id: row["ID"],
      departmentId: row["DEPARTMENT_ID"],
      medicationId: row["MEDICATION_ID"],
      quantity: row["QUANTITY"],
      createdAt: row["CREATED_AT"],
      updatedAt: row["UPDATED_AT"],
      createdBy: row["CREATED_BY"],
      updatedBy: row["UPDATED_BY"],
    });
  }

  async getByAreaId(areaId: string): Promise<Inventory[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Inventory)
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
          medicationId: row["MEDICATION_ID"],
          quantity: row["QUANTITY"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        } as Inventory)
    );
  }

  async create(inventory: Inventory): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Inventory, inventory)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(inventory: Inventory): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Inventory, inventory)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(inventory: Inventory): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Inventory, inventory)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
