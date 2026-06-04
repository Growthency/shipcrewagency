import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { readSession, type SessionData } from "./session";

/**
 * Gate for admin pages. Redirects to the custom login portal (/taslima)
 * when there is no valid session.
 */
export const verifySession = cache(async (): Promise<SessionData> => {
  const session = await readSession();
  if (!session) {
    redirect("/taslima");
  }
  return session;
});

export const getOptionalSession = cache(
  async (): Promise<SessionData | null> => {
    return readSession();
  },
);
