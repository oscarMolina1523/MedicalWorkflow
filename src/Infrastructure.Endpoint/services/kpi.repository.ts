import { inject, injectable } from "tsyringe";
import Kpi from "../../Domain.Endpoint/entities/kpi.model";
import { IKpiRepository } from "../../Domain.Endpoint/interfaces/repositories/kpiRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import { SqlReadOperation } from "../builders/sqlOperations.enum";

@injectable()
export default class KpiRepository implements IKpiRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  // Trae todos los KPIs ya calculados (día, semana, mes, año)
  async getAll(): Promise<Kpi[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.KPI)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();

    const rows = await this._connection.executeQuery(readCommand);

    if (!rows || rows.length === 0) return [];

    return rows.map(
      (row) =>
        new Kpi({
          id: row["ID"],
          name: row["NAME"],           // DAILY_PROFIT, WEEKLY_PROFIT, etc.
          departmentId: row["DEPARTMENT_ID"], // si quieres saber de qué departamento
          value: row["VALUE"],         // el total ya calculado
          metricDate: row["METRIC_DATE"], // fecha del KPI (día, semana, mes o año)
          createdAt: row["CREATED_AT"],
          createdBy: row["CREATED_BY"],
        })
    );
  }
}
