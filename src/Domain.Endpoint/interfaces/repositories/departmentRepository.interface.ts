import Department from "../../entities/department.model";

export interface IDepartmentRepository {
  getAll(): Promise<Department[]>;
  getById(id: string): Promise<Department | null>;
  create(department: Department): Promise<void>;
  update(department: Department): Promise<void>;
  delete(department: Department): Promise<void>;
}
