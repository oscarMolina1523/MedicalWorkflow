import express from "express";
import { container } from "tsyringe";
import ExpenseController from "../controllers/expense.controller";

const router = express.Router();
const expenseController = container.resolve(ExpenseController);

router.get("/", expenseController.getExpenses);

router.get("/area", expenseController.getExpenseByAreaId);

router.get("/:id", expenseController.getExpenseById);

router.post("/", expenseController.addExpense);

router.put("/:id", expenseController.updateExpense);

router.delete("/:id", expenseController.deleteExpense);

export default router;