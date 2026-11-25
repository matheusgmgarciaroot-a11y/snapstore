"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type UserRole = "customer" | "admin";

export interface StoreUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

type AuthTab = "login" | "register";

export interface AuthResult {
  ok: boolean;
  error?: string;
  message?: string;
  needsEmailConfirmation?: boolean;
}

interface AuthContextValue {
  user: StoreUser | null;
  loading: boolean;
  isModalOpen: boolean;
  modalTab: AuthTab;
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
  setModalTab: (tab: AuthTab) => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (params: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<AuthResult>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function mapSupabaseUser(sbUser: User | null): StoreUser | null {
  if (!sbUser) return null;
  const meta = (sbUser.user_metadata ?? {}) as Record<string, unknown>;
  const appMeta = (sbUser.app_metadata ?? {}) as Record<string, unknown>;
  const email = sbUser.email ?? "";
  const rawName = typeof meta.name === "string" ? meta.name.trim() : "";
  const rawPhone = typeof meta.phone === "string" ? meta.phone.trim() : "";
  const role: UserRole =
    appMeta.role === "admin" || meta.role === "admin" ? "admin" : "customer";

  return {
    id: sbUser.id,
    name: rawName || email.split("@")[0] || "Cliente",
    email,
    phone: rawPhone || undefined,
    role,
    createdAt: sbUser.created_at,
  };
}

function translateAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (lower.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada ou spam.";
  }
  if (lower.includes("user already registered")) {
    return "Este e-mail já está cadastrado. Faça login na sua conta.";
  }
  if (lower.includes("password should be at least")) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  if (lower.includes("invalid email") || lower.includes("unable to validate email")) {
    return "Informe um endereço de e-mail válido.";
  }
  if (lower.includes("rate limit")) {
    return "Muitas tentativas em sequência. Aguarde alguns instantes e tente novamente.";
  }
  return message || "Não foi possível autenticar. Tente novamente.";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<AuthTab>("login");

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let mounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!mounted) return;
        setUser(mapSupabaseUser(data.session?.user ?? null));
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(mapSupabaseUser(session?.user ?? null));
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const openAuthModal = useCallback((tab: AuthTab = "login") => {
    setModalTab(tab);
    setIsModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail || !password) {
        return { ok: false, error: "Informe seu e-mail e senha." };
      }

      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        return { ok: false, error: translateAuthError(error.message) };
      }

      setUser(mapSupabaseUser(data.user));
      setIsModalOpen(false);
      return { ok: true };
    },
    []
  );

  const register = useCallback(
    async ({
      name,
      email,
      phone = "",
      password,
    }: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }): Promise<AuthResult> => {
      const cleanName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();
      if (!cleanName || !normalizedEmail || password.length < 6) {
        return {
          ok: false,
          error:
            "Preencha nome, e-mail válido e senha com pelo menos 6 caracteres.",
        };
      }

      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            name: cleanName,
            phone: phone.trim() || undefined,
          },
        },
      });

      if (error) {
        return { ok: false, error: translateAuthError(error.message) };
      }

      if (data.session?.user) {
        setUser(mapSupabaseUser(data.session.user));
        setIsModalOpen(false);
        return { ok: true };
      }

      // Supabase created the user and requires email confirmation before first sign-in
      return {
        ok: true,
        needsEmailConfirmation: true,
        message:
          "Cadastro realizado! Confirme seu e-mail pelo link enviado e depois faça login.",
      };
    },
    []
  );

  const logout = useCallback(async (): Promise<void> => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isModalOpen,
        modalTab,
        openAuthModal,
        closeAuthModal,
        setModalTab,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
