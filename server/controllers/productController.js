import Product from "../models/product.js";

export const productCreate = async (req ,res) =>{
 try {
     const { name, description, price, imageUrl, downloadUrl, category, isPremium } = req.body;
     const newProduct = await Product.create({
        name,
        description,price,imageUrl,downloadUrl,category,isPremium
         });

    res.status(201).json({message: " New data Added" , data :newProduct })
 } catch (error) {
     console.error("Product Create Error" , {error})
     res.status(500).json({message:error.message})
 }
}


export const getAllProduct =async (req ,res ) =>{
   try {
     const product = await Product.find();
      
     res.status(200).json({
      success:true,
      message:"SuccessFully  getAllProduct ❤️",
    data:product
       })

   } catch (error) {
     console.error("data not found " ,{error});
     req.status(500).json({success:false,message:error.message})
     
   } 

}