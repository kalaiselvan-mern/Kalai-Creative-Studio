import { MessageCircleMore, X, Send } from "lucide-react";
import { useState } from "react";

export default function Message() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(""); 

  const handleSend = () => {
    if (!message.trim()) return; 

    const phoneNumber = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER; 
    const text = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;

    window.open(whatsappUrl, "_blank");
    setMessage("");
    setOpen(false); 
  };

 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {open && (
        <div className="fixed right-6 bottom-24 w-80 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center text-white">
            <h3 className="font-bold text-sm">Kalai Studio Support</h3>
            <button onClick={() => setOpen(false)} className="hover:text-zinc-300 cursor-pointer">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto text-sm flex flex-col gap-3 bg-zinc-950">
            <div className="bg-zinc-800 p-3 rounded-lg w-3/4 text-zinc-200 shadow-md">
              Hi! How can we help you today?
            </div>
     
          </div>

          <div className="p-3 border-t border-zinc-800 bg-zinc-900 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={handleKeyPress} 
              placeholder="Type a message..."              
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button 
              onClick={handleSend} 
              className="bg-cyan-600 p-2 rounded-full text-white hover:bg-cyan-500 transition-colors cursor-pointer"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setOpen(!open)}
        className="fixed right-6 bottom-6 bg-green-600 text-white p-4 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:scale-110 transition-transform duration-300 z-50 cursor-pointer flex items-center justify-center"
      >
        {open ? <X size={28} /> : <MessageCircleMore size={48} />}
      </button>
    </>
  );
}