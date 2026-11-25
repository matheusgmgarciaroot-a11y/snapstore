"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChartBar,
  CheckCircle,
  DownloadSimple,
  Gear,
  LockKey,
  MagnifyingGlass,
  Package,
  ShieldCheck,
  ShoppingCart,
  SignOut,
  Trash,
  TShirt,
  Users,
} from "@phosphor-icons/react";
import { NFL_JERSEYS } from "@/data/jerseys";
import {
  DEFAULT_SETTINGS,
  getCatalogOverrides,
  getStoredOrders,
  getStoreSettings,
  JerseyOverride,
  ORDER_STATUSES,
  OrderRecord,
  OrderStatus,
  saveCatalogOverrides,
  saveStoreSettings,
  StoreSettings,
  updateStoredOrders,
} from "@/lib/adminStore";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { formatBRL } from "@/lib/format";

type AdminTab = "overview" | "orders" | "users" | "catalog" | "settings";

const STATUS_BADGE_CLASSES: Record<OrderStatus, string> = {
  Pendente: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
  Pago: "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]",
  "Em Produção": "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
  Enviado: "bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]",
  Entregue: "bg-[#111317] text-white border-[#111317]",
  Cancelado: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
};

export function AdminDashboard() {
  const { user, login, logout } = useAuth();

  // Admin login form state
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [overrides, setOverrides] = useState<Record<string, JerseyOverride>>({});

  // Filters & search
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<"ALL" | OrderStatus>("ALL");
  const [userSearch, setUserSearch] = useState("");
  const [catalogSearch, setCatalogSearch] = useState("");

  // Settings feedback
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [newAdminPass, setNewAdminPass] = useState("");
  const [passSaved, setPassSaved] = useState(false);
  const [passError, setPassError] = useState("");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setOrders(getStoredOrders());
      setSettings(getStoreSettings());
      setOverrides(getCatalogOverrides());
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [user]);

  const isAdmin = user?.role === "admin";

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr("");
    setLoggingIn(true);
    try {
      const res = await login(adminEmail, adminPass);
      if (!res.ok) {
        setLoginErr(res.error || "Credenciais inválidas.");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  // KPI calculations
  const validOrders = useMemo(
    () => orders.filter((o) => o.status !== "Cancelado"),
    [orders]
  );
  const totalRevenue = useMemo(
    () => validOrders.reduce((acc, o) => acc + o.finalTotal, 0),
    [validOrders]
  );
  const avgTicket = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;
  const pixOrdersCount = validOrders.filter((o) => o.paymentMethod === "pix").length;
  const cardOrdersCount = validOrders.filter((o) => o.paymentMethod === "card").length;

  // Filtered lists
  const filteredOrders = useMemo(() => {
    const q = orderSearch.trim().toLowerCase();
    return orders.filter((o) => {
      if (orderStatusFilter !== "ALL" && o.status !== orderStatusFilter) {
        return false;
      }
      if (!q) return true;
      return (
        o.code.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    });
  }, [orders, orderSearch, orderStatusFilter]);

  const customerSummaries = useMemo(() => {
    const map = new Map<
      string,
      { name: string; email: string; phone?: string; orderCount: number; totalSpent: number; lastOrderAt: string }
    >();
    for (const o of orders) {
      const key = o.customerEmail.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.orderCount += 1;
        existing.totalSpent += o.finalTotal;
      } else {
        map.set(key, {
          name: o.customerName,
          email: o.customerEmail,
          phone: o.customerPhone,
          orderCount: 1,
          totalSpent: o.finalTotal,
          lastOrderAt: o.createdAt,
        });
      }
    }
    return Array.from(map.values());
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return customerSummaries;
    return customerSummaries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q)
    );
  }, [customerSummaries, userSearch]);

  const filteredCatalog = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    if (!q) return NFL_JERSEYS;
    return NFL_JERSEYS.filter((j) =>
      `${j.teamName} ${j.playerName} ${j.editionLabel} ${j.divisionName}`
        .toLowerCase()
        .includes(q)
    );
  }, [catalogSearch]);

  // Order actions
  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    const next = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(next);
    updateStoredOrders(next);
  };

  const handleTrackingChange = (orderId: string, trackingCode: string) => {
    const next = orders.map((o) =>
      o.id === orderId ? { ...o, trackingCode } : o
    );
    setOrders(next);
    updateStoredOrders(next);
  };

  const handleDeleteOrder = (orderId: string) => {
    const next = orders.filter((o) => o.id !== orderId);
    setOrders(next);
    updateStoredOrders(next);
  };

  const handleExportCsv = () => {
    const header = [
      "Codigo",
      "Data",
      "Cliente",
      "Email",
      "Pagamento",
      "Status",
      "Rastreio",
      "Total",
    ];
    const rows = orders.map((o) => [
      o.code,
      new Date(o.createdAt).toLocaleString("pt-BR"),
      `"${o.customerName.replace(/"/g, '""')}"`,
      o.customerEmail,
      o.paymentMethod === "pix" ? "Pix" : "Cartao",
      o.status,
      o.trackingCode || "",
      o.finalTotal.toFixed(2),
    ]);
    const csv = [header.join(";"), ...rows.map((r) => r.join(";"))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vendas-snap-store.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Catalog override actions
  const handleUpdateOverride = (
    jerseyId: string,
    patch: Partial<JerseyOverride>
  ) => {
    const next = {
      ...overrides,
      [jerseyId]: { ...(overrides[jerseyId] || {}), ...patch },
    };
    setOverrides(next);
    saveCatalogOverrides(next);
  };

  // Settings actions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2200);
  };

  const handleUpdateAdminPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    if (!user || newAdminPass.length < 6) {
      setPassError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setPassError("Supabase não configurado neste ambiente.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newAdminPass });
    if (error) {
      setPassError(error.message);
      return;
    }
    setNewAdminPass("");
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 2200);
  };

  // Admin Login Gate
  if (!isAdmin) {
    return (
      <div className="flex-1 bg-[#0D0F12] text-[#F4F5F7] flex items-center justify-center p-4 py-16">
        <div className="w-full max-w-md bg-[#161A20] border border-[#272C35] rounded-[4px] overflow-hidden shadow-2xl">
          <div className="bg-[#000000] px-6 py-6 border-b border-[#272C35] flex items-center gap-4">
            <div className="w-14 h-14 rounded-[4px] overflow-hidden border-2 border-[#D61F26] shrink-0">
              <Image
                src="/images/snap-store-logo.jpg"
                alt="Snap Store Admin"
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono-tabular uppercase tracking-widest text-[#D61F26] font-bold">
                <LockKey size={12} weight="fill" />
                <span>Acesso Restrito</span>
              </span>
              <h1 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white leading-none">
                Painel Admin
              </h1>
            </div>
          </div>

          <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
            {user && user.role !== "admin" && (
              <div className="p-3 rounded-[2px] bg-[#FEF3C7]/10 border border-[#FDE047]/40 text-xs text-[#FDE047]">
                Você está logado como <strong>{user.email}</strong> (Cliente). Entre com uma conta de Administrador para acessar o painel.
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-[#C8CFD9]"
              >
                E-mail do Administrador
              </label>
              <input
                id="admin-email"
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@snapstore.com.br"
                className="w-full px-3.5 py-2.5 rounded-[2px] bg-[#0D0F12] border border-[#2F3642] text-sm text-white placeholder:text-[#6B7485] focus:outline-none focus:border-[#D61F26]"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-[#C8CFD9]"
              >
                Senha
              </label>
              <input
                id="admin-password"
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-[2px] bg-[#0D0F12] border border-[#2F3642] text-sm text-white placeholder:text-[#6B7485] focus:outline-none focus:border-[#D61F26]"
              />
            </div>

            {loginErr && (
              <p className="text-xs font-semibold text-[#FCA5A5] bg-[#D61F26]/20 border border-[#D61F26]/50 px-3 py-2 rounded-[2px]">
                {loginErr}
              </p>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              {loggingIn ? "Autenticando..." : "Entrar no Painel Admin"}
            </button>

            <div className="pt-2 border-t border-[#272C35] text-center">
              <Link
                href="/"
                className="text-xs text-[#9AA3B2] hover:text-white transition-colors"
              >
                Voltar para a loja
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "overview", label: "Visão Geral", icon: <ChartBar size={17} weight="bold" /> },
    { id: "orders", label: "Vendas & Pedidos", icon: <ShoppingCart size={17} weight="bold" />, count: orders.length },
    { id: "users", label: "Clientes", icon: <Users size={17} weight="bold" />, count: customerSummaries.length },
    { id: "catalog", label: "Catálogo & Estoque", icon: <TShirt size={17} weight="bold" />, count: NFL_JERSEYS.length },
    { id: "settings", label: "Configurações", icon: <Gear size={17} weight="bold" /> },
  ];

  return (
    <div className="flex-1 bg-[#F6F7F8] text-[#111317] pb-16">
      {/* Admin Top Bar */}
      <div className="bg-[#0D0F12] text-white border-b border-[#272C35]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[3px] bg-[#D61F26] flex items-center justify-center shrink-0">
              <ShieldCheck size={26} weight="bold" />
            </div>
            <div>
              <span className="font-mono-tabular text-[11px] uppercase tracking-widest text-[#D61F26] font-bold">
                Central de Controle · Snap Store
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-none">
                Painel Administrativo
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9AA3B2] hidden md:inline">
              Logado como <strong className="text-white">{user.email}</strong>
            </span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#161A20] hover:bg-[#D61F26] border border-[#272C35] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              <SignOut size={15} weight="bold" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? "border-[#D61F26] text-white bg-white/5"
                    : "border-transparent text-[#9AA3B2] hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span className="font-mono-tabular text-[10px] px-1.5 py-0.5 rounded-[2px] bg-white/10">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-8 space-y-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-5 space-y-1">
                <p className="text-xs font-mono-tabular uppercase text-[#5A6270] font-semibold">
                  Faturamento Total
                </p>
                <p className="font-mono-tabular text-3xl font-extrabold text-[#111317]">
                  {formatBRL(totalRevenue)}
                </p>
                <p className="text-xs text-[#15803D] font-semibold">
                  {validOrders.length} pedidos válidos
                </p>
              </div>

              <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-5 space-y-1">
                <p className="text-xs font-mono-tabular uppercase text-[#5A6270] font-semibold">
                  Ticket Médio
                </p>
                <p className="font-mono-tabular text-3xl font-extrabold text-[#111317]">
                  {formatBRL(avgTicket)}
                </p>
                <p className="text-xs text-[#5A6270]">
                  Pix: {pixOrdersCount} · Cartão: {cardOrdersCount}
                </p>
              </div>

              <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-5 space-y-1">
                <p className="text-xs font-mono-tabular uppercase text-[#5A6270] font-semibold">
                  Clientes com Pedidos
                </p>
                <p className="font-mono-tabular text-3xl font-extrabold text-[#111317]">
                  {customerSummaries.length}
                </p>
                <p className="text-xs text-[#5A6270]">
                  Autenticação via Supabase Auth
                </p>
              </div>

              <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-5 space-y-1">
                <p className="text-xs font-mono-tabular uppercase text-[#5A6270] font-semibold">
                  Camisas NFL Ativas
                </p>
                <p className="font-mono-tabular text-3xl font-extrabold text-[#111317]">
                  {NFL_JERSEYS.length - Object.values(overrides).filter((o) => o.hidden).length}
                </p>
                <p className="text-xs text-[#5A6270]">
                  32 franquias · NBA {settings.nbaUnderConstruction ? "em construção" : "ativa"}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-[#E1E4E8] rounded-[3px] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E1E4E8] flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase">
                  Últimos Pedidos
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab("orders")}
                  className="text-xs font-bold uppercase tracking-wider text-[#D61F26] hover:underline cursor-pointer"
                >
                  Ver todos os pedidos
                </button>
              </div>
              {orders.length === 0 ? (
                <div className="p-10 text-center space-y-2 text-sm text-[#5A6270]">
                  <Package size={32} className="mx-auto text-[#8A93A2]" />
                  <p className="font-semibold text-[#111317]">Nenhuma venda registrada ainda.</p>
                  <p>Quando um cliente finalizar um pedido no checkout, ele aparecerá aqui automaticamente.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E1E4E8]">
                  {orders.slice(0, 6).map((ord) => (
                    <div
                      key={ord.id}
                      className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-sm"
                    >
                      <div>
                        <span className="font-mono-tabular font-bold text-[#111317]">
                          {ord.code}
                        </span>
                        <span className="text-[#5A6270] ml-2">{ord.customerName}</span>
                        <p className="text-xs text-[#5A6270]">
                          {new Date(ord.createdAt).toLocaleString("pt-BR")} ·{" "}
                          {ord.items.reduce((a, i) => a + i.quantity, 0)} peça(s)
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-[2px] border ${STATUS_BADGE_CLASSES[ord.status]}`}
                        >
                          {ord.status}
                        </span>
                        <span className="font-mono-tabular font-bold text-[#111317]">
                          {formatBRL(ord.finalTotal)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & SALES */}
        {activeTab === "orders" && (
          <div className="space-y-5">
            <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[240px]">
                  <MagnifyingGlass
                    size={16}
                    weight="bold"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6270]"
                  />
                  <input
                    type="search"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Buscar código, cliente ou e-mail..."
                    className="w-full pl-9 pr-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm focus:outline-none focus:border-[#111317]"
                  />
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={(e) =>
                    setOrderStatusFilter(e.target.value as "ALL" | OrderStatus)
                  }
                  aria-label="Filtrar por status"
                  className="px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm bg-white focus:outline-none focus:border-[#111317]"
                >
                  <option value="ALL">Todos os status</option>
                  {ORDER_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleExportCsv}
                disabled={orders.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-[2px] bg-[#111317] hover:bg-[#D61F26] disabled:opacity-40 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <DownloadSimple size={16} weight="bold" />
                <span>Exportar CSV</span>
              </button>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-12 text-center text-sm text-[#5A6270]">
                Nenhum pedido encontrado para este filtro.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white border border-[#E1E4E8] rounded-[3px] p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#F0F2F4] pb-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono-tabular text-base font-extrabold text-[#111317]">
                            {ord.code}
                          </span>
                          <span
                            className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-[2px] border ${STATUS_BADGE_CLASSES[ord.status]}`}
                          >
                            {ord.status}
                          </span>
                          <span className="text-xs font-mono-tabular text-[#5A6270] uppercase">
                            {ord.paymentMethod === "pix" ? "Pix" : "Cartão"}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A6270]">
                          {new Date(ord.createdAt).toLocaleString("pt-BR")} ·{" "}
                          <strong className="text-[#111317]">{ord.customerName}</strong> ({ord.customerEmail})
                        </p>
                        <p className="text-xs text-[#5A6270]">
                          Entrega: {ord.address} · {ord.cityState} · CEP {ord.cep}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleStatusChange(ord.id, e.target.value as OrderStatus)
                          }
                          aria-label={`Alterar status do pedido ${ord.code}`}
                          className="px-2.5 py-1.5 rounded-[2px] border border-[#E1E4E8] text-xs font-bold bg-[#F6F7F8]"
                        >
                          {ORDER_STATUSES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={ord.trackingCode || ""}
                          onChange={(e) =>
                            handleTrackingChange(ord.id, e.target.value)
                          }
                          placeholder="Código de rastreio"
                          className="px-2.5 py-1.5 rounded-[2px] border border-[#E1E4E8] text-xs font-mono-tabular w-40"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteOrder(ord.id)}
                          className="p-1.5 text-[#5A6270] hover:text-[#DC2626] cursor-pointer"
                          title="Excluir pedido"
                          aria-label={`Excluir pedido ${ord.code}`}
                        >
                          <Trash size={17} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {ord.items.map((it, idx) => (
                        <div
                          key={`${ord.id}-${idx}`}
                          className="flex flex-wrap items-center justify-between gap-2 bg-[#F6F7F8] px-3 py-2 rounded-[2px]"
                        >
                          <span className="font-semibold text-[#111317]">
                            {it.quantity}x {it.title} (Tam: {it.size})
                            {(it.customName || it.customNumber) && (
                              <span className="text-[#D61F26] ml-2">
                                [Pers: {it.customName || "-"} #{it.customNumber || "-"}]
                              </span>
                            )}
                          </span>
                          <span className="font-mono-tabular font-bold">
                            {formatBRL(it.unitPrice * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-5 text-xs pt-1">
                      {ord.comboSavings > 0 && (
                        <span className="text-[#15803D] font-semibold">
                          Desconto Combo: -{formatBRL(ord.comboSavings)}
                        </span>
                      )}
                      <span className="text-[#5A6270]">
                        Frete: {ord.shippingCost === 0 ? "Grátis" : formatBRL(ord.shippingCost)}
                      </span>
                      <span className="font-mono-tabular text-base font-extrabold text-[#111317]">
                        Total: {formatBRL(ord.finalTotal)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOMERS (Supabase Auth managed) */}
        {activeTab === "users" && (
          <div className="space-y-5">
            <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative min-w-[260px]">
                <MagnifyingGlass
                  size={16}
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6270]"
                />
                <input
                  type="search"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Buscar cliente por nome, e-mail ou telefone..."
                  className="w-full pl-9 pr-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm focus:outline-none focus:border-[#111317]"
                />
              </div>

              <span className="text-xs font-mono-tabular text-[#5A6270]">
                Logins e senhas gerenciados com segurança no Supabase Auth
              </span>
            </div>

            <div className="bg-white border border-[#E1E4E8] rounded-[3px] overflow-x-auto">
              {filteredCustomers.length === 0 ? (
                <div className="p-10 text-center text-sm text-[#5A6270]">
                  Nenhum cliente com pedidos registrados ainda.
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F6F7F8] border-b border-[#E1E4E8] text-[11px] font-mono-tabular uppercase text-[#5A6270]">
                    <tr>
                      <th className="px-4 py-3">Cliente</th>
                      <th className="px-4 py-3">Pedidos</th>
                      <th className="px-4 py-3">Total Gasto</th>
                      <th className="px-4 py-3">Último Pedido</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E1E4E8]">
                    {filteredCustomers.map((c) => (
                      <tr key={c.email} className="hover:bg-[#F9FAFB]">
                        <td className="px-4 py-3">
                          <p className="font-bold text-[#111317]">{c.name}</p>
                          <p className="text-xs text-[#5A6270]">
                            {c.email} {c.phone ? `· ${c.phone}` : ""}
                          </p>
                        </td>
                        <td className="px-4 py-3 font-mono-tabular text-xs font-bold">
                          {c.orderCount}
                        </td>
                        <td className="px-4 py-3 font-mono-tabular text-xs font-bold text-[#15803D]">
                          {formatBRL(c.totalSpent)}
                        </td>
                        <td className="px-4 py-3 font-mono-tabular text-xs text-[#5A6270]">
                          {new Date(c.lastOrderAt).toLocaleDateString("pt-BR")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CATALOG & INVENTORY */}
        {activeTab === "catalog" && (
          <div className="space-y-5">
            <div className="bg-white border border-[#E1E4E8] rounded-[3px] p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="relative min-w-[280px]">
                <MagnifyingGlass
                  size={16}
                  weight="bold"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6270]"
                />
                <input
                  type="search"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Buscar time, jogador ou edição..."
                  className="w-full pl-9 pr-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm focus:outline-none focus:border-[#111317]"
                />
              </div>
              <span className="text-xs font-mono-tabular text-[#5A6270]">
                Exibindo {filteredCatalog.length} de {NFL_JERSEYS.length} camisas NFL
              </span>
            </div>

            <div className="bg-white border border-[#E1E4E8] rounded-[3px] overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F6F7F8] border-b border-[#E1E4E8] text-[11px] font-mono-tabular uppercase text-[#5A6270]">
                  <tr>
                    <th className="px-4 py-3">Camisa</th>
                    <th className="px-4 py-3">Tipo</th>
                    <th className="px-4 py-3">Preço Base</th>
                    <th className="px-4 py-3">Preço Custom</th>
                    <th className="px-4 py-3">Disponibilidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E4E8]">
                  {filteredCatalog.slice(0, 60).map((j) => {
                    const ov = overrides[j.id] || {};
                    const isHidden = Boolean(ov.hidden);
                    const isOnRequest = ov.onRequest ?? Boolean(j.onRequest);
                    return (
                      <tr key={j.id} className={isHidden ? "opacity-50 bg-[#F9FAFB]" : ""}>
                        <td className="px-4 py-2.5">
                          <Link
                            href={`/produto/${j.slug}`}
                            className="font-bold text-[#111317] hover:text-[#D61F26]"
                          >
                            {j.title}
                          </Link>
                          <p className="text-xs text-[#5A6270]">
                            {j.teamName} · {j.divisionName}
                          </p>
                        </td>
                        <td className="px-4 py-2.5 text-xs font-semibold">
                          {j.edition === "Throwback" ? "Comemorativa" : "Oficial"}
                        </td>
                        <td className="px-4 py-2.5 font-mono-tabular font-bold">
                          {formatBRL(j.price)}
                        </td>
                        <td className="px-4 py-2.5">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={ov.customPrice ?? ""}
                            onChange={(e) =>
                              handleUpdateOverride(j.id, {
                                customPrice: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder={String(j.price)}
                            className="w-24 px-2 py-1 rounded-[2px] border border-[#E1E4E8] text-xs font-mono-tabular"
                          />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateOverride(j.id, { hidden: !isHidden })
                              }
                              className={`px-2.5 py-1 rounded-[2px] text-[11px] font-bold uppercase cursor-pointer border ${
                                isHidden
                                  ? "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]"
                                  : "bg-[#ECFDF3] text-[#15803D] border-[#BBF7D0]"
                              }`}
                            >
                              {isHidden ? "Pausada" : "Ativa"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateOverride(j.id, { onRequest: !isOnRequest })
                              }
                              className={`px-2.5 py-1 rounded-[2px] text-[11px] font-bold uppercase cursor-pointer border ${
                                isOnRequest
                                  ? "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]"
                                  : "bg-[#F6F7F8] text-[#5A6270] border-[#E1E4E8]"
                              }`}
                            >
                              {isOnRequest ? "Sob Consulta" : "Pronta Entrega"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <form
              onSubmit={handleSaveSettings}
              className="bg-white border border-[#E1E4E8] rounded-[3px] p-6 space-y-4"
            >
              <h2 className="font-display text-2xl font-bold uppercase border-b border-[#E1E4E8] pb-2">
                Regras de Preço &amp; Loja
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Preço Original (De R$)
                  </label>
                  <input
                    type="number"
                    value={settings.standardOriginalPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        standardOriginalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Preço Promocional (Por R$)
                  </label>
                  <input
                    type="number"
                    value={settings.standardPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        standardPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Preço Combo 2+ (R$/cada)
                  </label>
                  <input
                    type="number"
                    value={settings.comboUnitPrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        comboUnitPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Preço Comemorativas (R$)
                  </label>
                  <input
                    type="number"
                    value={settings.commemorativePrice}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        commemorativePrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Frete Grátis acima de (R$)
                  </label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        freeShippingThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    Instagram da Loja
                  </label>
                  <input
                    type="text"
                    value={settings.instagramHandle}
                    onChange={(e) =>
                      setSettings({ ...settings, instagramHandle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm font-medium pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.nbaUnderConstruction}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      nbaUnderConstruction: e.target.checked,
                    })
                  }
                  className="w-4 h-4 accent-[#D61F26]"
                />
                <span>Manter aba NBA em modo &quot;Em Construção&quot;</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {settingsSaved ? (
                  <>
                    <CheckCircle size={16} weight="bold" />
                    <span>Configurações Salvas</span>
                  </>
                ) : (
                  <span>Salvar Configurações</span>
                )}
              </button>
            </form>

            <form
              onSubmit={handleUpdateAdminPassword}
              className="bg-white border border-[#E1E4E8] rounded-[3px] p-6 space-y-4 h-fit"
            >
              <h2 className="font-display text-2xl font-bold uppercase border-b border-[#E1E4E8] pb-2">
                Segurança do Administrador
              </h2>
              <p className="text-xs text-[#5A6270]">
                Altere a senha da sua conta de administrador (<strong>{user.email}</strong>).
              </p>
              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Nova Senha
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newAdminPass}
                  onChange={(e) => setNewAdminPass(e.target.value)}
                  placeholder="Digite a nova senha (mín. 6 caracteres)"
                  className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm"
                />
              </div>
              {passError && (
                <p className="text-xs font-semibold text-[#DC2626]">{passError}</p>
              )}
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#111317] hover:bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {passSaved ? (
                  <>
                    <CheckCircle size={16} weight="bold" />
                    <span>Senha Atualizada</span>
                  </>
                ) : (
                  <span>Atualizar Senha</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
