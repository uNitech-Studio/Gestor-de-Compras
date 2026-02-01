import { Package, Users, AlertTriangle } from "lucide-react";
import StatCard from "../components/ui/Statcard";

export default function Dashboard({ products, suppliers }) {
  const urgentCount = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Itens no Catálogo" value={products.length} subtext="Total cadastrado" icon={Package} colorClass="text-indigo-600" />
        <StatCard title="Fornecedores" value={suppliers.length} subtext="Parceiros ativos" icon={Users} colorClass="text-slate-600" />
        <StatCard title="Reposição Urgente" value={urgentCount} subtext="Abaixo do mínimo" icon={AlertTriangle} colorClass="text-red-600" />
      </div>
    </div>
  );
}
