import { inject, injectable } from "tsyringe";
import Role from "../../Domain.Endpoint/entities/role.model";
import { IRoleRepository } from "../../Domain.Endpoint/interfaces/repositories/roleRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { IMedicationRepository } from "../../Domain.Endpoint/interfaces/repositories/medicationRepository.interface";
import { Medication } from "../../Domain.Endpoint/entities/medication.model";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class MedicationRepository implements IMedicationRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Medication[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Medication)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Medication({
          id: row["ID"],
          name: row["NAME"],
          description: row["DESCRIPTION"],
          expirationDate: row["EXPIRATION_DATE"],
          unit: row["UNIT"],
          active: row["ACTIVE"],
        })
    );
  }

  async getById(id: string): Promise<Medication | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Medication)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Medication({
      id: row["ID"],
      name: row["NAME"],
      description: row["DESCRIPTION"],
      expirationDate: row["EXPIRATION_DATE"],
      unit: row["UNIT"],
      active: row["ACTIVE"],
    });
  }

  async create(medication: Medication): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Medication, medication)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(medication: Medication): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Medication, medication)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(medication: Medication): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Medication, medication)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
