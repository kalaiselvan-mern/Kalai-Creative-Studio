import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom"; 

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); 
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    console.log("Google Token Kedaichuduchu!");

    try {
    
      const res = await axios.post(`${API_URL}/api/auth/google`, { token });

      console.log("Backend Success Mapla:", res.data); 
      login(res.data.user, res.data.token);
      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
      alert("Login Success! 🎉 Welcome to Kalai Studio!");
      navigate("/");
    } catch (error) {
      console.error("Backend Error:", error);
      alert("Oops! Backend error mapla. Server on-la irukka nu check pannu.");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black text-transparent text-center wrap-anywhere bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
        KALAI CREATIVE STUDIO
      </h1>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed!")}
        theme="filled_black"
      />
    </div>
  );
}
