import { ClipboardList, MessageCircle } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders({ orders, sendWhatsApp }) {
  return (
    <div className="space-y-4 animate-in fade-in">
      {orders.map(o => (
        <div key={o.id} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Pedido #{o.id}</p>
              <p className="text-xs text-slate-400">{o.date} • {o.supplierName}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">Total</p>
              <p className="font-bold text-indigo-600">{formatCurrency(o.total)}</p>
            </div>
            <button
              onClick={() => sendWhatsApp(o)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-sm"
            >
              <MessageCircle size={18} /> Enviar WhatsApp
            </button>
          </div>
        </div>
      ))}

      {orders.length === 0 && (
        <p className="text-center py-20 text-slate-400">Nenhum pedido no histórico.</p>
      )}
    </div>
  );
}
