import { Router } from "express";
import { getAllProduct, productCreate,updateProduct } from "../controllers/productController.js";


const productRoute = Router();


productRoute.get("/all", getAllProduct)
productRoute.post("/create" , productCreate)
productRoute.put("/update/:id", updateProduct)

export default productRoute;