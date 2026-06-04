"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AlertTriangle, CheckCircle2, XCircle, X } from "lucide-react";

/* ------------------------------------------------------------------
   Lightweight, dependency-free Toast + Confirm provider for the admin.
   Replaces sonner / AdminModal from the reference implementation.
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

interface AdminUIContextValue {
  toast: { success: (m: string) => void; error: (m: string) => void };
  confirm: (opts: ConfirmOptions) => Promise<boolean>;
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
  const resolverRef = useRef<((v: boolean) => void) | null>(null);

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
      resolverRef.current = resolve;
    });
  }, []);

  const settle = useCallback((value: boolean) => {
    resolverRef.current?.(value);
    resolverRef.current = null;
    setConfirmState(null);
  }, []);

  return (
    <AdminUIContext.Provider value={{ toast, confirm }}>
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
          onClick={() => settle(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="a-modal a-modal--sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="a-modal__head">
              <div className="a-modal__title">
                <span
                  className="a-modal__title-ico"
                  style={
                    confirmState.tone === "danger"
                      ? {
                          background:
                            "linear-gradient(135deg,#d93939,#ff6b6b)",
                        }
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
                onClick={() => settle(false)}
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
                onClick={() => settle(false)}
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
                onClick={() => settle(true)}
                autoFocus
              >
                {confirmState.confirmLabel ?? "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminUIContext.Provider>
  );
}
