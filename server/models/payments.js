import mongoose, { model } from "mongoose";
import { User } from "./user";

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true, // Razorpay first generate ID
  },
  razorpayPaymentId: {
    type: String,
  },
  razorpaySignature: {
    type: String,
  },paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending", 
    },
},{timestamps:true});

export const Payment = model("Payment" , paymentSchema)