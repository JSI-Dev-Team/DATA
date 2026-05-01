"""
Contact form integration test — verifies:
  1. Form renders all required fields + honeypot
  2. Dance style pills toggle correctly
  3. JR function endpoint is called on submit
  4. Correct payload fields are sent to JackRabbit function
  5. Success state shown when JackRabbit succeeds
  6. Success state shown when JackRabbit fails but Web3Forms succeeds (fallback)
  7. Error state shown when both channels fail
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright
import json

BASE = "http://localhost:5176"
OUT  = "E:/Projects/DATA/dynamic-academy-site/test_screenshots"
import os; os.makedirs(OUT, exist_ok=True)

def snap(page, name, full=False):
    p = f"{OUT}/{name}.png"
    page.screenshot(path=p, full_page=full)
    print(f"  [screenshot] {p}")

def check(label, condition):
    status = "PASS" if condition else "FAIL"
    print(f"  [{status}] {label}")
    return condition

results = []

def fill_form(page, first="Sarah", last="Testfamily", email="sarah@example.com",
              phone="5065550199", child="Lily", age_index=2):
    """Fill the free trial form. age_index: 1=3-5, 2=6-8, 3=9-12, 4=13-18, 5=18+"""
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(300)
    page.locator("input[placeholder='Jane']").fill(first)
    page.locator("input[placeholder='Smith']").fill(last)
    page.locator("input[type='email']").fill(email)
    page.locator("input[type='tel']").fill(phone)
    page.locator("input[placeholder='Emma']").fill(child)
    page.locator("select").first.select_option(index=age_index)
    page.locator("button", has_text="Ballet").first.click()

def go_contact(page):
    page.goto(f"{BASE}/contact")
    page.wait_for_load_state("networkidle")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()

    # ── 1. Page load & form field presence ───────────────────────────────────────
    print("\n=== 1. PAGE LOAD & FORM FIELDS ===")
    go_contact(page)
    snap(page, "ct_01_page_load", full=True)

    results.append(check("Contact page loads", page.locator("h1").count() > 0))
    results.append(check("Hero has 'Dancer'", page.locator("text=Dancer").count() > 0))
    results.append(check("Form header visible", page.locator("text=Book Your Free Trial Class").count() > 0))
    results.append(check("Parent First Name input", page.locator("input[placeholder='Jane']").count() > 0))
    results.append(check("Parent Last Name input", page.locator("input[placeholder='Smith']").count() > 0))
    results.append(check("Email input", page.locator("input[type='email']").count() > 0))
    results.append(check("Phone input", page.locator("input[type='tel']").count() > 0))
    results.append(check("Child name input", page.locator("input[placeholder='Emma']").count() > 0))
    results.append(check("Age group select", page.locator("select").count() > 0))
    results.append(check("Submit button", page.locator("button[type='submit']").count() > 0))

    # ── 2. Honeypot ───────────────────────────────────────────────────────────────
    print("\n=== 2. HONEYPOT ===")
    results.append(check("Honeypot field exists", page.locator("input[name='website']").count() > 0))
    results.append(check("Honeypot is aria-hidden", page.locator("[aria-hidden='true'] input[name='website']").count() > 0))
    results.append(check("Honeypot tabIndex is -1", page.locator("input[name='website'][tabindex='-1']").count() > 0))

    # ── 3. Dance style pills ──────────────────────────────────────────────────────
    print("\n=== 3. DANCE STYLE PILLS ===")
    go_contact(page)
    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(300)
    ballet = page.locator("button", has_text="Ballet").first
    jazz   = page.locator("button", has_text="Jazz").first
    ballet.click(); jazz.click()
    results.append(check("Ballet pill active after click", "bg-purple-600" in (ballet.get_attribute("class") or "")))
    results.append(check("Jazz pill active after click",   "bg-purple-600" in (jazz.get_attribute("class") or "")))
    ballet.click()
    results.append(check("Ballet pill deactivates on second click", "bg-purple-600" not in (ballet.get_attribute("class") or "")))
    snap(page, "ct_02_pills", full=False)

    # ── 4. JackRabbit function called + payload fields verified ──────────────────
    print("\n=== 4. JACKRABBIT FUNCTION CALLED + PAYLOAD VERIFIED ===")
    go_contact(page)

    captured_jr_body = {}

    def intercept_jr_success(route):
        if "jackrabbit-register" in route.request.url:
            try:
                captured_jr_body.update(json.loads(route.request.post_data or "{}"))
            except Exception:
                pass
            route.fulfill(status=200, content_type="application/json",
                          body=json.dumps({"success": True, "familyId": 99001}))
        elif "web3forms.com" in route.request.url:
            route.fulfill(status=200, content_type="application/json",
                          body=json.dumps({"success": True}))
        else:
            route.continue_()

    page.route("**/*", intercept_jr_success)
    fill_form(page, first="Mike", last="Tester", email="mike.tester@example.com",
              phone="5065550101", child="Emma")

    # Select "How did you hear" (second select)
    selects = page.locator("select").all()
    if len(selects) >= 3:
        selects[2].select_option(index=2)  # e.g., "Instagram"

    page.locator("button[type='submit']").click()
    page.wait_for_timeout(2500)
    snap(page, "ct_03_jr_success_state", full=False)

    results.append(check("JackRabbit function called", bool(captured_jr_body)))
    results.append(check("Payload: parentFirst sent",  captured_jr_body.get("parentFirst") == "Mike"))
    results.append(check("Payload: parentLast sent",   captured_jr_body.get("parentLast")  == "Tester"))
    results.append(check("Payload: email sent",        captured_jr_body.get("email")        == "mike.tester@example.com"))
    results.append(check("Payload: childName sent",    captured_jr_body.get("childName")    == "Emma"))
    results.append(check("Payload: styles is a list",  isinstance(captured_jr_body.get("styles"), list)))
    results.append(check("Success state shown",        page.locator("text=Message sent").count() > 0))
    results.append(check("Success state shows name",   page.locator("text=Mike").count() > 0))
    results.append(check("Jackrabbit enroll link shown", page.locator("text=Register Now").count() > 0))

    page.unroute("**/*")

    # ── 5. Web3Forms fallback (JR fails, W3F succeeds) ────────────────────────────
    print("\n=== 5. FALLBACK: JR FAILS, WEB3FORMS SUCCEEDS ===")
    go_contact(page)

    w3f_called = {"v": False}

    def intercept_fallback(route):
        url = route.request.url
        if "jackrabbit-register" in url:
            route.fulfill(status=502, content_type="application/json",
                          body=json.dumps({"error": "JackRabbit API not enabled"}))
        elif "web3forms.com" in url:
            w3f_called["v"] = True
            route.fulfill(status=200, content_type="application/json",
                          body=json.dumps({"success": True, "message": "Email sent"}))
        else:
            route.continue_()

    page.route("**/*", intercept_fallback)
    fill_form(page, first="Anna", last="Fallback", email="anna@example.com", child="Zoe")
    page.locator("button[type='submit']").click()
    page.wait_for_timeout(2500)
    snap(page, "ct_04_fallback_w3f", full=False)

    results.append(check("Web3Forms called as fallback",       w3f_called["v"]))
    results.append(check("Success shown via Web3Forms fallback", page.locator("text=Message sent").count() > 0))
    page.unroute("**/*")

    # ── 6. Both channels fail → error state ──────────────────────────────────────
    print("\n=== 6. BOTH CHANNELS FAIL -> ERROR STATE ===")
    go_contact(page)

    def intercept_both_fail(route):
        url = route.request.url
        if "jackrabbit-register" in url or "web3forms.com" in url:
            route.fulfill(status=500, content_type="application/json",
                          body=json.dumps({"error": "Server down"}))
        else:
            route.continue_()

    page.route("**/*", intercept_both_fail)
    fill_form(page, first="Err", last="Test", email="err@example.com", child="Kid")
    page.locator("button[type='submit']").click()
    page.wait_for_timeout(2500)
    snap(page, "ct_05_both_fail_error", full=False)

    results.append(check("Error alert shown",           page.locator("[role='alert']").count() > 0))
    results.append(check("Success NOT shown on failure", page.locator("text=Message sent").count() == 0))
    page.unroute("**/*")

    browser.close()

# ── Summary ───────────────────────────────────────────────────────────────────
print("\n" + "=" * 52)
total  = len(results)
passed = sum(results)
failed = total - passed
print(f"RESULTS: {passed}/{total} passed  |  {failed} failed")
print("=" * 52)
if failed:
    sys.exit(1)
