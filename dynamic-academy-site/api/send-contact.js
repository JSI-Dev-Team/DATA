/**
 * Vercel serverless function — sends free-trial form submissions via SMTP.
 *
 * Route: POST /api/send-contact
 * Called by Contact.tsx alongside /api/jackrabbit-register.
 *
 * Why a serverless function (and not the browser)?
 *   - Browsers can't speak SMTP.
 *   - SMTP credentials must never ship in the client bundle.
 *
 * Env vars (set in Vercel Dashboard → Settings → Environment Variables,
 * or in `.env.local` for `vercel dev`):
 *
 *   SMTP_HOST          smtp.gmail.com
 *   SMTP_PORT          465  (SSL)  or  587  (STARTTLS)
 *   SMTP_USER          dynamicacademyofthearts@gmail.com
 *   SMTP_PASS          16-char Google App Password (NOT the account password)
 *   SMTP_FROM          (optional) "DATA Website <dynamicacademyofthearts@gmail.com>"
 *   CONTACT_TO_EMAIL   (optional) recipient — defaults to dynamicacademyofthearts@gmail.com
 *
 * Gmail App Password setup (one time):
 *   1. Sign in to https://myaccount.google.com → Security
 *   2. Enable 2-Step Verification
 *   3. App passwords → create one named "DATA Website" → copy the 16 chars
 *   4. Paste into SMTP_PASS (no spaces required, but spaces are fine)
 *
 * Local dev: run `vercel dev` from this folder so /api/* runs.
 */

import nodemailer from "nodemailer";

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[send-contact] SMTP env vars missing (need SMTP_HOST, SMTP_USER, SMTP_PASS)");
    return res.status(500).json({ error: "Email service is not configured on the server" });
  }

  const {
    parentFirst = "",
    parentLast  = "",
    email       = "",
    phone       = "",
    childName   = "",
    childAge    = "",
    styles      = [],
    bestTime    = "",
    howHeard    = "",
    message     = "",
    website,
  } = req.body ?? {};

  // Honeypot — bots love filling every field. Silently "succeed" so they
  // don't retry, but don't actually send.
  if (typeof website === "string" && website.trim().length > 0) {
    return res.status(200).json({ success: true, note: "honeypot" });
  }

  if (!email || !parentLast) {
    return res.status(400).json({ error: "email and parentLast are required" });
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fullName = `${parentFirst} ${parentLast}`.trim() || "(no name provided)";
  const stylesList = Array.isArray(styles) && styles.length ? styles.join(", ") : "(none specified)";
  const subject = `Free Trial Request — ${childName || "New Student"} (${childAge || "age TBD"})`;

  const textBody = [
    `New free trial request from the DATA website:`,
    ``,
    `Parent:        ${fullName}`,
    `Email:         ${email}`,
    `Phone:         ${phone || "(not provided)"}`,
    ``,
    `Child:         ${childName || "(not provided)"}`,
    `Age group:     ${childAge || "(not specified)"}`,
    `Dance styles:  ${stylesList}`,
    ``,
    `Best time:     ${bestTime || "Anytime"}`,
    `Heard via:     ${howHeard || "(not specified)"}`,
    ``,
    `Message:`,
    message?.trim() || "(none)",
    ``,
    `— Sent from the dynamicacademy.ca contact form`,
  ].join("\n");

  const row = (label, value) => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#64748b;font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.06em;vertical-align:top;width:140px">${escapeHtml(label)}</td>
      <td style="padding:6px 0;color:#0f172a;font-size:14px">${escapeHtml(value)}</td>
    </tr>`;

  const htmlBody = `<!doctype html>
<html><body style="margin:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:16px 16px 0 0;padding:20px 24px;color:#fff">
      <div style="font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ddd6fe">DATA Website</div>
      <div style="font-size:20px;font-weight:800;margin-top:4px">New Free Trial Request</div>
    </div>
    <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;padding:20px 24px">
      <table style="width:100%;border-collapse:collapse">
        ${row("Parent",   fullName)}
        ${row("Email",    email)}
        ${row("Phone",    phone || "(not provided)")}
        <tr><td colspan="2" style="padding:8px 0"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0"></td></tr>
        ${row("Child",    childName || "(not provided)")}
        ${row("Age group", childAge || "(not specified)")}
        ${row("Styles",   stylesList)}
        <tr><td colspan="2" style="padding:8px 0"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0"></td></tr>
        ${row("Best time", bestTime || "Anytime")}
        ${row("Heard via", howHeard || "(not specified)")}
      </table>
      ${
        message?.trim()
          ? `<div style="margin-top:16px"><div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Message</div><div style="background:#f1f5f9;border-radius:10px;padding:12px 14px;font-size:14px;white-space:pre-wrap;line-height:1.5">${escapeHtml(message)}</div></div>`
          : ""
      }
      <div style="margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8">
        Reply to this email to respond directly to ${escapeHtml(fullName)} (${escapeHtml(email)}).
      </div>
    </div>
  </div>
</body></html>`;

  try {
    const info = await transporter.sendMail({
      from:    SMTP_FROM ?? `"DATA Website" <${SMTP_USER}>`,
      to:      CONTACT_TO_EMAIL ?? "dynamicacademyofthearts@gmail.com",
      replyTo: email,
      subject,
      text:    textBody,
      html:    htmlBody,
    });

    console.info("[send-contact] sent — messageId:", info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error("[send-contact] sendMail error:", err);
    return res.status(502).json({
      error: err instanceof Error ? err.message : "Email send failed",
    });
  }
}
