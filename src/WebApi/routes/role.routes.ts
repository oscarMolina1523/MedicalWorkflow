import express from "express";
import { container } from "tsyringe";
import RoleController from "../controllers/role.controller";

const router = express.Router();
const roleController = container.resolve(RoleController);

router.get("/", roleController.getRoles);

router.get("/:id", roleController.getRoleById);

router.post("/", roleController.addRole);

router.put("/:id", roleController.updateRole);

router.delete("/:id", roleController.deleteRole);

export default router;