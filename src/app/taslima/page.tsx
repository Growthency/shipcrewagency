import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOptionalSession } from "@/lib/auth/dal";
import { LogoMark } from "@/components/icons";
import { LoginForm } from "./LoginForm";
import "../admin/admin.css";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure administration portal for Ship Crew Agency.",
  robots: { index: false, follow: false },
};

export default async function TaslimaLoginPage() {
  const session = await getOptionalSession();
  if (session) redirect("/admin");

  return (
    <main className="a-login">
      <div className="a-login__box">
        <div className="a-login__brand">
          <span className="a-login__logo">
            <LogoMark />
          </span>
          <div style={{ textAlign: "center" }}>
            <div className="a-login__brand-name">Ship Crew Agency</div>
            <div className="a-login__brand-sub">Admin Portal</div>
          </div>
        </div>

        <div className="a-login__card">
          <div className="a-login__heading">
            <h1>Sign in</h1>
            <p>Manage crew, content and site settings.</p>
          </div>
          <LoginForm />
        </div>

        <p className="a-login__note">
          Authorized personnel only. All activity is logged.
          <br />
          <Link href="/" className="a-login__back">
            ← Back to site
          </Link>
        </p>
      </div>
    </main>
  );
}
