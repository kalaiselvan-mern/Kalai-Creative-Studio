import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore.js'; 
import { useNavigate } from 'react-router-dom'; // 1. Page maatha ithu thevai!

export default function LoginPage() {
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // 2. Navigate hook initialize pandrom

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("Google Token Kedaichuduchu!");

    try {
      // 3. Backend API Call
      const res = await axios.post("http://localhost:7000/api/auth/google", { token });
      
      console.log("Backend Success Mapla:", res.data);
      
      // 4. THE FIX: Zustand Store-la direct-a save pandrom! 
      // (Nee thaniya function ezhuthunatha inga direct-a kondu vanthachu)
      login(res.data.user, res.data.token);

      // 5. Success Message
      alert("Login Success! 🎉 Welcome to Kalai Studio!");

      // 6. Login aanathum direct-a E-commerce dashboard-ku anuppidrom
      navigate("/");

    } catch (error) {
      console.error("Backend Error:", error);
      alert("Oops! Backend error mapla. Server on-la irukka nu check pannu.");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      {/* Chinna UI upgrade: Mela un brand name iruntha innum gettha irukkum */}
      <h1 className="text-4xl font-black text-transparent text-center wrap-anywhere bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
        KALAI CREATIVE STUDIO
      </h1>
      
      <GoogleLogin 
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed!')}
        theme="filled_black" 
      />
    </div>
  );
}   