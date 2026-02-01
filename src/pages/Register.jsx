import { PlusCircle, Users } from "lucide-react";

export default function Register({
  suppliers,
  newProduct, setNewProduct, handleAddProduct,
  newSupplier, setNewSupplier, handleAddSupplier,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in">
      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <PlusCircle size={18} className="text-indigo-600" /> Novo Produto
        </h3>

        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            required
            className="w-full p-2 border rounded-lg bg-slate-50 outline-none focus:border-indigo-400 transition-all"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />

          <select
            required
            className="w-full p-2 border rounded-lg bg-slate-50 outline-none"
            value={newProduct.supplierId}
            onChange={e => setNewProduct({ ...newProduct, supplierId: e.target.value })}
          >
            <option value="">Selecione o Fornecedor...</option>
            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Custo R$"
              required
              className="w-full p-2 border rounded-lg bg-slate-50 outline-none"
              value={newProduct.cost}
              onChange={e => setNewProduct({ ...newProduct, cost: e.target.value })}
            />
            <input
              type="number"
              placeholder="Estoque Inicial"
              required
              className="w-full p-2 border rounded-lg bg-slate-50 outline-none"
              value={newProduct.stock}
              onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </div>

          <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold hover:bg-black transition-colors">
            Cadastrar
          </button>
        </form>
      </section>

      <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Users size={18} className="text-indigo-600" /> Novo Fornecedor
        </h3>

        <form onSubmit={handleAddSupplier} className="space-y-4">
          <input
            type="text"
            placeholder="Nome da Empresa"
            required
            className="w-full p-2 border rounded-lg bg-slate-50 outline-none"
            value={newSupplier.name}
            onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="WhatsApp (ex: 11999999999)"
            required
            className="w-full p-2 border rounded-lg bg-slate-50 outline-none"
            value={newSupplier.contato}
            onChange={e => setNewSupplier({ ...newSupplier, contato: e.target.value })}
          />

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
            Cadastrar
          </button>
        </form>
      </section>
    </div>
  );
}
