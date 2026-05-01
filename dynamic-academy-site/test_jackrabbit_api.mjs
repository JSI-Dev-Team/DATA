/**
 * Direct JackRabbit API test — runs without Netlify CLI.
 * Validates credentials, endpoint reachability, and field mapping.
 *
 * Usage:  node test_jackrabbit_api.mjs
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// ── Load env vars from .env ────────────────────────────────────────────────────
const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), ".env");
const envVars = {};
try {
  readFileSync(envPath, "utf-8").split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  });
} catch {
  console.error("Could not read .env file");
  process.exit(1);
}

const API_KEY  = envVars.JACKRABBIT_API_KEY;
const BASE_URL = envVars.JACKRABBIT_BASE_URL ?? "https://app.jackrabbitclass.com/jr3.0/openapi";

const PASS = (msg) => console.log(`  [PASS] ${msg}`);
const FAIL = (msg) => { console.log(`  [FAIL] ${msg}`); failures++; };
const INFO = (msg) => console.log(`  [INFO] ${msg}`);

let failures = 0;

// ── Test data (uses timestamp to avoid duplicate-email 409s on repeated runs) ──
const ts = Date.now();
const TEST_FAMILY = {
  FirstName : "TestParent",
  LastName  : `TrialRun`,
  Email1    : `test.trial.${ts}@example.com`,
  Phone1    : "5065550199",
  Source    : "Website",
  Notes     : `Child age: 6-8 years | Dance interests: Ballet, Jazz | Auto test run ${ts}`,
};
const TEST_CHILD_FIRST = "TestChild";
const TEST_CHILD_LAST  = "TrialRun";

const apiUrl = (path) => `${BASE_URL}${path}?apikey=${encodeURIComponent(API_KEY)}`;
const jsonH  = { "Content-Type": "application/json", Accept: "application/json" };

async function run() {
  console.log("\n══════════════════════════════════════════════════");
  console.log("  JackRabbit API Integration Test");
  console.log("══════════════════════════════════════════════════");

  // ── 1. Env var check ──────────────────────────────────────────────────────────
  console.log("\n── 1. Config ────────────────────────────────────");
  if (API_KEY) {
    PASS(`JACKRABBIT_API_KEY loaded (${API_KEY.slice(0, 6)}...)`);
  } else {
    FAIL("JACKRABBIT_API_KEY is missing from .env");
    process.exit(1);
  }
  INFO(`BASE_URL: ${BASE_URL}`);

  // ── 2. Reachability check (GET /Families?$top=1) ──────────────────────────────
  console.log("\n── 2. Reachability ──────────────────────────────");
  try {
    const res = await fetch(`${BASE_URL}/Families?apikey=${encodeURIComponent(API_KEY)}&$top=1`, {
      headers: jsonH,
    });
    if (res.ok || res.status === 200) {
      PASS(`GET /Families responded ${res.status}`);
    } else if (res.status === 401) {
      FAIL(`GET /Families → 401 Unauthorized — check JACKRABBIT_API_KEY`);
      process.exit(1);
    } else {
      INFO(`GET /Families → ${res.status} (will continue)`);
    }
  } catch (err) {
    FAIL(`Network error reaching JackRabbit: ${err.message}`);
    process.exit(1);
  }

  // ── 3. Create Family ──────────────────────────────────────────────────────────
  console.log("\n── 3. Create Family ─────────────────────────────");
  INFO(`Email: ${TEST_FAMILY.Email1}`);

  let familyId;
  try {
    const res = await fetch(apiUrl("/Families"), {
      method  : "POST",
      headers : jsonH,
      body    : JSON.stringify(TEST_FAMILY),
    });

    const body = await res.text();
    let data;
    try { data = JSON.parse(body); } catch { data = body; }

    if (res.status === 409) {
      FAIL("409 Conflict — family with this email already exists (or API returned duplicate error)");
      INFO("Response: " + body);
      // Try to extract an existing FamilyID from the response
      familyId = data?.FamilyID ?? data?.familyID;
      if (!familyId) {
        INFO("Could not extract FamilyID from 409 — skipping student creation test");
      }
    } else if (res.ok) {
      familyId = data?.FamilyID ?? data?.familyID ?? data?.id;
      if (familyId) {
        PASS(`Family created — FamilyID: ${familyId}`);
        INFO(`Name:  ${data.FirstName ?? data.GuardianFirstName ?? "?"} ${data.LastName ?? "?"}`);
        INFO(`Email: ${data.Email1 ?? "?"}`);
      } else {
        FAIL("Family POST returned 200 but no FamilyID in response");
        INFO("Full response: " + JSON.stringify(data, null, 2));
      }
    } else {
      FAIL(`POST /Families → ${res.status}`);
      INFO("Response: " + body);
    }
  } catch (err) {
    FAIL(`POST /Families threw: ${err.message}`);
  }

  // ── 4. Create Student ─────────────────────────────────────────────────────────
  console.log("\n── 4. Create Student ────────────────────────────");
  if (!familyId) {
    INFO("Skipping — no FamilyID available");
  } else {
    try {
      const res = await fetch(apiUrl("/Students"), {
        method  : "POST",
        headers : jsonH,
        body    : JSON.stringify({
          FamilyID  : familyId,
          FirstName : TEST_CHILD_FIRST,
          LastName  : TEST_CHILD_LAST,
        }),
      });

      const body = await res.text();
      let data;
      try { data = JSON.parse(body); } catch { data = body; }

      if (res.ok) {
        const studentId = data?.StudentID ?? data?.studentID ?? data?.id;
        PASS(`Student created — StudentID: ${studentId ?? "unknown"}`);
        INFO(`Name: ${data?.FirstName ?? "?"} ${data?.LastName ?? "?"}`);
      } else {
        FAIL(`POST /Students → ${res.status}`);
        INFO("Response: " + body);
      }
    } catch (err) {
      FAIL(`POST /Students threw: ${err.message}`);
    }
  }

  // ── Summary ───────────────────────────────────────────────────────────────────
  console.log("\n══════════════════════════════════════════════════");
  const passed = (failures === 0);
  console.log(`RESULT: ${passed ? "ALL CHECKS PASSED" : `${failures} CHECK(S) FAILED`}`);
  if (familyId) {
    console.log(`\nVerify in JackRabbit admin:`);
    console.log(`  Families → search "${TEST_FAMILY.Email1}"`);
    console.log(`  FamilyID: ${familyId}`);
  }
  console.log("══════════════════════════════════════════════════\n");

  process.exit(passed ? 0 : 1);
}

run().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
