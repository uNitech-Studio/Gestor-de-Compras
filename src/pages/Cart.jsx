import { Trash2, Send } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Cart({ cart, setCart, finalizeOrder }) {
  const total = cart.reduce((acc, i) => acc + (i.cost * i.quantity), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in">
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold text-slate-600">Item</th>
                <th className="p-4 font-bold text-slate-600 text-center">Qtd</th>
                <th className="p-4 font-bold text-slate-600 text-right">Subtotal</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cart.map(item => (
                <tr key={item.id}>
                  <td className="p-4 font-bold text-slate-700">{item.name}</td>
                  <td className="p-4 text-center">
                    <input
                      type="number"
                      className="w-16 p-1 border rounded text-center"
                      value={item.quantity}
                      onChange={e => {
                        const v = parseInt(e.target.value);
                        if (v > 0) setCart(cart.map(i => i.id === item.id ? { ...i, quantity: v } : i));
                      }}
                    />
                  </td>
                  <td className="p-4 text-right font-bold text-slate-700">{formatCurrency(item.cost * item.quantity)}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => setCart(cart.filter(i => i.id !== item.id))} className="text-red-300 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 h-fit space-y-6">
        <h3 className="font-bold text-slate-800 border-b pb-4">Resumo do Pedido</h3>
        <div className="flex justify-between text-lg font-bold text-indigo-700">
          <span>Total Estimado:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <button onClick={finalizeOrder} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 flex items-center justify-center gap-2">
          <Send size={18} /> Gerar Ordem de Compra
        </button>
      </div>
    </div>
  );
}
