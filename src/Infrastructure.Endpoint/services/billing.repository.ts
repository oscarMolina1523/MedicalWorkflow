import { inject, injectable } from "tsyringe";
import Billing from "../../Domain.Endpoint/entities/billing.model";
import { IBillingRepository } from "../../Domain.Endpoint/interfaces/repositories/billingRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class BillingRepository implements IBillingRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Billing[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Billing)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Billing({
          id: row["ID"],
          patientId: row["PATIENT_ID"],
          appointmentId: row["APPOINTMENT_ID"],
          serviceId: row["SERVICE_ID"],
          departmentId: row["DEPARTMENT_ID"],
          amount: row["AMOUNT"],
          status: row["STATUS"],
          paymentMethod: row["PAYMENT_METHOD"],
          createdAt: row["CREATED_AT"],
          paidAt: row["PAID_AT"],
        })
    );
  }

  async getById(id: string): Promise<Billing | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Billing)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Billing({
      id: row["ID"],
      patientId: row["PATIENT_ID"],
      appointmentId: row["APPOINTMENT_ID"],
      serviceId: row["SERVICE_ID"],
      departmentId: row["DEPARTMENT_ID"],
      amount: row["AMOUNT"],
      status: row["STATUS"],
      paymentMethod: row["PAYMENT_METHOD"],
      createdAt: row["CREATED_AT"],
      paidAt: row["PAID_AT"],
    });
  }

  async getByAreaId(areaId: string): Promise<Billing[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Billing)
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
          patientId: row["PATIENT_ID"],
          appointmentId: row["APPOINTMENT_ID"],
          serviceId: row["SERVICE_ID"],
          departmentId: row["DEPARTMENT_ID"],
          amount: row["AMOUNT"],
          status: row["STATUS"],
          paymentMethod: row["PAYMENT_METHOD"],
          createdAt: row["CREATED_AT"],
          paidAt: row["PAID_AT"],
        } as Billing)
    );
  }

  async create(billing: Billing): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Billing, billing)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(billing: Billing): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Billing, billing)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(billing: Billing): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Billing, billing)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
