import { inject, injectable } from "tsyringe";
import MedicalService from "../../Domain.Endpoint/entities/medicalService.model";
import { IMedicalServiceRepository } from "../../Domain.Endpoint/interfaces/repositories/medicalService.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class MedicalServiceRepository
  implements IMedicalServiceRepository
{
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<MedicalService[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.MedicalService)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new MedicalService({
          id: row["ID"],
          name: row["NAME"],
          departmentId: row["DEPARTMENT_ID"],
          baseCost: row["BASE_COST"],
          active: row["ACTIVE"],
        })
    );
  }

  async getById(id: string): Promise<MedicalService | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.MedicalService)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new MedicalService({
      id: row["ID"],
      name: row["NAME"],
      departmentId: row["DEPARTMENT_ID"],
      baseCost: row["BASE_COST"],
      active: row["ACTIVE"],
    });
  }

  async getByAreaId(areaId: string): Promise<MedicalService[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.MedicalService)
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
          name: row["NAME"],
          departmentId: row["DEPARTMENT_ID"],
          baseCost: row["BASE_COST"],
          active: row["ACTIVE"],
        } as MedicalService)
    );
  }

  async create(medicalService: MedicalService): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.MedicalService, medicalService)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(medicalService: MedicalService): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.MedicalService, medicalService)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(medicalService: MedicalService): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.MedicalService, medicalService)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
