import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Store, Heart, Menu, X } from "lucide-react";
import LogoImage from "../assets/Logo.png"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();


  const navItems = [
    { name: "Store", icon: Store, to: "/" },
    { name: "Collab & Earn", icon: Heart, to: "/Collab" },
  ];

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
        
        {/* BRAND LOGO & NAME (Aligned Perfectly) */}
        <div className="mb-8 relative flex flex-col items-center justify-center text-center mt-4">
          
          {/* Mobile Close Button (Absolute positioned) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden absolute -top-4 -right-2 text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo Image & Text */}
          <Link to={"/"} className="flex flex-col items-center cursor-pointer gap-3 group">
            <div className="p-1 border border-zinc-800 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:border-cyan-500/50 transition-colors">
              <img
                src={LogoImage}
                alt="Kalai Creative Studio Logo"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <h1 className="text-xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              KALAI CREATIVE<br />STUDIO
            </h1>
          </Link>
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
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-cyan-400" : "text-zinc-500"
                  }`}
                />
                {name}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM MOTTO */}
        <div className="mt-auto pt-4 border-t border-zinc-800/80 flex flex-col justify-center items-center text-center">
          <h1 className="text-xs text-cyan-500/80 uppercase font-semibold leading-relaxed tracking-wider">
            Affordable Price, <br /> Premium Assets & Quality 😍
          </h1>
        </div>
      </aside>
    </>
  );
}