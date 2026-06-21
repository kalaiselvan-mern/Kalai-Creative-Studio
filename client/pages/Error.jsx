import { useNavigate } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi"; 


export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gradient-to-r from-cyan-700 to-gray h-screen items-center justify-center  text-center p-6">
      
      {/*  Icon _ Description  */}
      <div className="text-[#5eead4] text-7xl mb-4">
        <FiAlertTriangle className="inline-block" />
      </div>
      <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-2">
        404
      </h1>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Oops! Page Not Found 🕵️‍♂️
      </h2>
      
      <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
       The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      
      {/* Return DashBoard */}
      <button 
        onClick={() => navigate('/')} 
        className="px-8 py-3 bg-teal-500 text-[#0f1115] font-bold rounded-lg hover:bg-teal-400 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(94,234,212,0.4)]"
      >
        Take Me Home 🚀
      </button>

    </div>
  );
}