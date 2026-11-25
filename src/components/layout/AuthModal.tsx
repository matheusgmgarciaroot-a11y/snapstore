"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Eye, EyeSlash, SignIn, UserPlus, X } from "@phosphor-icons/react";
import { useAuth } from "@/context/AuthContext";

export function AuthModal() {
  const { isModalOpen, modalTab, setModalTab, closeAuthModal, login, register } =
    useAuth();
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const resetForm = () => {
    setError("");
    setInfoMessage("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    setSubmitting(true);

    try {
      if (modalTab === "login") {
        const res = await login(email, password);
        if (!res.ok) {
          setError(res.error || "Não foi possível entrar.");
        } else {
          resetForm();
        }
        return;
      }

      const res = await register({ name, email, phone, password });
      if (!res.ok) {
        setError(res.error || "Não foi possível concluir o cadastro.");
      } else if (res.needsEmailConfirmation) {
        setPassword("");
        setInfoMessage(
          res.message ||
            "Cadastro realizado! Confirme seu e-mail para poder entrar."
        );
      } else {
        resetForm();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Login e Cadastro Snap Store"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="relative z-10 w-full max-w-md bg-[#FFFFFF] text-[#111317] rounded-[4px] border border-[#E1E4E8] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0D0F12] text-white px-6 py-5 flex items-center justify-between border-b border-[#272C35]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-[3px] overflow-hidden bg-black border border-[#D61F26]/70 shrink-0">
                  <Image
                    src="/images/snap-store-logo.jpg"
                    alt="Snap Store"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight leading-none">
                    {modalTab === "login" ? "Entrar na Conta" : "Criar Cadastro"}
                  </h2>
                  <p className="text-xs text-[#9AA3B2] mt-0.5">
                    Acesse para finalizar suas compras na Snap Store
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="p-1.5 rounded-[2px] text-[#9AA3B2] hover:text-white hover:bg-white/10 cursor-pointer"
                aria-label="Fechar janela de login"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-[#E1E4E8] bg-[#F6F7F8]">
              <button
                type="button"
                onClick={() => {
                  setModalTab("login");
                  setError("");
                  setInfoMessage("");
                }}
                className={`py-3 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalTab === "login"
                    ? "bg-[#FFFFFF] text-[#D61F26] border-b-2 border-[#D61F26]"
                    : "text-[#5A6270] hover:text-[#111317]"
                }`}
              >
                <SignIn size={15} weight="bold" />
                <span>Entrar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalTab("register");
                  setError("");
                  setInfoMessage("");
                }}
                className={`py-3 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  modalTab === "register"
                    ? "bg-[#FFFFFF] text-[#D61F26] border-b-2 border-[#D61F26]"
                    : "text-[#5A6270] hover:text-[#111317]"
                }`}
              >
                <UserPlus size={15} weight="bold" />
                <span>Cadastrar</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalTab === "register" && (
                <div className="space-y-1">
                  <label
                    htmlFor="auth-name"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111317]"
                  >
                    Nome Completo
                  </label>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#8A93A2] focus:outline-none focus:border-[#111317]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label
                  htmlFor="auth-email"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111317]"
                >
                  E-mail
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#8A93A2] focus:outline-none focus:border-[#111317]"
                />
              </div>

              {modalTab === "register" && (
                <div className="space-y-1">
                  <label
                    htmlFor="auth-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-[#111317]"
                  >
                    WhatsApp (opcional)
                  </label>
                  <input
                    id="auth-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#8A93A2] focus:outline-none focus:border-[#111317]"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label
                  htmlFor="auth-password"
                  className="block text-xs font-bold uppercase tracking-wider text-[#111317]"
                >
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-[2px] border border-[#E1E4E8] text-sm text-[#111317] placeholder:text-[#8A93A2] focus:outline-none focus:border-[#111317]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5A6270] hover:text-[#111317] cursor-pointer"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  className="text-xs font-semibold text-[#B3171D] bg-[#FFF1F1] border border-[#FECACA] px-3 py-2 rounded-[2px]"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {infoMessage && (
                <p
                  className="text-xs font-semibold text-[#15803D] bg-[#ECFDF3] border border-[#BBF7D0] px-3 py-2 rounded-[2px]"
                  role="status"
                >
                  {infoMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider transition-transform active:scale-[0.98] cursor-pointer"
              >
                {submitting
                  ? "Aguarde..."
                  : modalTab === "login"
                  ? "Entrar na Conta"
                  : "Criar Minha Conta"}
              </button>

              <p className="text-center text-xs text-[#5A6270]">
                {modalTab === "login" ? (
                  <>
                    Ainda não tem conta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setModalTab("register");
                        setError("");
                        setInfoMessage("");
                      }}
                      className="font-bold text-[#D61F26] hover:underline cursor-pointer"
                    >
                      Cadastre-se agora
                    </button>
                  </>
                ) : (
                  <>
                    Já possui conta?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setModalTab("login");
                        setError("");
                        setInfoMessage("");
                      }}
                      className="font-bold text-[#D61F26] hover:underline cursor-pointer"
                    >
                      Fazer login
                    </button>
                  </>
                )}
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
