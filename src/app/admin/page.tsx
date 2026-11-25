import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Painel Administrativo",
  description:
    "Controle de vendas, pedidos, clientes, logins, estoque e configurações da Snap Store.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
