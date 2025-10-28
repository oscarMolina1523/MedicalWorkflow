import express from "express";
import { container } from "tsyringe";
import UserController from "../controllers/user.controller";

const router = express.Router();
const userController = container.resolve(UserController);

router.get("/", userController.getUsers);

router.get("/area", userController.getUserByAreaId);

router.get("/:id", userController.getUserById);

router.post("/", userController.addUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
