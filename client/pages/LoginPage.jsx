import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function LoginPage() {
  
  const handleSuccess = async (credentialResponse) => {
    // 1. Google unakku oru secret 'Token' tharum
    const token = credentialResponse.credential;
    console.log("Google Token Kedaichuduchu!");

    try {
      // 2. Antha token-a namma Backend-ku anuppurom
      const res = await axios.post("http://localhost:7000/api/auth/google", { token });
      
      console.log("Backend Success Mapla:", res.data);
      alert("Login Success! 🎉 Welcome to Kalai Studio!");
      
      // Zustand illana LocalStorage-la user data-va save pannikkalam
      // localStorage.setItem("user", JSON.stringify(res.data.user));

    } catch (error) {
      console.error("Backend Error:", error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      {/* Ithu automatic-aana Google Button design! Namma thottu kooda paakka thevailla */}
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed Mapla!')}
        theme="filled_black" // Dark mode-ku set aagum
      />
    </div>
  );
}