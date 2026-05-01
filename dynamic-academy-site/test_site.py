import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
from playwright.sync_api import sync_playwright
import os

BASE = "http://localhost:5173"
OUT  = "E:/Projects/DATA/dynamic-academy-site/test_screenshots"
os.makedirs(OUT, exist_ok=True)

def snap(page, name, full=True):
    path = f"{OUT}/{name}.png"
    page.screenshot(path=path, full_page=full)
    print(f"  [screenshot] {path}")

def check(label, condition):
    status = "PASS" if condition else "FAIL"
    print(f"  [{status}] {label}")
    return condition

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    # ── 1. HOME ──────────────────────────────────────────────────────────────
    print("\n=== HOME PAGE ===")
    page.goto(BASE)
    page.wait_for_load_state("networkidle")
    snap(page, "01_home")
    results.append(check("Home loads without error", "500" not in page.title() and page.title() != ""))

    # ── 2. NAVBAR LOGO ───────────────────────────────────────────────────────
    print("\n=== NAVBAR LOGO (white version) ===")
    logo = page.locator("header img").first
    src  = logo.get_attribute("src")
    results.append(check(f"Navbar uses white logo (got: {src})", "White" in (src or "")))

    # ── 3. ABOUT PAGE ────────────────────────────────────────────────────────
    print("\n=== ABOUT PAGE ===")
    page.goto(f"{BASE}/about")
    page.wait_for_load_state("networkidle")
    snap(page, "02_about_top")

    # Scroll to founders section and screenshot
    page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.6)")
    page.wait_for_timeout(600)
    snap(page, "03_about_founders", full=False)

    results.append(check("About page loads", page.locator("text=Two Visionaries").count() > 0))
    results.append(check("Slyvia Logan visible", page.locator("text=Slyvia Logan").count() > 0))
    results.append(check("Justin Saulnier visible", page.locator("text=Justin Saulnier").count() > 0))
    results.append(check("No 'Diane Arsenault' references remain", page.locator("text=Diane Arsenault").count() == 0))

    # Faculty CTA button
    faculty_btn = page.locator("a[href='/faculty']")
    results.append(check("'Meet Our Full Faculty' button present", faculty_btn.count() > 0))

    # ── 4. FACULTY PAGE ──────────────────────────────────────────────────────
    print("\n=== FACULTY PAGE ===")
    page.goto(f"{BASE}/faculty")
    page.wait_for_load_state("networkidle")
    snap(page, "04_faculty_hero")

    results.append(check("Faculty page loads", page.locator("h1").count() > 0))
    results.append(check("Heritage section visible", page.locator("text=Heritage Faculty").count() > 0))

    # Frank Augustyn
    results.append(check("Frank Augustyn card present", page.locator("text=Frank Augustyn").count() > 0))
    results.append(check("Frank — Order of Canada credential", page.locator("text=Officer of the Order of Canada").count() > 0))
    results.append(check("Frank — August 2024 badge", page.locator("text=Joined RBS").count() > 0))

    # Carolyn Zettel-Augustyn
    results.append(check("Carolyn Zettel-Augustyn card present", page.locator("text=Carolyn Zettel-Augustyn").count() > 0))
    results.append(check("Carolyn — ABT credential visible", page.locator("text=ABT").count() > 0))

    # Sylvia Logan legacy
    results.append(check("Sylvia Logan legacy card present", page.locator("text=Miss Sylvia Logan").count() > 0))
    results.append(check("Legacy Faculty badge present", page.locator("text=Legacy Faculty").count() > 0))

    # Scroll through and screenshot heritage section
    page.evaluate("window.scrollTo(0, 600)")
    page.wait_for_timeout(700)
    snap(page, "05_faculty_heritage_frank", full=False)

    page.evaluate("window.scrollTo(0, 1600)")
    page.wait_for_timeout(700)
    snap(page, "06_faculty_heritage_carolyn", full=False)

    page.evaluate("window.scrollTo(0, 2800)")
    page.wait_for_timeout(700)
    snap(page, "07_faculty_legacy_sylvia", full=False)

    # Current faculty grid
    page.evaluate("window.scrollTo(0, document.body.scrollHeight * 0.65)")
    page.wait_for_timeout(700)
    snap(page, "08_faculty_current_grid", full=False)

    results.append(check("Corissa Arseneau in current grid", page.locator("text=Corissa Arseneau").count() > 0))
    results.append(check("Justin Saulnier in current grid", page.locator("text=Justin Saulnier").count() > 0))
    results.append(check("Coming-soon placeholders present", page.locator("text=coming soon").count() > 0))

    # Full page shot
    snap(page, "09_faculty_fullpage")

    # ── 5. ABOUT → FACULTY NAVIGATION ────────────────────────────────────────
    print("\n=== NAVIGATION: About to Faculty ===")
    page.goto(f"{BASE}/about")
    page.wait_for_load_state("networkidle")
    # Scroll to founders section first
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(500)
    btn = page.locator("a[href='/faculty']").first
    btn.scroll_into_view_if_needed()
    snap(page, "10_about_faculty_button", full=False)
    btn.click()
    page.wait_for_load_state("networkidle")
    results.append(check("Button navigates to /faculty", "/faculty" in page.url))

    browser.close()

# ── Summary ──────────────────────────────────────────────────────────────────
print("\n" + "="*50)
total  = len(results)
passed = sum(results)
failed = total - passed
print(f"RESULTS: {passed}/{total} passed  |  {failed} failed")
if failed:
    sys.exit(1)
