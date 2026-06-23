import express from "express";
import { createPayment } from "../controllers/paymentController.js";

const paymentRoute = express.Router();

paymentRoute.post("/checkout", createPayment);

export default paymentRoute;