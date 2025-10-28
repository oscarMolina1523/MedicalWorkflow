import { inject, injectable } from "tsyringe";
import Inventory from "../../Domain.Endpoint/entities/inventory.model";
import { InventoryRequest } from "../dtos/request/inventory.request";
import { IInventoryService } from "../interfaces/inventoryService.interface";
import { ServiceResult } from "../utils/serviceResult.type";
import { IInventoryRepository } from "../../Domain.Endpoint/interfaces/repositories/inventoryRepository.interface";
import { ITokenRepository } from "../../Domain.Endpoint/interfaces/repositories/tokenRepository.interface";
import { InventoryMapper } from "../mappers/inventory.mapper";

@injectable()
export default class InventoryService implements IInventoryService {
  private readonly _inventoryRepository: IInventoryRepository;
  private readonly _tokenRepository: ITokenRepository;

  constructor(
    @inject("IInventoryRepository") inventoryRepository: IInventoryRepository,
    @inject("ITokenRepository") tokenRepository: ITokenRepository
  ) {
    this._inventoryRepository = inventoryRepository;
    this._tokenRepository = tokenRepository;
  }

  private getCurrentUser(token: string) {
    const user = this._tokenRepository.decodeToken(token);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  async getInventories(): Promise<Inventory[]> {
    return await this._inventoryRepository.getAll();
  }

  async getById(id: string): Promise<Inventory | null> {
    return await this._inventoryRepository.getById(id);
  }

  async getByAreaId(token: string): Promise<Inventory[]> {
    const currentUser = this.getCurrentUser(token);
    if (!currentUser.departmentId) {
      throw new Error("Department ID is required.");
    }
    return await this._inventoryRepository.getByAreaId(
      currentUser.departmentId
    );
  }

  async addInventory(
    inventory: InventoryRequest,
    token: string
  ): Promise<ServiceResult<Inventory>> {
    const currentUser = this.getCurrentUser(token);
    const newInventory = InventoryMapper.toEntity(inventory, currentUser.id);
    await this._inventoryRepository.create(newInventory);

    return { success: true, message: "Inventory created", data: newInventory };
  }

  async updateInventory(
    id: string,
    inventory: InventoryRequest,
    token: string
  ): Promise<ServiceResult<Inventory | null>> {
    const existing = await this._inventoryRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Inventory not found", data: null };
    }

    const currentUser = this.getCurrentUser(token);

    // actualizar solo las propiedades necesarias
    const updatedInventory = InventoryMapper.updateEntity(
      existing,
      inventory,
      currentUser.id
    );

    await this._inventoryRepository.update(updatedInventory);

    return {
      success: true,
      message: "Inventory updated",
      data: updatedInventory,
    };
  }

  async deleteInventory(
    id: string
  ): Promise<{ success: boolean; message: string }> {
    const existing = await this._inventoryRepository.getById(id);
    if (!existing) {
      return { success: false, message: "Inventory not found" };
    }

    await this._inventoryRepository.delete(existing);
    return { success: true, message: "Inventory deleted" };
  }
}
