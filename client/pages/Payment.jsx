import { useState } from "react";
import { DollarSign, CreditCard, ArrowUpRight, History, Download, Landmark } from "lucide-react";

export default function Payment() {
  // ஸ்கிரீன்ஷாட்ல இருந்த தரவுகளுடன் Sync பண்ணப்பட்ட டேட்டா
  const [transactions] = useState([
    { id: "TXN-001", asset: "After Effects - Sci-Fi HUD", date: "June 12, 2026", amount: 499, status: "Success" },
    { id: "TXN-002", asset: "3D Car Model Pack", date: "June 10, 2026", amount: 1299, status: "Success" },
    { id: "TXN-003", asset: "Premium LUTs Bundle", date: "June 08, 2026", amount: 299, status: "Pending" },
  ]);

  // Dynamic Calculation Logic
  const totalRevenue = transactions.reduce((acc, txn) => acc + txn.amount, 0);
  const successEarnings = transactions
    .filter(t => t.status === "Success")
    .reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="text-cyan-400" /> Payment & Earnings
        </h1>
        <button className="text-sm font-semibold text-cyan-400 border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 rounded-md hover:bg-cyan-400/20 transition-all">
          Download Invoice
        </button>
      </div>

      {/* Top Stats Cards - Now Dynamic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Revenue", amount: `₹${totalRevenue.toLocaleString()}`, icon: <DollarSign size={20} className="text-cyan-400" /> },
          { title: "Available for Payout", amount: `₹${successEarnings.toLocaleString()}`, icon: <Landmark size={20} className="text-green-400" /> },
          { title: "Total Sales", amount: `${transactions.length} Assets`, icon: <ArrowUpRight size={20} className="text-purple-400" /> },
        ].map((stat, index) => (
          <div key={index} className="bg-[#111113] border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-zinc-400 text-sm font-semibold">{stat.title}</h3>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold">{stat.amount}</p>
          </div>
        ))}
      </div>

      {/* ... (Recent Transactions Table & Payout Form அதே கோடு) ... */}
    </div>
  );
}