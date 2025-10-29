import express from "express";
import { container } from "tsyringe";
import InventoryController from "../controllers/inventory.controller";

const router = express.Router();
const inventoryController = container.resolve(InventoryController);

router.get("/", inventoryController.getInventories);

router.get("/area", inventoryController.getInventoryByAreaId);

router.get("/:id", inventoryController.getInventoryById);

router.post("/", inventoryController.addInventory);

router.put("/:id", inventoryController.updateInventory);

router.delete("/:id", inventoryController.deleteInventory);

export default router;