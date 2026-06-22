  import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.js";

const client = new OAuth2Client(
 process.env.GOOGLE_CLIENT_ID
); // Google OAuth URl

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;

  
    const expectedRole = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        role: expectedRole,
      });
      console.log(`${expectedRole} Created Successfully 🎉`);
    } else if (user.role !== expectedRole) {
      user.role = expectedRole;
      await user.save();
      console.log(`${email} role updated to ${expectedRole} 🎉`);
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
        avatar: user.avatar,
        message: `${user.role} Login Successfully 🎉`,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res
      .status(400)
      .json({ success: false, message: "Google verification failed 😔" });
  }
};