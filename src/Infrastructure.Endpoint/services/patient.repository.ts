import { inject, injectable } from "tsyringe";
import Patient from "../../Domain.Endpoint/entities/patient.model";
import { IPatientRepository } from "../../Domain.Endpoint/interfaces/repositories/patientRepository.interface";
import { ISqlCommandOperationBuilder } from "../interfaces/sqlCommandOperation.interface";
import { ISingletonSqlConnection } from "../interfaces/database/dbConnection.interface";
import { EntityType } from "../utils/entityTypes";
import {
  SqlReadOperation,
  SqlWriteOperation,
} from "../builders/sqlOperations.enum";

@injectable()
export default class PatientRepository implements IPatientRepository {
  private readonly _operationBuilder: ISqlCommandOperationBuilder;
  private readonly _connection: ISingletonSqlConnection;

  constructor(
    @inject("IOperationBuilder") operationBuilder: ISqlCommandOperationBuilder,
    @inject("ISingletonSqlConnection") connection: ISingletonSqlConnection
  ) {
    this._operationBuilder = operationBuilder;
    this._connection = connection;
  }

  async getAll(): Promise<Patient[]> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Patient)
      .WithOperation(SqlReadOperation.Select)
      .BuildReader();
    const rows = await this._connection.executeQuery(readCommand);

    return rows.map(
      (row) =>
        new Patient({
          id: row["ID"],
          firstName: row["FIRST_NAME"],
          lastName: row["LAST_NAME"],
          birthDate: row["BIRTH_DATE"],
          gender: row["GENDER"],
          departmentId: row["DEPARTMENT_ID"],
          medicalHistory: row["MEDICAL_HISTORY"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        })
    );
  }

  async getById(id: string): Promise<Patient | null> {
    const readCommand = this._operationBuilder
      .Initialize(EntityType.Patient)
      .WithOperation(SqlReadOperation.SelectById)
      .WithId(id)
      .BuildReader();

    const row = await this._connection.executeScalar(readCommand);
    if (!row) return null;

    return new Patient({
      id: row["ID"],
      firstName: row["FIRST_NAME"],
      lastName: row["LAST_NAME"],
      birthDate: row["BIRTH_DATE"],
      gender: row["GENDER"],
      departmentId: row["DEPARTMENT_ID"],
      medicalHistory: row["MEDICAL_HISTORY"],
      createdAt: row["CREATED_AT"],
      updatedAt: row["UPDATED_AT"],
      createdBy: row["CREATED_BY"],
      updatedBy: row["UPDATED_BY"],
    });
  }

  async getByAreaId(areaId: string): Promise<Patient[]> {
    const builder = this._operationBuilder
      .Initialize(EntityType.User)
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
          firstName: row["FIRST_NAME"],
          lastName: row["LAST_NAME"],
          birthDate: row["BIRTH_DATE"],
          gender: row["GENDER"],
          departmentId: row["DEPARTMENT_ID"],
          medicalHistory: row["MEDICAL_HISTORY"],
          createdAt: row["CREATED_AT"],
          updatedAt: row["UPDATED_AT"],
          createdBy: row["CREATED_BY"],
          updatedBy: row["UPDATED_BY"],
        } as Patient)
    );
  }

  async create(patient: Patient): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Patient, patient)
      .WithOperation(SqlWriteOperation.Create)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async update(patient: Patient): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Patient, patient)
      .WithOperation(SqlWriteOperation.Update)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }

  async delete(patient: Patient): Promise<void> {
    const writeCommand = this._operationBuilder
      .From(EntityType.Patient, patient)
      .WithOperation(SqlWriteOperation.Delete)
      .BuildWritter();

    await this._connection.executeNonQuery(writeCommand);
  }
}
