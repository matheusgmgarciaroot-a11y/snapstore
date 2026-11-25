"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  LockKey,
  QrCode,
  ShoppingBag,
  SignIn,
  Truck,
  UserPlus,
} from "@phosphor-icons/react";
import { getItemUnitPrice, useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { saveOrder } from "@/lib/adminStore";
import { formatBRL, getPixPrice } from "@/lib/format";
import { JerseyGraphic } from "@/components/catalog/JerseyGraphic";

export default function CheckoutPage() {
  const { items, subtotal, comboActive, comboSavings, clearCart } = useCart();
  const { user, openAuthModal } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [formError, setFormError] = useState("");
  const [orderCode, setOrderCode] = useState<string | null>(null);

  const effectiveName = fullName || user?.name || "";
  const effectiveEmail = email || user?.email || "";

  const freeShipping = subtotal >= 499;
  const shippingCost = subtotal === 0 || freeShipping ? 0 : 24.9;
  const baseTotal = subtotal + shippingCost;
  const finalTotal =
    paymentMethod === "pix" ? getPixPrice(subtotal) + shippingCost : baseTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal("login");
      return;
    }
    if (!effectiveName.trim() || !effectiveEmail.trim() || !cep.trim() || !address.trim()) {
      setFormError("Preencha nome, e-mail, CEP e endereço para simular o pedido.");
      return;
    }
    setFormError("");
    const code = `SNP-${Math.floor(100000 + Math.random() * 900000)}`;
    saveOrder({
      id: `ord_${Date.now()}`,
      code,
      createdAt: new Date().toISOString(),
      customerName: effectiveName.trim(),
      customerEmail: effectiveEmail.trim(),
      customerPhone: user.phone,
      cep: cep.trim(),
      address: address.trim(),
      cityState: cityState.trim() || "Brasil",
      paymentMethod,
      items: items.map((item) => ({
        jerseyId: item.jersey.id,
        slug: item.jersey.slug,
        title: item.jersey.title,
        teamName: item.jersey.teamName,
        size: item.size,
        quantity: item.quantity,
        unitPrice: getItemUnitPrice(item, comboActive),
        customName: item.customName,
        customNumber: item.customNumber,
      })),
      subtotal,
      comboSavings,
      shippingCost,
      finalTotal,
      status: paymentMethod === "pix" ? "Pendente" : "Pago",
    });
    setOrderCode(code);
    clearCart();
  };

  if (orderCode) {
    return (
      <div className="flex-1 bg-[#F6F7F8] text-[#111317] py-16 px-4">
        <div className="max-w-xl mx-auto bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-8 text-center space-y-5">
          <div className="w-16 h-16 mx-auto rounded-[2px] bg-[#ECFDF3] border border-[#BBF7D0] flex items-center justify-center text-[#15803D]">
            <CheckCircle size={36} weight="bold" />
          </div>
          <div className="space-y-2">
            <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#5A6270]">
              Pedido Simulado Confirmado
            </span>
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">
              Obrigado pela compra
            </h1>
            <p className="text-sm text-[#5A6270]">
              Código do pedido:{" "}
              <strong className="font-mono-tabular text-[#111317]">{orderCode}</strong>
            </p>
            <p className="text-sm text-[#5A6270]">
              Este é um checkout demonstrativo da Snap Store. Nenhuma cobrança real foi efetuada.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/nfl"
              className="px-5 py-3 rounded-[2px] bg-[#111317] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#232730]"
            >
              Explorar NFL
            </Link>
            <Link
              href="/nba"
              className="px-5 py-3 rounded-[2px] bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B3171D]"
            >
              Explorar NBA
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#F6F7F8] text-[#111317] py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight">
            Finalizar Pedido
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5A6270] hover:text-[#111317]"
          >
            <ArrowLeft size={14} weight="bold" />
            <span>Continuar comprando</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-12 text-center space-y-4">
            <ShoppingBag size={36} className="mx-auto text-[#5A6270]" />
            <h2 className="font-display text-2xl font-bold uppercase">
              Sua sacola está vazia
            </h2>
            <p className="text-sm text-[#5A6270]">
              Adicione camisas da NFL ou NBA antes de ir para o checkout.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/nfl"
                className="px-5 py-3 rounded-[2px] bg-[#111317] text-white text-xs font-bold uppercase tracking-wider"
              >
                Ir para NFL
              </Link>
              <Link
                href="/nba"
                className="px-5 py-3 rounded-[2px] bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider"
              >
                Ir para NBA
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            {/* Auth Gate or Checkout Form */}
            {!user ? (
              <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-8 md:p-10 text-center space-y-5">
                <div className="w-16 h-16 mx-auto rounded-[4px] bg-[#0D0F12] text-[#D61F26] flex items-center justify-center">
                  <LockKey size={32} weight="bold" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <span className="font-mono-tabular text-xs font-bold uppercase tracking-wider text-[#D61F26]">
                    Acesso Necessário
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#111317]">
                    Entre ou cadastre-se para finalizar
                  </h2>
                  <p className="text-sm text-[#5A6270] leading-relaxed">
                    Para concluir sua compra e acompanhar seu pedido com segurança, faça login ou crie sua conta rápida na Snap Store.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-transform active:scale-[0.98]"
                  >
                    <SignIn size={16} weight="bold" />
                    <span>Entrar na Conta</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#111317] hover:bg-[#232730] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-transform active:scale-[0.98]"
                  >
                    <UserPlus size={16} weight="bold" />
                    <span>Criar Cadastro</span>
                  </button>
                </div>
              </div>
            ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-6 md:p-8 space-y-6"
            >
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-bold uppercase border-b border-[#E1E4E8] pb-2">
                  Dados de Entrega
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="full-name" className="block text-xs font-bold uppercase text-[#111317]">
                      Nome Completo
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      value={effectiveName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lucas Ferreira"
                      className="w-full px-3 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase text-[#111317]">
                      E-mail
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={effectiveEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="lucas@exemplo.com.br"
                      className="w-full px-3 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="cep" className="block text-xs font-bold uppercase text-[#111317]">
                      CEP
                    </label>
                    <input
                      id="cep"
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      placeholder="01310-100"
                      className="w-full px-3 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="block text-xs font-bold uppercase text-[#111317]">
                      Cidade / UF
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={cityState}
                      onChange={(e) => setCityState(e.target.value)}
                      placeholder="São Paulo - SP"
                      className="w-full px-3 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="address" className="block text-xs font-bold uppercase text-[#111317]">
                    Endereço e Número
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Av. Paulista, 1000, Apto 42"
                    className="w-full px-3 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-2xl font-bold uppercase border-b border-[#E1E4E8] pb-2">
                  Pagamento Simulado
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("pix")}
                    className={`p-4 rounded-[2px] border text-left flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === "pix"
                        ? "border-[#D61F26] bg-[#FFF5F5]"
                        : "border-[#E1E4E8] bg-[#FFFFFF] hover:border-[#111317]"
                    }`}
                  >
                    <QrCode size={22} weight="bold" className="text-[#D61F26] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#111317]">Pix à Vista</p>
                      <p className="text-xs text-[#15803D] font-semibold">
                        5% de desconto aplicado
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-[2px] border text-left flex items-start gap-3 cursor-pointer transition-colors ${
                      paymentMethod === "card"
                        ? "border-[#D61F26] bg-[#FFF5F5]"
                        : "border-[#E1E4E8] bg-[#FFFFFF] hover:border-[#111317]"
                    }`}
                  >
                    <CreditCard size={22} weight="bold" className="text-[#111317] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-[#111317]">Cartão de Crédito</p>
                      <p className="text-xs text-[#5A6270]">Até 6x sem juros</p>
                    </div>
                  </button>
                </div>
              </div>

              {formError && (
                <p className="text-sm font-semibold text-[#DC2626]" role="alert">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white font-bold text-sm uppercase tracking-wider transition-transform active:scale-[0.98] cursor-pointer"
              >
                Confirmar Pedido ({formatBRL(finalTotal)})
              </button>
            </form>
            )}

            {/* Order Summary */}
            <aside className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-6 space-y-5">
              <h2 className="font-display text-2xl font-bold uppercase border-b border-[#E1E4E8] pb-2">
                Resumo da Sacola
              </h2>

              <div className="divide-y divide-[#E1E4E8] max-h-[380px] overflow-y-auto">
                {items.map((item) => {
                  const unitPrice = getItemUnitPrice(item, comboActive);
                  return (
                    <div key={item.cartKey} className="py-3 flex items-center gap-3">
                      <div className="w-14 h-16 rounded-[2px] bg-[#F6F7F8] border border-[#E1E4E8] p-1 shrink-0">
                        <JerseyGraphic
                          jersey={item.jersey}
                          displayName={item.customName || item.jersey.playerName}
                          displayNumber={item.customNumber || item.jersey.playerNumber}
                          compact
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#111317] truncate">
                          {item.jersey.teamName} ({item.size})
                        </p>
                        <p className="text-xs text-[#5A6270]">
                          Qtd: {item.quantity}
                          {item.customName || item.customNumber
                            ? ` - ${item.customName || ""} #${item.customNumber || ""}`
                            : ""}
                        </p>
                      </div>
                      <span className="font-mono-tabular text-sm font-bold text-[#111317]">
                        {formatBRL(unitPrice * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#E1E4E8] pt-4 space-y-2 text-sm">
                {comboActive && comboSavings > 0 && (
                  <div className="flex justify-between text-[#15803D] font-semibold">
                    <span>Combo 2+ Camisas (R$ 250/un)</span>
                    <span className="font-mono-tabular">- {formatBRL(comboSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5A6270]">
                  <span>Subtotal</span>
                  <span className="font-mono-tabular text-[#111317]">{formatBRL(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5A6270]">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck size={15} /> Frete
                  </span>
                  <span className="font-mono-tabular text-[#111317]">
                    {freeShipping ? "Grátis" : formatBRL(shippingCost)}
                  </span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="flex justify-between text-[#15803D] font-medium">
                    <span>Desconto Pix (5%)</span>
                    <span className="font-mono-tabular">
                      - {formatBRL(subtotal - getPixPrice(subtotal))}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#E1E4E8] text-base font-bold text-[#111317]">
                  <span>Total</span>
                  <span className="font-mono-tabular text-xl">{formatBRL(finalTotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
