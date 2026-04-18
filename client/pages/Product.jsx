import axios from 'axios';
import { useEffect ,useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"

export default function Product(){

  const [product, setProduct] =useState([])

  useEffect(()=>{

     const getData= async () =>{

        try {
            const res = await axios.get("http://localhost:7000/api/product/all")
            setProduct(res.data.data)
        } catch (error) {
            console.error("Error",error);
            
        }
     }
     getData()
  },[])


    return(
        <>
       <div className="min-h-screen bg-black text-white p-6 md:p-16 selection:bg-cyan-500/30">
      
        
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
          KALAI CREATIVE STUDIO
        </h1>
        <p className="text-zinc-400 text-lg font-medium tracking-wide">
          Premium Editing Assets & Professional CC Presets
        </p>
      </div>

      {/* Grid Alignment: Inga thaan mass-aana magic irukku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto items-stretch">
        {product.map((item) => (
          <Card key={item._id} className="bg-zinc-950 border-zinc-800 hover:border-cyan-500/40 transition-all duration-500 shadow-2xl overflow-hidden group flex flex-col">
            
            {/* Aspect Video Image */}
            <div className="aspect-video overflow-hidden relative">
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                alt={item.name} 
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-cyan-600 text-white border-none px-3 py-1 font-bold">
                  {item.category}
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
                <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Investment</span>
                <span className="text-3xl font-black text-white italic">₹{item.price}</span>
              </div>
              <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black h-12 px-8 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transform active:scale-95 transition-all">
                BUY NOW
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Footer Branding */}
      <div className="mt-20 text-center text-zinc-600 text-xs font-medium tracking-tighter uppercase">
        Built with ❤️ for Editors by Kalai Editz
      </div>
    </div>
        </>
    )
}
