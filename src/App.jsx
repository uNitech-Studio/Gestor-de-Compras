import React, { useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import Toast from "./components/ui/Toast";

import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Register from "./pages/Register";

import { initialProducts, initialSuppliers } from "./data/initialData";
import { formatCurrency } from "./utils/formatCurrency";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [successMessage, setSuccessMessage] = useState("");

  // Dados
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [products, setProducts] = useState(initialProducts);

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Forms
  const [newProduct, setNewProduct] = useState({
    name: "",
    supplierId: "",
    cost: "",
    price: "",
    stock: "",
    minStock: "",
  });

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contato: "",
  });

  const showNotify = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.supplierId) return;

    const productToAdd = {
      ...newProduct,
      id: Date.now(),
      supplierId: parseInt(newProduct.supplierId),
      cost: parseFloat(newProduct.cost) || 0,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock) || 0,
      minStock: parseInt(newProduct.minStock) || 0,
    };

    setProducts([...products, productToAdd]);

    setNewProduct({
      name: "",
      supplierId: "",
      cost: "",
      price: "",
      stock: "",
      minStock: "",
    });

    showNotify("Produto cadastrado!");
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const cleanPhone = newSupplier.contato.replace(/\D/g, "");

    setSuppliers([
      ...suppliers,
      { id: Date.now(), name: newSupplier.name, contato: cleanPhone },
    ]);

    setNewSupplier({ name: "", contato: "" });
    showNotify("Fornecedor cadastrado!");
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showNotify(`${product.name} na lista!`);
  };

  const finalizeOrder = () => {
    if (cart.length === 0) return;

    // (no seu código atual, você assume o supplier do primeiro item)
    const supplierId = cart[0].supplierId;
    const supplier = suppliers.find((s) => s.id === supplierId);

    const order = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString("pt-BR"),
      total: cart.reduce((acc, i) => acc + i.cost * i.quantity, 0),
      items: [...cart],
      supplierName: supplier?.name || "Geral",
      supplierContact: supplier?.contato || "",
      status: "Pendente",
    };

    setOrders([order, ...orders]);
    setCart([]);
    setActiveTab("orders");
    showNotify("Ordem de compra gerada!");
  };

  const finishOrder = (orderId) => {
    setOrders((prevOrders) => {
      const targetOrder = prevOrders.find((o) => o.id === orderId);
      if (!targetOrder || targetOrder.status === "Finalizado") {
        return prevOrders;
      }

      // Atualiza o estoque somando as quantidades recebidas
      setProducts((prevProducts) =>
        prevProducts.map((p) => {
          const item = targetOrder.items.find((i) => i.id === p.id);
          if (!item) return p;
          return { ...p, stock: p.stock + item.quantity };
        })
      );

      showNotify("Estoque atualizado!");
      return prevOrders.map((o) =>
        o.id === orderId ? { ...o, status: "Finalizado" } : o
      );
    });
  };

  const sendWhatsApp = (order) => {
    const message =
      `Olá, sou do MercadoSys. Gostaria de realizar um pedido:\n\n` +
      order.items.map((i) => `- ${i.name}: ${i.quantity} un`).join("\n") +
      `\n\nTotal estimado: ${formatCurrency(order.total)}`;

    const encodedMsg = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${order.supplierContact}&text=${encodedMsg}`;
    window.open(url, "_blank");
  };

  const pageTitle = {
    dashboard: "Visão Geral do Negócio",
    inventory: "Controle de Estoque e Compras",
    cart: "Finalizar Pedido de Compra",
    orders: "Histórico de Pedidos",
    register: "Novos Cadastros",
  }[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartLength={cart.length}
      />

      <main className="flex-1 ml-64 p-8">
        <Toast message={successMessage} />

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">{pageTitle}</h1>
          <p className="text-slate-500 text-sm">
            Gerencie seu pequeno comércio de forma profissional.
          </p>
        </header>

        {activeTab === "dashboard" && (
          <Dashboard products={products} suppliers={suppliers} orders={orders} />
        )}

        {activeTab === "inventory" && (
          <Inventory products={products} addToCart={addToCart} />
        )}

        {activeTab === "cart" && (
          <Cart cart={cart} setCart={setCart} finalizeOrder={finalizeOrder} />
        )}

        {activeTab === "orders" && (
          <Orders
            orders={orders}
            sendWhatsApp={sendWhatsApp}
            finishOrder={finishOrder}
          />
        )}

        {activeTab === "register" && (
          <Register
            suppliers={suppliers}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            handleAddProduct={handleAddProduct}
            newSupplier={newSupplier}
            setNewSupplier={setNewSupplier}
            handleAddSupplier={handleAddSupplier}
          />
        )}
      </main>
    </div>
  );
}
