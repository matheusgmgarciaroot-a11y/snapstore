"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface StoreUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface StoredAccount extends StoreUser {
  password: string;
}

type AuthTab = "login" | "register";

interface AuthResult {
  ok: boolean;
  error?: string;
}

interface AuthContextValue {
  user: StoreUser | null;
  isModalOpen: boolean;
  modalTab: AuthTab;
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
  setModalTab: (tab: AuthTab) => void;
  login: (email: string, password: string) => AuthResult;
  register: (params: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => AuthResult;
  logout: () => void;
}

const USERS_KEY = "snap-store-users-v1";
const SESSION_KEY = "snap-store-session-v1";

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAccounts(): StoredAccount[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoreUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<AuthTab>("login");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(SESSION_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as StoreUser;
          if (parsed && parsed.email && parsed.name) {
            setUser(parsed);
          }
        }
      } catch {
        // Ignore malformed storage
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [user, hydrated]);

  const openAuthModal = useCallback((tab: AuthTab = "login") => {
    setModalTab(tab);
    setIsModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const login = useCallback((email: string, password: string): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return { ok: false, error: "Informe seu e-mail e senha." };
    }
    const accounts = readStoredAccounts();
    const match = accounts.find((acc) => acc.email === normalizedEmail);
    if (!match || match.password !== password) {
      return { ok: false, error: "E-mail ou senha incorretos." };
    }
    setUser({
      id: match.id,
      name: match.name,
      email: match.email,
      phone: match.phone,
    });
    setIsModalOpen(false);
    return { ok: true };
  }, []);

  const register = useCallback(
    ({
      name,
      email,
      phone = "",
      password,
    }: {
      name: string;
      email: string;
      phone?: string;
      password: string;
    }): AuthResult => {
      const cleanName = name.trim();
      const normalizedEmail = email.trim().toLowerCase();
      if (!cleanName || !normalizedEmail || password.length < 4) {
        return {
          ok: false,
          error: "Preencha nome, e-mail válido e senha com pelo menos 4 caracteres.",
        };
      }
      const accounts = readStoredAccounts();
      if (accounts.some((acc) => acc.email === normalizedEmail)) {
        return {
          ok: false,
          error: "Este e-mail já está cadastrado. Faça login na sua conta.",
        };
      }
      const newAccount: StoredAccount = {
        id: `usr_${Date.now()}`,
        name: cleanName,
        email: normalizedEmail,
        phone: phone.trim() || undefined,
        password,
      };
      try {
        window.localStorage.setItem(
          USERS_KEY,
          JSON.stringify([...accounts, newAccount])
        );
      } catch {
        // Ignore storage errors
      }
      setUser({
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        phone: newAccount.phone,
      });
      setIsModalOpen(false);
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
