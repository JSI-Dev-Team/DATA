/**
 * Vercel serverless function — server-side JackRabbit API proxy.
 * Keeps JACKRABBIT_API_KEY off the browser bundle.
 *
 * Route: POST /api/jackrabbit-register
 * Called by Contact.tsx on free-trial form submission.
 *
 * Env vars (set in Vercel Dashboard → Project → Settings → Environment Variables):
 *   JACKRABBIT_API_KEY   — your JackRabbit REST API key
 *   JACKRABBIT_BASE_URL  — https://app.jackrabbitclass.com/jr3.0/openapi  (default)
 *
 * For local dev: run `vercel dev` (installs with: npm i -g vercel)
 * JackRabbit OpenAPI explorer: https://app.jackrabbitclass.com/jr3.0/openapi/swagger
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_KEY  = process.env.JACKRABBIT_API_KEY;
  const BASE_URL = process.env.JACKRABBIT_BASE_URL ?? "https://app.jackrabbitclass.com/jr3.0/openapi";

  if (!API_KEY) {
    console.error("[jackrabbit] JACKRABBIT_API_KEY env var is not set");
    return res.status(500).json({ error: "JackRabbit not configured on the server" });
  }

  // Vercel auto-parses application/json request bodies into req.body
  const {
    parentFirst, parentLast, email, phone,
    childName, childAge, styles, bestTime, howHeard, message,
  } = req.body ?? {};

  if (!email || !parentLast) {
    return res.status(400).json({ error: "email and parentLast are required" });
  }

  const apiUrl    = (path) => `${BASE_URL}${path}?apikey=${encodeURIComponent(API_KEY)}`;
  const jsonHdrs  = { "Content-Type": "application/json", Accept: "application/json" };

  const notes = [
    childAge      && `Child age group: ${childAge}`,
    styles?.length && `Dance interests: ${styles.join(", ")}`,
    bestTime      && `Best time to call: ${bestTime}`,
    message       && `Note: ${message}`,
  ].filter(Boolean).join(" | ");

  // ── Step 1: Create Family (parent/guardian account) ───────────────────────────
  let familyId;
  try {
    const familyRes = await fetch(apiUrl("/Families"), {
      method : "POST",
      headers: jsonHdrs,
      body   : JSON.stringify({
        FirstName : parentFirst ?? "",
        LastName  : parentLast,
        Email1    : email,
        Phone1    : phone?.replace(/\D/g, "") ?? "",
        Source    : howHeard ?? "Website",
        Notes     : notes,
      }),
    });

    // 409 = family with this email already exists in JackRabbit — treat as success
    if (familyRes.status === 409) {
      console.info("[jackrabbit] Family already registered:", email);
      return res.status(200).json({ success: true, note: "existing_family" });
    }

    if (!familyRes.ok) {
      const errBody = await familyRes.text();
      throw new Error(`Family creation failed [${familyRes.status}]: ${errBody}`);
    }

    const family = await familyRes.json();
    familyId = family.FamilyID ?? family.familyID ?? family.id;
    console.info("[jackrabbit] Family created — FamilyID:", familyId);
  } catch (err) {
    console.error("[jackrabbit] Family error:", err);
    return res.status(502).json({
      error: err instanceof Error ? err.message : "Family creation failed",
    });
  }

  // ── Step 2: Create Student under the family ───────────────────────────────────
  // Non-fatal — if family was created, the lead is captured regardless.
  if (childName && familyId) {
    try {
      const parts = childName.trim().split(/\s+/);
      const studentRes = await fetch(apiUrl("/Students"), {
        method : "POST",
        headers: jsonHdrs,
        body   : JSON.stringify({
          FamilyID  : familyId,
          FirstName : parts[0],
          LastName  : parts.length > 1 ? parts.slice(1).join(" ") : parentLast,
        }),
      });

      if (studentRes.ok) {
        const student = await studentRes.json();
        console.info("[jackrabbit] Student created — StudentID:", student.StudentID ?? student.id);
      } else {
        console.warn(`[jackrabbit] Student creation non-fatal (${studentRes.status}):`, await studentRes.text());
      }
    } catch (err) {
      console.warn("[jackrabbit] Student creation non-fatal error:", err);
    }
  }

  return res.status(200).json({ success: true, familyId });
}
