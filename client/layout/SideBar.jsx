import { Menu, Home, Image as ImageIcon, Video, MonitorPlay, Zap } from "lucide-react"


export function Sidebar() {
  const categories = [
    { name: "All Assets", icon: <Home className="w-5 h-5 mr-3" /> },
    { name: "4K CC Presets", icon: <Video className="w-5 h-5 mr-3" /> },
    { name: "LUTs & Color", icon: <ImageIcon className="w-5 h-5 mr-3" /> },
    { name: "VFX Overlays", icon: <Zap className="w-5 h-5 mr-3" /> },
    { name: "Plugins", icon: <MonitorPlay className="w-5 h-5 mr-3" /> },
  ];

  return (
    <Sheet>
      {/* 1. Hamburger Menu Button (Trigger) */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="border-zinc-800 hover:bg-zinc-800">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      
      {/* 2. Sliding Sidebar Content */}
      <SheetContent side="left" className="w-[300px] bg-zinc-950 border-r border-zinc-900 text-white">
        <SheetHeader className="text-left mb-8">
          <SheetTitle className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            KALAI STUDIO
          </SheetTitle>
          <SheetDescription className="text-zinc-500">
            Explore premium editing assets.
          </SheetDescription>
        </SheetHeader>

        {/* 3. Categories List */}
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 px-4">
            Categories
          </h3>
          
          {categories.map((cat, index) => (
            <Button 
              key={index} 
              variant="ghost" 
              className="justify-start text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg px-4 py-6"
            >
              {cat.icon}
              {cat.name}
            </Button>
          ))}
        </div>

        {/* Footer Area of Sidebar */}
        <div className="absolute bottom-8 left-6">
          <p className="text-xs text-zinc-600 font-medium">
            © 2026 Kalai Editz.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
}