import { useState } from "react";
import { UploadCloud, Link as LinkIcon, DollarSign, Type, FileText, Tag, Star, Send , House } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UploadForm() {
  // உன்னோட JSON ஸ்ட்ரக்சரை அப்படியே State-ல வச்சிருக்கோம்
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    downloadUrl: "",
    category: "Assets",
    isPremium: true,
  });

  // எல்லா Input-க்கும் ஒரே onChange function
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    });
  };
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

     axios.post(`${API_URL}/api/product/create`, formData)
    alert("Product Uploaded Successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
          <UploadCloud className="w-8 h-8 text-cyan-400" />
          <div>
            <h2 className="text-2xl font-black text-white">Upload New Asset</h2>
            <p className="text-sm text-zinc-500">Add a new preset or plugin to your store</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Name & Price (Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <Type className="w-4 h-4 text-cyan-500" /> Asset Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. After Effect - Plugins"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <DollarSign className="w-4 h-4 text-cyan-500" /> Price (₹)
              </label>
              <input
         
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="499"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* 2. Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
              <FileText className="w-4 h-4 text-cyan-500" /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="100+ After Effect Plugin bundle..."
              rows="3"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              required
            ></textarea>
          </div>

          {/* 3. Image URL & Download URL (Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <LinkIcon className="w-4 h-4 text-cyan-500" /> Image URL (Cloudinary)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://res.cloudinary.com/..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <LinkIcon className="w-4 h-4 text-cyan-500" /> Download URL (Drive)
              </label>
              <input
                type="url"
                name="downloadUrl"
                value={formData.downloadUrl}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                required
              />
            </div>
          </div>

          {/* 4. Category & Premium Toggle (Row) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                <Tag className="w-4 h-4 text-cyan-500" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
              >
                <option value="4K CC">4K CC Presets</option>
                <option value="Assets">Assets</option>
                <option value="Preset">Thumbnail Preset</option>
                <option value="Text">Text Animation</option>
              </select>
            </div>

            {/* Premium Toggle Checkbox */}
            <div className="flex items-center h-[50px] px-4 bg-zinc-900 border border-zinc-800 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer w-full">
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={formData.isPremium}
                  onChange={handleChange}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <span className="flex items-center gap-2 text-white font-bold">
                  <Star className={`w-4 h-4 ${formData.isPremium ? "text-yellow-400 fill-yellow-400" : "text-zinc-500"}`} />
                  Premium Asset
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex justify-center items-center gap-2"
          >
            <Send className="w-5 h-5" />
            PUBLISH ASSET
          </button>

        </form>
           <Link to={"/"}>
            <button className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex justify-center items-center gap-2"
 >
            <House  className="w-5 h-5" />
            Back To Dashboard
          </button>
           </Link>
      </div>
      
    </div>
  );
}