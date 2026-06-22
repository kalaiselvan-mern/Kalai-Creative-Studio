import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const API_URL=import.meta.env.VITE_API_URL;

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const res = await axios.post(
        `${API_URL}/api/auth/google`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      login(res.data.user);

      alert(res.data.user.message);

      if (res.data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/user/joinstudio");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-8">
        KALAI CREATIVE STUDIO
      </h1>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google Login Failed")}
        theme="filled_black"
      />
    </div>
  );
}