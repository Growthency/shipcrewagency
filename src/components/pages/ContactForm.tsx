"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { getDict, type Lang } from "@/i18n";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  vesselType: string;
  serviceType: string;
  ranks: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  vesselType: "",
  serviceType: "",
  ranks: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const f = t.contact.fields;

  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          vessel_type: form.vesselType,
          service_type: form.serviceType,
          ranks_required: form.ranks,
          message: form.message,
          language: lang,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data.ok) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success">
        <div className="form-success__icon">
          <Icon name="check" />
        </div>
        <h3 style={{ color: "var(--white)", marginBottom: 10 }}>
          {f.successTitle}
        </h3>
        <p style={{ color: "var(--steel-light)" }}>{f.successText}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="tag">{t.contact.formTag}</div>
      <h2 style={{ color: "var(--brand-900)", marginBottom: 10 }}>
        {t.contact.formTitle}
      </h2>
      <p style={{ marginBottom: 28 }}>{t.contact.formText}</p>

      {status === "error" && <div className="form-error">{f.errorText}</div>}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-name">{f.name}</label>
          <input
            id="cf-name"
            type="text"
            required
            placeholder={f.namePlaceholder}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf-company">{f.company}</label>
          <input
            id="cf-company"
            type="text"
            required
            placeholder={f.companyPlaceholder}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-email">{f.email}</label>
          <input
            id="cf-email"
            type="email"
            required
            placeholder={f.emailPlaceholder}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf-phone">{f.phone}</label>
          <input
            id="cf-phone"
            type="tel"
            placeholder={f.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cf-vessel">{f.vesselType}</label>
          <select
            id="cf-vessel"
            value={form.vesselType}
            onChange={(e) => update("vesselType", e.target.value)}
          >
            <option value="">{f.vesselTypeDefault}</option>
            {f.vesselTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cf-service">{f.serviceType}</label>
          <select
            id="cf-service"
            value={form.serviceType}
            onChange={(e) => update("serviceType", e.target.value)}
          >
            <option value="">{f.serviceTypeDefault}</option>
            {f.serviceTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="cf-ranks">{f.ranks}</label>
        <input
          id="cf-ranks"
          type="text"
          placeholder={f.ranksPlaceholder}
          value={form.ranks}
          onChange={(e) => update("ranks", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cf-message">{f.message}</label>
        <textarea
          id="cf-message"
          required
          placeholder={f.messagePlaceholder}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={status === "submitting"}
      >
        <Icon name="send" />
        <span>{status === "submitting" ? f.submitting : f.submit}</span>
      </button>

      <p
        style={{
          marginTop: 16,
          fontSize: "0.78rem",
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        {f.disclaimer}
      </p>
    </form>
  );
}
