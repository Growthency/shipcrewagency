// Generate an ADMIN_PASSWORD_HASH for the /taslima login portal.
// Usage:  npm run hash-password "YourStrongPassword"
import crypto from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password "YourStrongPassword"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");

console.log("\nAdd this to your .env.local (and host environment):\n");
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}\n`);
