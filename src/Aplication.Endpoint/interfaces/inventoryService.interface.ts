import Inventory from "../../Domain.Endpoint/entities/inventory.model";
import { InventoryRequest } from "../dtos/request/inventory.request";
import { ServiceResult } from "../utils/serviceResult.type";

export interface IInventoryService {
  getInventories(): Promise<Inventory[]>;
  getById(id: string): Promise<Inventory | null>;
  getByAreaId(token: string): Promise<Inventory[]>;
  addInventory(
    inventory: InventoryRequest,
    token: string
  ): Promise<ServiceResult<Inventory>>;
  updateInventory(
    id: string,
    inventory: InventoryRequest,
    token: string
  ): Promise<ServiceResult<Inventory | null>>;
  deleteInventory(id: string, token:string): Promise<{ success: boolean; message: string }>;
}
