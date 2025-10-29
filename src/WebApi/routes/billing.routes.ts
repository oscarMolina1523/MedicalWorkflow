import express from "express";
import { container } from "tsyringe";
import BillingController from "../controllers/billing.controller";

const router = express.Router();
const billingController = container.resolve(BillingController);

router.get("/", billingController.getBillings);

router.get("/area", billingController.getBillingByAreaId);

router.get("/:id", billingController.getBillingById);

router.post("/", billingController.addBilling);

router.put("/:id", billingController.updateBilling);

router.delete("/:id", billingController.deleteBilling);

export default router;