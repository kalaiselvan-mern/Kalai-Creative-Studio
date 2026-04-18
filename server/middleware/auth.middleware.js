import { User } from "../models/user.model.js";

// 1. Admin thaan varraana nu check pandra guard
export const isAdmin = async (req, res, next) => {
  try {
    // Frontend la irunthu user ID varum (Request body illana Token valiya)
    const userId = req.body.userId; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied! You Are Not Admin " });
    }

    // Ellam correct-na, adhutha velaiya paakka vidu
    next(); 
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};