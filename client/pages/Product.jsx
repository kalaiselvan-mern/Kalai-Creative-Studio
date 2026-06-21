import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Video, ImageIcon, Zap, CaseUpper } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import Message from "../layout/Message";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "All Product", enum: "All Assets", icon: <Home className="w-5 h-5 mr-3" /> },
    { name: "4K CC Presets", enum: "4K CC", icon: <Video className="w-5 h-5 mr-3" /> },
    { name: "Assets", enum: "Assets", icon: <Zap className="w-5 h-5 mr-3" /> },
    { name: "Thumbnail Preset", enum: "Preset", icon: <ImageIcon className="w-5 h-5 mr-3" /> },
    { name: "Text Animation", enum: "Text", icon: <CaseUpper className="w-5 h-5 mr-3" /> },
  ];
const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/product/all`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getData();
  }, []);

  const filteredProducts = product.filter((item) => {
    let matchCategory = true;
    if (selectedCategory !== "All Product") {
      const activeCategory = categories.find((c) => c.name === selectedCategory);
      matchCategory =
        item.category === activeCategory?.enum || item.enum === activeCategory?.enum;
    }
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    /* 1. SINGLE MAIN WRAPPER (h-screen தூக்கிட்டு min-h-screen & w-full போட்டாச்சு) */
    <div className="min-h-screen w-full bg-black text-white p-6 md:p-12 lg:p-16 selection:bg-cyan-500/30 flex flex-col items-center">
      
      {/* 2. HEADER SECTION (Title + Search + Filter) */}
      <div className="w-full max-w-4xl text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          KALAI CREATIVE STUDIO   
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg font-medium tracking-wide">
          Premium Editing Assets & Professional CC Presets
        </p>

        {/* 3. CONTROLS (Search & Select in one line for Desktop, Stacked for Mobile) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search assets (e.g. 4K CC) ..."
            className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-md w-full sm:w-72 focus:outline-none focus:border-cyan-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-full sm:w-[200px] bg-zinc-900 border-zinc-800 text-white">
              <SelectValue placeholder="All product" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {categories.map((cat, i) => (
                <SelectItem key={i} value={cat.name} className="hover:bg-zinc-800 cursor-pointer">
                  <div className="flex items-center">
                    {cat.icon}
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 4. PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredProducts.map((item) => (
          <Card
            key={item._id}
            className="bg-zinc-950 border-zinc-800 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden group flex flex-col"
          >
            <div className="aspect-video overflow-hidden relative">
              <img
                src={item.imageUrl}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt={item.name}
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-cyan-600 text-white border-none px-3 py-1 font-bold">
                  {item.category || item.enum}
                </Badge>
              </div>
            </div>

            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {item.name}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <CardDescription className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                {item.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="flex justify-between items-center border-t border-zinc-900 pt-6 mt-2 bg-zinc-900/20">
              <div className="flex flex-col">
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                  Investment
                </span>
                <span className="text-3xl font-black text-white italic">
                  ₹{item.price}
                </span>
              </div>
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transform active:scale-95 transition-all">
                BUY NOW
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center py-20 text-zinc-500">
            No products found in this category.
          </div>
        )}
      </div>
         <Message/>

      {/* 5. FOOTER BRANDING */}
      <div className="mt-20 text-center text-zinc-600 text-xs font-medium tracking-tighter uppercase">
        Built with ❤️ for Editors by Kalai Editz
      </div>

    </div>
  );
}