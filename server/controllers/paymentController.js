import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

// Razorpay Setup
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const checkout = async (req, res) => {
  try {
    const options = {
   
      amount: Number(req.body.amount) * 100, 
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000)}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    res.status(500).json({ 
        success: false, 
        message: "Payment order creation failed!" 
    });
  }
};