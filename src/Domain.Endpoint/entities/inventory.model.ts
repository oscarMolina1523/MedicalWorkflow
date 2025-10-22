import BaseModel from "./base.model";

export default class Inventory extends BaseModel {
  departmentId: string;
  medicationId: string;
  quantity: number;
  lastRestockAt: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  constructor({
    id,
    departmentId,
    medicationId,
    quantity,
    lastRestockAt,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
  }: {
    id: string;
    departmentId: string;
    medicationId: string;
    quantity: number;
    lastRestockAt: Date;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
  }) {
    super(id);
    this.departmentId = departmentId;
    this.medicationId = medicationId;
    this.quantity = quantity;
    this.lastRestockAt = lastRestockAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
  }
}
