import { CheckCircle2 } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
      <CheckCircle2 size={20} className="text-emerald-400" />
      <span className="text-sm font-bold">{message}</span>
    </div>
  );
}
