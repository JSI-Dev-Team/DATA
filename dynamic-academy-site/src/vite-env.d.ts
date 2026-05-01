/// <reference types="vite/client" />

// Reserved for future VITE_-prefixed client env vars.
// SMTP credentials are server-side only and live in api/send-contact.js
// via process.env (see .env.example).
interface ImportMetaEnv {}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
