import { ShoppingCart, LayoutDashboard, Package, History, PlusCircle } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, cartLength }) {
  const menu = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'inventory', icon: Package, label: 'Estoque / Compras' },
    { id: 'orders', icon: History, label: 'Pedidos Realizados' },
    { id: 'register', icon: PlusCircle, label: 'Cadastros' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-20 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <ShoppingCart size={20} />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">MercadoSys</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all font-medium ${
              activeTab === item.id
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      {cartLength > 0 && (
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('cart')}
            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
          >
            <ShoppingCart size={18} />
            Lista de Pedido ({cartLength})
          </button>
        </div>
      )}
    </aside>
  );
}
