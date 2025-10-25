import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { UserRequest } from "../../Aplication.Endpoint/dtos/request/user.request";
import bcrypt from "bcryptjs";
import { decodeToken } from "../middlewares/auth.middleware";
import { IUserService } from "../../Aplication.Endpoint/interfaces/userService.interface";

@injectable()
export default class UserController {
  private readonly service: IUserService;

  constructor(@inject("IUserService") service: IUserService) {
    this.service = service;
  }

  private getCurrentUser(req: Request) {
    const user = decodeToken(req);
    if (!user || !user.id) throw new Error("Invalid or missing token");
    return user;
  }

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get users" });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const userId: string | undefined = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      const user = await this.service.getById(userId);

      if (user) {
        res.status(200).json({ success: true, data: user });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get user" });
    }
  };

  // getUserByEmail = async (req: Request, res: Response) => {
  //   //http://localhost:3000/users/email/admin@empresa.com

  //   const email = req.params.email;

  //   if (!email) {
  //     return res.status(400).json({ message: "Email is required." });
  //   }

  //   try {
  //     const user = await this.service.getByEmail(email);

  //     if (user) {
  //       res.status(200).json({ success: true, data: user });
  //     } else {
  //       res.status(404).json({ message: "User not found" });
  //     }
  //   } catch {
  //     res.status(500).json({ message: "Failed to get user" });
  //   }
  // };

  getUserByAreaId = async (req: Request, res: Response) => {
    const user = this.getCurrentUser(req);

    if (!user.departmentId) {
      return res.status(400).json({ message: "Department ID is required." });
    }

    try {
      const users = await this.service.getByAreaId(user.departmentId);
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get users by area" });
    }
  };

  addUser = async (req: Request, res: Response) => {
    const userDto: UserRequest = req.body;
    const user = this.getCurrentUser(req);

    if (!userDto.email || !userDto.password || !userDto.username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const passwordEncripted = await bcrypt.hash(userDto.password, 10);

      userDto.password = passwordEncripted;

      const response = await this.service.addUser(userDto, user.id);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the user" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: UserRequest = req.body;
    const user = this.getCurrentUser(req);

    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      if (updatedData.password && updatedData.password.trim() !== "") {
        updatedData.password = await bcrypt.hash(updatedData.password, 10);
      }

      const success = await this.service.updateUser(id, updatedData, user.id);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Failed to update user" + error });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    try {
      const result = await this.service.deleteUser(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete user" });
    }
  };
}
