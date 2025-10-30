import User from "../../Domain.Endpoint/entities/user.model";
import { UserRequest } from "../dtos/request/user.request";
import { UserResponse } from "../dtos/response/user.response";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IUserService {
  getUsers(): Promise<UserResponse[]>;
  getById(id: string): Promise<UserResponse | null>;
  getByEmail(email: string): Promise<User | null>;
  getByAreaId(token: string): Promise<UserResponse[]>;
  addUser(user: UserRequest, token:string): Promise<ServiceResult<UserResponse>>;
  updateUser(id: string, user: UserRequest, token: string): Promise<ServiceResult<UserResponse | null>>;
  deleteUser(id:string , token:string): Promise<{ success: boolean; message: string }>;
}