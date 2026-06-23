import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Video, ImageIcon, Zap, CaseUpper } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";
import Message from "../layout/Message";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "All Product",
    enum: "All Assets",
    icon: <Home className="w-5 h-5 mr-3" />,
  },
  {
    name: "4K CC Presets",
    enum: "4K CC",
    icon: <Video className="w-5 h-5 mr-3" />,
  },
  { name: "Assets", enum: "Assets", icon: <Zap className="w-5 h-5 mr-3" /> },
  {
    name: "Thumbnail Preset",
    enum: "Preset",
    icon: <ImageIcon className="w-5 h-5 mr-3" />,
  },
  {
    name: "Text Animation",
    enum: "Text",
    icon: <CaseUpper className="w-5 h-5 mr-3" />,
  },
];

const API_URL = import.meta.env.VITE_API_URL;

export default function Product() {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Product");
  const [searchQuery, setSearchQuery] = useState("");
  
  // UPI Popup-க்காக புதுசா சேர்த்த States
  const [showUPI, setShowUPI] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/product/all`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // UPI Popup ஓபன் பண்ணும் பங்க்ஷன்
  const handlePayment = (item) => {
    setSelectedItem(item);
    setShowUPI(true); 
  };

  const filteredProducts = product.filter((item) => {
    const activeEnum = categories.find(
      (c) => c.name === selectedCategory,
    )?.enum;
    const matchCategory =
      selectedCategory === "All Product" ||
      item.category === activeEnum ||
      item.enum === activeEnum;
    const safeName = item?.name || "";
    const matchSearch = safeName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <main className="min-h-screen w-full bg-black text-white p-6 md:p-12 lg:p-16 selection:bg-cyan-500/30 flex flex-col items-center relative">
      <header className="w-full max-w-4xl text-center mb-16 mt-8">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          KALAI CREATIVE STUDIO{" "}
          <Link to={"/admin/upload-files"}>
            <span className="text-zinc-400 text-3xl">
              {" "}
              v <span className="text-md">1.0.1</span>
            </span>
          </Link>
        </h1>
        <p className="text-zinc-400 text-sm md:text-lg font-medium tracking-wide">
          Premium Editing Assets & Professional CC Presets
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search assets (e.g. 4K CC) ..."
            className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-md w-full sm:w-72 focus:outline-none focus:border-cyan-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px] bg-zinc-900 border-zinc-800 text-white">
              <SelectValue placeholder="All product" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
              {categories.map((cat, i) => (
                <SelectItem
                  key={i}
                  value={cat.name}
                  className="hover:bg-zinc-800 cursor-pointer"
                >
                  <div className="flex items-center">
                    {cat.icon}
                    {cat.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Card
              key={item._id}
              className="bg-zinc-950 border-zinc-800 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden group flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-3 left-3 bg-cyan-600 text-white border-none px-3 py-1 font-bold">
                  {item.category || item.enum}
                </Badge>
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

              <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-zinc-900 pt-6 mt-2 bg-zinc-900/20 gap-5">
                {/* Price Section */}
                <div className="flex flex-col w-full sm:w-auto text-left">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                    Investment
                  </span>
                  <span className="text-3xl font-black text-white italic leading-none mt-1">
                    ₹{item.price}
                  </span>
                </div>

                {/* Buttons Section */}
                <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                  {item.youtubeLink && (
                    <a
                      href={item.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-red-600 hover:bg-white hover:text-red-600 text-white font-bold h-12 w-14 sm:w-auto sm:px-2 rounded-xl shadow-lg transform active:scale-95 transition-all shrink-0"
                      title="Watch Preview on YouTube"
                    >
                      <Video className="w-5 h-5 sm:mr-2" />
                      <span className="hidden sm:block">Preview</span>
                    </a>
                  )}

                  <Button
                    onClick={() => handlePayment(item)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-black h-12 md:mx-auto flex-1 sm:flex-none sm:w-auto px-6 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transform active:scale-95 transition-all text-sm sm:text-base tracking-wide"
                  >
                    BUY NOW
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center py-20 text-zinc-500">
            No products found in this category.
          </p>
        )}
      </section>

      <Message />

      <footer className="mt-20 text-center text-zinc-600 text-xs font-medium tracking-tighter uppercase mb-6">
        Built with ❤️ for Editors by Kalai Editz
      </footer>

      {/* --- UPI Payment Modal Start --- */}
      {showUPI && selectedItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-2xl max-w-sm w-full text-center relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowUPI(false)} 
              className="absolute top-4 right-4 text-zinc-500 hover:text-white font-bold text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-white mb-2">Scan & Pay</h2>
            <p className="text-zinc-400 text-sm mb-6">Pay via GPay, PhonePe, or Paytm</p>

            {/* Auto Generated QR Code */}
            <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=YOUR_UPI_ID@bank&pn=Kalai%20Creative%20Studio&am=${selectedItem.price}&cu=INR`} 
                alt="UPI QR Code" 
                className="w-48 h-48"
              />
            </div>

            <div className="text-3xl font-black text-cyan-400 mb-6 italic">
              ₹{selectedItem.price}
            </div>

            {/* Mobile UPI App Button */}
            <a
              href={`upi://pay?pa=iamsingle126@oksbi&pn=Kalai%20Creative%20Studio&am=${selectedItem.price}&cu=INR`}
              className="flex items-center justify-center w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl mb-4 transform active:scale-95 transition-all"
            >
              <Zap className="w-5 h-5 mr-2" />
              PAY VIA UPI APP
            </a>

            <div className="border-t border-zinc-800 pt-4 mt-2">
              <p className="text-xs text-zinc-500 mb-2">
                After successful payment, send the screenshot to get your assets immediately.
              </p>
              <a 
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE_NUMBER}?text=Hi Kalai, I just paid ₹${selectedItem.price} for the ${selectedItem.name}. Here is my screenshot!`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 font-bold text-sm hover:underline"
              >
                Click here to WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}  
      {/* --- UPI Payment Modal End --- */}

    </main>
  );
}