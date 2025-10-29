import { inject, injectable } from "tsyringe";
import { IExpenseService } from "../../Aplication.Endpoint/interfaces/expenseService.interface";
import { Request, Response } from "express";
import { ExpenseRequest } from "../../Aplication.Endpoint/dtos/request/expense.request";

@injectable()
export default class ExpenseController {
  private readonly service: IExpenseService;

  constructor(@inject("IExpenseService") service: IExpenseService) {
    this.service = service;
  }

  getExpenses = async (req: Request, res: Response) => {
    try {
      const expenses = await this.service.getExpenses();
      res.status(200).json({ success: true, data: expenses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get expenses" });
    }
  };

  getExpenseById = async (req: Request, res: Response) => {
    const expenseId: string | undefined = req.params.id;

    if (!expenseId) {
      return res.status(400).json({ message: "Expense ID is required." });
    }

    try {
      const expense = await this.service.getById(expenseId);

      if (expense) {
        res.status(200).json({ success: true, data: expense });
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
    } catch {
      res.status(500).json({ message: "Failed to get expense" });
    }
  };

  getExpenseByAreaId = async (req: Request, res: Response) => {
    const token = req.headers["authorization"] || "";

    try {
      const expenses = await this.service.getByAreaId(token);
      res.status(200).json({ success: true, data: expenses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to get expenses by area" });
    }
  };

  addExpense = async (req: Request, res: Response) => {
    const expenseDto: ExpenseRequest = req.body;

    if (
      !expenseDto.departmentId ||
      !expenseDto.description ||
      !expenseDto.category ||
      !expenseDto.amount
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const response = await this.service.addExpense(expenseDto);
      res.status(201).json({
        success: response.success,
        message: response.message,
        status: response.data,
      });
    } catch {
      res.status(400).json({ message: "Failed to add the expense" });
    }
  };

  updateExpense = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    const updatedData: ExpenseRequest = req.body;

    if (!id) {
      return res.status(400).json({ message: "Expense ID is required." });
    }
    //este es para testear que haya al menos un campo a actualizar
    if (Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({ message: "No fields provided for update." });
    }

    try {
      const success = await this.service.updateExpense(id, updatedData);

      if (success) {
        res.status(200).json({
          success: success.success,
          data: success.data,
          message: success.message,
        });
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to update expense" });
    }
  };

  deleteExpense = async (req: Request, res: Response) => {
    const id: string | undefined = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Expense ID is required." });
    }

    try {
      const result = await this.service.deleteExpense(id);

      if (result) {
        res.status(200).json({
          success: result.success,
          message: "Expense deleted successfully",
        });
      } else {
        res.status(404).json({ message: "Expense not found" });
      }
    } catch {
      res.status(400).json({ message: "Failed to delete expense" });
    }
  };
}
