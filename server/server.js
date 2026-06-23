import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js"
import ProductRoute from "./routes/productRoute.js";
import PaymentRoute from "./routes/paymentRoute.js";


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
app.use("/api/payment" , PaymentRoute);


app.get("/api",(req,res)=>{
  res.send({
    name:"Kalai-Creative-Studio",
    admin:"Kalai",
    message: "follow me on instagram @kalai_editzz"
  })
})

app.listen(PORT,()=>{
 console.log(`Server Is Run Smoothly",http://localhost:${PORT}`)
})