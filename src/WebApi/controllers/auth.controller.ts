import { inject, injectable } from "tsyringe";
import { IAuthService } from "../../Aplication.Endpoint/interfaces/authService.interface";
import { Request, Response } from "express";
import { UserRequest } from "../../Aplication.Endpoint/dtos/request/user.request";

@injectable()
export default class AuthController {
  private readonly _authService: IAuthService;

  constructor(@inject("IAuthService") authService: IAuthService) {
    this._authService = authService;
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: UserRequest = req.body;

      if (!data.email || !data.password) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
      }

      const result = await this._authService.login(data.email, data.password);

      res.json({
        message: result.message,
        user: result.data,
        token: result.token,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al logear al usuario", error });
    }
  };

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: UserRequest = req.body;

      if (!data.username || !data.email || !data.password) {
        res.status(400).json({ message: "Todos los campos son obligatorios" });
        return;
      }

      const result = await this._authService.register(data);

      res.status(201).json({
        message: result.message,
        user: result.data,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario", error });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    const result = this._authService.logout();
    res.json({ message: result });
  };
}
