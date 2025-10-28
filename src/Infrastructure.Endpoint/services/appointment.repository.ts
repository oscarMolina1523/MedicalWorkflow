import { inject, injectable } from "tsyringe";
import Appointment from "../../Domain.Endpoint/entities/appointment.model";
import { IAppointmentRepository } from "../../Domain.Endpoint/interfaces/repositories/appointmentRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class AppointmentRepository implements IAppointmentRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Appointment[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Appointment)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Appointment({
          id: row["ID"],
          patientId: row["PATIENT_ID"],
          departmentId: row["DEPARTMENT_ID"],
          doctorId: row["DOCTOR_ID"],
          scheduledAt: row["SCHEDULED_AT"],
          status: row["STATUS"],
          notes: row["NOTES"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        })
    );
  }

  async getById(id: string): Promise<Appointment | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Appointment)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Appointment({
      id: row["ID"],
      patientId: row["PATIENT_ID"],
      departmentId: row["DEPARTMENT_ID"],
      doctorId: row["DOCTOR_ID"],
      scheduledAt: row["SCHEDULED_AT"],
      status: row["STATUS"],
      notes: row["NOTES"],
      createdAt: row["CREATED_AT"],
      updatedAt: row["UPDATED_AT"],
      createdBy: row["CREATED_BY"],
      updatedBy: row["UPDATED_BY"],
    });
  }

  async getByAreaId(areaId: string): Promise<Appointment[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.Appointment)
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
          departmentId: row["DEPARTMENT_ID"],
          doctorId: row["DOCTOR_ID"],
          scheduledAt: row["SCHEDULED_AT"],
          status: row["STATUS"],
          notes: row["NOTES"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        } as Appointment)
    );
  }

  async create(appointment: Appointment): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Appointment, appointment)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(appointment: Appointment): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Appointment, appointment)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(appointment: Appointment): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Appointment, appointment)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
