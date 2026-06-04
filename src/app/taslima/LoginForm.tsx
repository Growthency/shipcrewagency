"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Lock, Mail, AlertCircle, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="a-btn a-btn--primary a-btn--block"
      style={{ padding: "12px 16px" }}
    >
      {pending ? (
        <>
          <span className="a-spin" style={{ width: 16, height: 16 }} />
          Signing in…
        </>
      ) : (
        <>
          <LogIn />
          Sign in
        </>
      )}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState<LoginState | undefined, FormData>(
    loginAction,
    undefined,
  );

  return (
    <form action={action} className="a-login__form">
      <div>
        <label htmlFor="email" className="a-label">
          Email
        </label>
        <div className="a-login__input-wrap">
          <Mail />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state?.email ?? ""}
            placeholder="you@example.com"
            className="a-input"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="a-label">
          Password
        </label>
        <div className="a-login__input-wrap">
          <Lock />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="a-input"
          />
        </div>
      </div>

      {state?.error && (
        <div className="a-alert a-alert--error" style={{ marginBottom: 0 }}>
          <AlertCircle />
          <span>{state.error}</span>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
