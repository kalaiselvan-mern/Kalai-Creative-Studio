import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/user.js'; 

const client = new OAuth2Client("12795157590-610td72e50pq3avr2i7b3940ijhokmdd.apps.googleusercontent.com");  // Google OAuth URl

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    //  Google Server Check Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "12795157590-610td72e50pq3avr2i7b3940ijhokmdd.apps.googleusercontent.com",
    });
    
    //  Token Checking 
    const payload = ticket.getPayload();
    const { name, email, picture, sub } = payload;

    // Check DataBase Already Gmail Login OR Not !
    let user = await User.findOne({ email });

    //  NEw Gmail New Login
    if (!user) {
      const userRole = email === process.env.ADMIN_EMAIL ? "admin" : "user";
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        role:userRole
      });
      console.log( `${userRole} Login SuccessFully🎉`);
      
      // PRO TIP: Inga thaan namma NodeMailer "Welcome Mail" logic poodanum!
    }

      // Response send to frontend
    res.status(200).json({ 
        success: true, 
        message: "Login done!", 
        user 
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Google verification failed mapla!" });
  }
};