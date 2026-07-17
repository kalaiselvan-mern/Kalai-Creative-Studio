import { useState } from "react";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; 
import { useForm } from 'react-hook-form';

export default function Collab() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [result, setResult] = useState("");

  const onSubmit = async (data) => {
    setResult("Sending ⌛");

    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const resData = await response.json();
      if (resData.success) {
        setResult("Message Send Successfully 🔥");
        reset();
      } else {
        setResult("Something Went Error 🛑");
      }
    } catch (error) {
      setResult("Error Sending Message ❌");
    }
  };

  const socialLinks = [
    { id: 1, icon: <FaGithub size={22} />, url: "https://github.com/KalaiCodex", neon: "border-gray-500 text-white" },
    { id: 2, icon: <FaLinkedin size={22} />, url: "https://www.linkedin.com/in/kalai-kalai", neon: "border-blue-500 text-blue-400" },
    { id: 3, icon: <FaFacebook size={22} />, url: "https://www.facebook.com/share/18WvAZ15YF/", neon: "border-blue-700 text-blue-500" },
    { id: 4, icon: <FaInstagram size={22} />, url: "https://www.instagram.com/chellakutty_kalai?igsh=ZzZ4ZmVyc2JoMnBz", neon: "border-pink-500 text-pink-400" },
    { id: 5, icon: <FaWhatsapp size={22} />, url: "https://wa.me/919344147003", neon: "border-green-500 text-green-400" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-20 relative overflow-hidden text-white">
      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-900/20 blur-[120px] rounded-full"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl z-10">
        
        {/* Left Side: Contact Information */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
           
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Let's Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">magic</span> together! 🚀
            </h2>
          
            <p className="text-gray-400 capitalize text-lg leading-relaxed">
              You are preset to sale  please you can contact to me ❤️😍
            </p>
            
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-5">
              
              <div className="w-12 h-12 bg-gray-900 border  border-cyan-500/30 text-cyan-400 flex items-center justify-center rounded-2xl shadow-cyan-500/20">
                <FaEnvelope size={20} />
              </div>
              <div>
                
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email Me</p>
                <p className="text-gray-200 font-semibold text-lg">kalaiedits007@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <a key={social.id} href={social.url} target="_blank" rel="noreferrer" className={`p-2.5 md:p-5 rounded-xl border ${social.neon} bg-gray-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_currentColor]`}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#111111] p-8 rounded-2xl border border-white/5 shadow-inner">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Name</label>
              <input {...register("name", { required: "Name Is Required" })} type="text" placeholder="Ex: John Doe" className="w-full bg-[#0a0a0a] text-white px-5 py-4 rounded-xl border border-gray-800 focus:border-cyan-500 outline-none transition" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
    

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Your Mobile</label>
              <input {...register("mobile", { required: "Mobile No Is Required" })} type="text" placeholder="+91 9876543210" className="w-full bg-[#0a0a0a] text-white px-5 py-4 rounded-xl border border-gray-800 focus:border-cyan-500 outline-none transition" />
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Message</label>
              <textarea {...register("message", { required: "Please Enter A Message" })} rows="4" placeholder="Adobe Or Davinci Reslove?" className="w-full bg-[#0a0a0a] text-white px-5 py-4 rounded-xl border border-gray-800 focus:border-cyan-500 outline-none transition resize-none" />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all transform active:scale-95">
              Send Message ✨
            </button>
            <p className="text-center text-sm text-cyan-500 font-medium mt-2">{result}</p>
          </form>
        </div>
      </div>
    </div>
  );
} 