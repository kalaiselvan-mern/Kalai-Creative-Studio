import { Router } from "express";
import { getAllProduct, productCreate, } from "../controllers/productController.js";


const router = Router()


router.get("/all" , getAllProduct)
router.post("/create" , productCreate)



export default router;