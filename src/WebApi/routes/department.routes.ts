import express from "express";
import { container } from "tsyringe";
import DepartmentController from "../controllers/department.controller";


const router = express.Router();
const departmentController = container.resolve(DepartmentController);

router.get("/", departmentController.getDepartments);

router.get("/:id", departmentController.getDepartmentById);

router.post("/", departmentController.addDepartment);

router.put("/:id", departmentController.updateDepartment);

router.delete("/:id", departmentController.deleteDepartment);

export default router;