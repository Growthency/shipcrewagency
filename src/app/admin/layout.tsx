import type { Metadata } from "next";
import { verifySession } from "@/lib/auth/dal";
import { AdminUIProvider } from "@/components/admin/AdminUI";
import AdminShell from "./AdminShell";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <AdminUIProvider>
      <AdminShell userEmail={session.email}>{children}</AdminShell>
    </AdminUIProvider>
  );
}
