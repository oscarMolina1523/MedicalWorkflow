import { inject, injectable } from "tsyringe";
import AuditLog from "../../Domain.Endpoint/entities/auditLog.model";
import { IAuditLogRepository } from "../../Domain.Endpoint/interfaces/repositories/auditLogRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class AuditLogRepository implements IAuditLogRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<AuditLog[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.AuditLog)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new AuditLog({
          id: row["ID"],
          entity: row["ENTITY"],
          entityId: row["ENTITY_ID"],
          action: row["ACTION"],
          changes: row["CHANGES"],
          performedBy: row["PERFORMED_BY"],
          performedAt: row["PERFORMED_AT"],
        })
    );
  }

  async create(auditLog: AuditLog): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.AuditLog, auditLog)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

}
