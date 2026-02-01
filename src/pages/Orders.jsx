import { useMemo, useState } from "react";
import { ClipboardList, MessageCircle, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Orders({ orders, sendWhatsApp, finishOrder }) {
  const [activeTab, setActiveTab] = useState("pending");

  const normalizedOrders = useMemo(
    () =>
      orders.map((o) => ({
        ...o,
        status: o.status || "Pendente",
      })),
    [orders]
  );

  const pendingOrders = normalizedOrders.filter(
    (o) => o.status !== "Finalizado"
  );
  const finishedOrders = normalizedOrders.filter(
    (o) => o.status === "Finalizado"
  );

  const visibleOrders =
    activeTab === "pending" ? pendingOrders : finishedOrders;

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
            activeTab === "pending"
              ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Pendentes ({pendingOrders.length})
        </button>
        <button
          onClick={() => setActiveTab("finished")}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
            activeTab === "finished"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Finalizados ({finishedOrders.length})
        </button>
      </div>

      {visibleOrders.map((o) => (
        <div
          key={o.id}
          className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-800">Pedido #{o.id}</p>
              <p className="text-xs text-slate-400">
                {o.date} â€¢ {o.supplierName}
              </p>
              <div className="mt-2">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                    o.status === "Finalizado"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {o.status === "Finalizado" ? (
                    <CheckCircle2 size={12} />
                  ) : null}
                  {o.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">
                Total
              </p>
              <p className="font-bold text-indigo-600">
                {formatCurrency(o.total)}
              </p>
            </div>
            <button
              onClick={() => sendWhatsApp(o)}
              className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-sm"
            >
              <MessageCircle size={18} /> Enviar WhatsApp
            </button>
            <button
              onClick={() => finishOrder(o.id)}
              disabled={o.status === "Finalizado"}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm ${
                o.status === "Finalizado"
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }`}
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      ))}

      {visibleOrders.length === 0 && (
        <p className="text-center py-20 text-slate-400">
          {activeTab === "pending"
            ? "Nenhum pedido pendente."
            : "Nenhum pedido finalizado."}
        </p>
      )}
    </div>
  );
}
