import { User } from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access Denied! You Are Not Admin " });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
