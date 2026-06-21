import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Store, UploadCloud, Wallet, Heart, Package, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  
  const role = user?.role || "admin";

  // 🔴 ADMIN LINKS
  const adminLinks = [
    { name: "Store", icon: Store, to: "/" },
    { name: "Upload Files", icon: UploadCloud, to: "/admin/upload-files" },
  ];

  // 🔵 USER LINKS
  const userLinks = [
    { name: "Store", icon: Store, to: "/" },
    { name: "Purchased", icon: Package, to: "/user/orders" },
    { name: "Join Studio Partner", icon: Heart, to: "/user/joinstudio" },
  ];

  const navItems = role === "admin" ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* 📱 MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-zinc-900 text-cyan-400 rounded-md border border-cyan-500/30 hover:bg-cyan-950/50 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* 📱 MOBILE BACKDROP */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 🖥️ THE SIDEBAR */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 h-screen w-64 bg-zinc-950 text-white flex flex-col p-5 border-r border-zinc-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        
        {/* BRAND LOGO */}
        <div className="mb-8 flex justify-between items-center">
          <Link to="/" className="text-center cursor-pointer">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              KALAI 
            </h1>
            <p className="text-sm text-blue-400/80 font-bold tracking-wider">
              CREATIVE STUDIO {role === "admin" && <span className="text-cyan-300 ml-1">(ADMIN)</span>}
            </p>
          </Link>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-cyan-500 hover:text-cyan-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* DYNAMIC NAV LINKS */}
        <nav className="flex-1 space-y-2 mt-4">
          {navItems.map(({ name, icon: Icon, to }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={name}
                to={to}
                onClick={() => setIsOpen(false)} 
                className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-cyan-600/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]" 
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-blue-300"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} /> 
                {name}
              </Link>
            );
          })}
        </nav>

        {/* USER PROFILE & LOGOUT */}
        <div className="mt-auto pt-4 border-t border-zinc-800/80 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-cyan-500/20">
              {user ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-zinc-200 truncate w-20">
                {user?.name || "Guest"}
              </span>
              <span className="text-[10px] text-cyan-500 uppercase font-semibold">
                {role}
              </span>
            </div>
          </div>
          
          <button onClick={handleLogout} className="text-zinc-500 hover:text-cyan-400 hover:bg-cyan-500/10 p-2 rounded-md transition-all cursor-pointer">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

      </aside>
    </>
  );
}