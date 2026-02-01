import { Plus } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Inventory({ products, addToCart }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-in fade-in">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Produto</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Estoque</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Custo</th>
            <th className="p-4 text-xs font-bold text-slate-500 uppercase">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-sm">
          {products.map(p => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="p-4 font-bold text-slate-700">{p.name}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-md font-bold ${p.stock <= p.minStock ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                  {p.stock} un
                </span>
              </td>
              <td className="p-4 text-slate-600 font-medium">{formatCurrency(p.cost)}</td>
              <td className="p-4">
                <button onClick={() => addToCart(p)} className="flex items-center gap-1 text-indigo-600 font-bold hover:underline">
                  <Plus size={16} /> Comprar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
