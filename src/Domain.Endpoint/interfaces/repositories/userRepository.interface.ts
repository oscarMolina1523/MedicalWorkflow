import { UserResponse } from "../../../Aplication.Endpoint/dtos/response/user.response";
import User from "../../entities/user.model";

export interface IUserRepository {
  getAll(): Promise<UserResponse[]>;
  getById(id: string): Promise<UserResponse | null>;
  getByEmail(email: string): Promise<User | null>;
  getByAreaId(areaId: string): Promise<UserResponse[]>
  create(user: User): Promise<void>;
  update(user: UserResponse): Promise<void>;
  delete(user: UserResponse): Promise<void>;
}