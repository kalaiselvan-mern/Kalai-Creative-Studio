import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js"
import ProductRoute from "./routes/productRoute.js";


 dotenv.config()

const app = express()
const PORT = process.env.PORT  || 7000

dbConnect()

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Product Data Api Logic 

app.use("/api/product", ProductRoute);

app.get('/', (req, res) => {
    res.status(200).send("Kalai Creative Studio Backend is Running Perfectly! 🚀");
});

app.listen(PORT,()=>{
 console.log(`Server Is Run Smoothly",http://localhost:${PORT}`)
})