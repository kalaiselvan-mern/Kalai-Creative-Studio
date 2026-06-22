import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js"
import router from "./routes/productRoute.js";

import authRoute from "./routes/authRoute.js";

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

app.use("/api/product", router);
app.use("/api/auth", authRoute  );

app.get("/api",(req,res)=>{
  res.send({
    name:"Kalai-Creative-Studio"
  })
})

app.listen(PORT,()=>{
 console.log(`Server Is Run Smoothly",http://localhost:${PORT}`)
})