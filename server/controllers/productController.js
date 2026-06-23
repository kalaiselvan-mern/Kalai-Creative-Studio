import Product from "../models/product.js";

export const productCreate = async (req, res) => {
  try {
   
    const { name, description, price, imageUrl, downloadUrl, category, isPremium, adminKey, youtubeLink } = req.body;

    
    if (adminKey !== "AdminKalai2005") {
      return res.status(403).json({ success: false, message: "Unauthorised! Only Admin can upload." });
    }

    
    const newProduct = await Product.create({
      name,
      description,
      price,
      imageUrl,
      downloadUrl,
      category,
      isPremium,

      youtubeLink 
    });

    res.status(201).json({ success: true, message: "New Asset Added Successfully! 🔥", data: newProduct });
  } catch (error) {
    console.error("Product Create Error", { error });
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
      
    res.status(200).json({
      success: true,
      message: "Successfully fetched all products ❤️",
      data: product
    });
  } catch (error) {
    console.error("Data not found", { error });
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminKey, ...updateData } = req.body; 

    if (adminKey !== "AdminKalai2005") {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorised! Only Admin can edit products." 
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }
    res.status(200).json({ 
      success: true, 
      message: "Asset Updated Successfully! 🚀", 
      data: updatedProduct 
    });

  } catch (error) {
    console.error("Product Update Error", { error });
    res.status(500).json({ success: false, message: error.message });
  }
};