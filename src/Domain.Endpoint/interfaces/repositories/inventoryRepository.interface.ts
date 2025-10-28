import Inventory from "../../entities/inventory.model";

export interface IInventoryRepository {
  getAll(): Promise<Inventory[]>;
  getById(id: string): Promise<Inventory | null>;
  getByAreaId(areaId: string): Promise<Inventory[]>;
  create(inventory: Inventory): Promise<void>;
  update(inventory: Inventory): Promise<void>;
  delete(inventory: Inventory): Promise<void>;
}
