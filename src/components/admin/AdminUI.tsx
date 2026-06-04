"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, CheckCircle2, XCircle, X, Pencil } from "lucide-react";

/* ------------------------------------------------------------------
   Dependency-free Toast + Confirm + Prompt provider for the admin.
   No native browser dialogs anywhere — every popup is on-brand.
------------------------------------------------------------------ */

type ToastKind = "success" | "error";
interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ConfirmOptions {
  title: string;
  message?: string;
  confirmLabel?: string;
  tone?: "danger" | "default";
}

interface PromptOptions {
  title: string;
  label?: string;
  message?: string;
  defaultValue?: string;
  placeholder?: string;
  confirmLabel?: string;
}

interface AdminUIContextValue {
  toast: { success: (m: string) => void; error: (m: string) => void };
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
  prompt: (opts: PromptOptions) => Promise<string | null>;
}

const AdminUIContext = createContext<AdminUIContextValue | null>(null);

export function useAdminUI(): AdminUIContextValue {
  const ctx = useContext(AdminUIContext);
  if (!ctx) {
    throw new Error("useAdminUI must be used within <AdminUIProvider>");
  }
  return ctx;
}

let nextId = 1;

export function AdminUIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmOptions | null>(null);
  const confirmResolver = useRef<((v: boolean) => void) | null>(null);

  const [promptState, setPromptState] = useState<PromptOptions | null>(null);
  const [promptValue, setPromptValue] = useState("");
  const promptResolver = useRef<((v: string | null) => void) | null>(null);
  const promptInputRef = useRef<HTMLInputElement | null>(null);

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = nextId++;
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const toast = useRef({
    success: (m: string) => push("success", m),
    error: (m: string) => push("error", m),
  }).current;

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setConfirmState(opts);
    return new Promise<boolean>((resolve) => {
      confirmResolver.current = resolve;
    });
  }, []);

  const settleConfirm = useCallback((value: boolean) => {
    confirmResolver.current?.(value);
    confirmResolver.current = null;
    setConfirmState(null);
  }, []);

  const prompt = useCallback((opts: PromptOptions): Promise<string | null> => {
    setPromptValue(opts.defaultValue ?? "");
    setPromptState(opts);
    return new Promise<string | null>((resolve) => {
      promptResolver.current = resolve;
    });
  }, []);

  const settlePrompt = useCallback((value: string | null) => {
    promptResolver.current?.(value);
    promptResolver.current = null;
    setPromptState(null);
  }, []);

  useEffect(() => {
    if (promptState) {
      const id = setTimeout(() => promptInputRef.current?.focus(), 40);
      return () => clearTimeout(id);
    }
  }, [promptState]);

  return (
    <AdminUIContext.Provider value={{ toast, confirm, prompt }}>
      {children}

      {/* Toasts */}
      <div className="a-toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`a-toast a-toast--${t.kind}`}>
            {t.kind === "success" ? <CheckCircle2 /> : <XCircle />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Confirm dialog */}
      {confirmState && (
        <div
          className="a-modal-overlay"
          onClick={() => settleConfirm(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="a-modal a-modal--sm" onClick={(e) => e.stopPropagation()}>
            <div className="a-modal__head">
              <div className="a-modal__title">
                <span
                  className="a-modal__title-ico"
                  style={
                    confirmState.tone === "danger"
                      ? { background: "linear-gradient(135deg,#d93939,#ff6b6b)" }
                      : undefined
                  }
                >
                  <AlertTriangle />
                </span>
                {confirmState.title}
              </div>
              <button
                type="button"
                className="a-iconbtn"
                onClick={() => settleConfirm(false)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>
            {confirmState.message && (
              <div className="a-modal__body">
                <p className="a-modal__text">{confirmState.message}</p>
              </div>
            )}
            <div className="a-modal__foot">
              <button
                type="button"
                className="a-btn a-btn--ghost"
                onClick={() => settleConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={
                  confirmState.tone === "danger"
                    ? "a-btn a-btn--solid-danger"
                    : "a-btn a-btn--primary"
                }
                onClick={() => settleConfirm(true)}
                autoFocus
              >
                {confirmState.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt dialog (replaces window.prompt) */}
      {promptState && (
        <div
          className="a-modal-overlay"
          onClick={() => settlePrompt(null)}
          role="dialog"
          aria-modal="true"
        >
          <form
            className="a-modal a-modal--sm"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              settlePrompt(promptValue);
            }}
          >
            <div className="a-modal__head">
              <div className="a-modal__title">
                <span className="a-modal__title-ico">
                  <Pencil />
                </span>
                {promptState.title}
              </div>
              <button
                type="button"
                className="a-iconbtn"
                onClick={() => settlePrompt(null)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>
            <div className="a-modal__body">
              {promptState.message && (
                <p className="a-modal__text" style={{ marginBottom: 12 }}>
                  {promptState.message}
                </p>
              )}
              {promptState.label && (
                <label className="a-label">{promptState.label}</label>
              )}
              <input
                ref={promptInputRef}
                className="a-input"
                value={promptValue}
                placeholder={promptState.placeholder}
                onChange={(e) => setPromptValue(e.target.value)}
              />
            </div>
            <div className="a-modal__foot">
              <button
                type="button"
                className="a-btn a-btn--ghost"
                onClick={() => settlePrompt(null)}
              >
                Cancel
              </button>
              <button type="submit" className="a-btn a-btn--primary">
                {promptState.confirmLabel ?? "OK"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminUIContext.Provider>
  );
}
