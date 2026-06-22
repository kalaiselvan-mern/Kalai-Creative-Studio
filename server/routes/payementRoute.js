import { Router } from "express";
import { checkout } from "../controllers/paymentController.js";

const payementRouter = Router();

payementRouter.post("/checkout", checkout);

export default payementRouter;


