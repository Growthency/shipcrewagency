import "server-only";
import crypto from "node:crypto";

// Default credentials (override in production via env vars):
//   Email:    admin@shipcrewagency.com
//   Password: ShipCrew@2026
// Generate a new hash with:  npm run hash-password "YourPassword"
const DEFAULT_EMAIL = "admin@shipcrewagency.com";
const DEFAULT_PASSWORD_HASH =
  "988b63cab9ae38cb3475f0aedc8c804d:09c6a181c5066b1a5345f74c51e813efcbe83230a790a40f1b15a77dd8f907a772ca0f7e7c71f318f9829f808b6e99d2f0b7fab90bc4e2aebfa946ae3d9c6f14";

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).toLowerCase().trim();
}

function getPasswordHash(): string {
  return process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;
}

export function verifyCredentials(email: string, password: string): boolean {
  const normalized = email.toLowerCase().trim();
  if (normalized !== getAdminEmail()) return false;

  const stored = getPasswordHash();
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;

  try {
    const derived = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hashHex, "hex");
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
