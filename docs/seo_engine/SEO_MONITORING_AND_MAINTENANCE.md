# Baagupadu — SEO Monitoring & Continuous Maintenance Protocol

**System Target:** `https://baagupadu.com`  
**Document Classification:** Standard Operating Procedure (SOP) & Quality Assurance  
**Author:** Principal Technical SEO Architect & Analytics Lead  
**Date:** November 7, 2026  

---

## 1. Automated Regression Prevention Architecture

To prevent regressions (such as accidental `noindex` directives, missing metadata, broken canonical tags, or bloated JavaScript bundles), practical automated checks must be integrated into the engineering lifecycle.

### 1.1 Local & Pre-Commit Lint Checks
Before any code is committed, execute:
```bash
# In frontend directory:
npm run lint
```
Ensures:
- Unescaped HTML/JSX entities (`"`, `'`) are caught.
- Unused components and imports are stripped.
- Impure render calls (e.g. `Math.random()` in render paths) are caught.

### 1.2 Build Validation & Route Map Audit
Run production build:
```bash
# In frontend directory:
npm run build
```
Verify the Next.js App Router route output summary:
- Ensure all public marketing routes (`/`, `/about`, `/how-it-works`, `/mentors`, `/research`, `/manifesto`, `/careers`, `/press`, `/privacy`, `/terms`, `/cookies`) are marked as static (○) or SSG (●).
- Confirm that `/sitemap.xml` and `/robots.txt` generate without errors.
- Ensure private routes (`/chat`, `/api/*`) are protected behind middleware.

---

## 2. Recurring Maintenance Checklists

### 2.1 Weekly Maintenance Cadence (30 Minutes)

| Task | Execution Method | Target Criteria | Corrective Action if Failed |
| :--- | :--- | :--- | :--- |
| **Search Console Coverage** | Check GSC → **Pages** report. | Zero 5xx server errors; zero unexpected 404s. | Investigate server logs; fix broken redirects or route handlers. |
| **Robots & Indexing Hygiene** | Inspect `https://baagupadu.com/robots.txt`. | Directives intact; private routes disallowed; sitemap referenced. | Restore canonical `src/app/robots.ts` configuration. |
| **Sitemap XML Health** | Check GSC → **Sitemaps**. | Status: "Success"; all submitted URLs valid. | Remove deleted or renamed URLs from `src/app/sitemap.ts`. |
| **Inbound Query Tracking** | Check GSC → **Performance** → Queries. | Track growth in branded (`Baagupadu`, `బాగుపడు`) and category queries. | Identify high-impression queries with low CTR for title/description refinement. |
| **Conversion Integrity** | Review early-access submissions & contact logs. | Submissions processing without errors. | Test footer waitlist form and mailto links. |

---

### 2.2 Monthly Maintenance Cadence (60 Minutes)

| Task | Execution Method | Target Criteria | Corrective Action if Failed |
| :--- | :--- | :--- | :--- |
| **Core Web Vitals Telemetry** | Vercel Speed Insights & Chrome UX Report. | LCP $< 2.0\text{s}$, INP $< 150\text{ms}$, CLS $< 0.05$. | Optimize heavy assets; ensure WebGL canvases remain non-blocking. |
| **AI Answer Engine Probes** | Run standard test queries in Perplexity and ChatGPT Search. | Citations attribute directly to `baagupadu.com` with accurate descriptions. | Update `llms.txt`, enhance on-page direct-answer callouts, and verify entity links. |
| **Structured Data Validation** | Run core URLs through Google Rich Results Test. | Zero errors on `Organization`, `WebSite`, `TechArticle`. | Fix syntax or missing required fields in JSON-LD scripts. |
| **Internal Link Crawl** | Scan website for 404s or placeholder anchors (`href="#"`). | Zero broken links or dead anchor tags. | Update anchor destinations in `Navbar.tsx` and `Footer.tsx`. |
| **Bing Webmaster Audit** | Review Bing Webmaster Tools SEO Reports. | Zero high-severity SEO compliance warnings. | Address reported meta tag or HTML tag issues. |

---

### 2.3 Quarterly Strategic Reviews (90 Minutes)

| Task | Focus Area | Deliverable |
| :--- | :--- | :--- |
| **Topical Authority Refresh** | Review the 90-day Content Authority Roadmap against real search queries. | Prioritize upcoming technical articles based on demonstrated user interest. |
| **E-E-A-T & Trust Signal Review** | Review company disclosures, founder credentials, and privacy commitments. | Update `/about`, `/press`, and `/privacy` to reflect confirmed team updates and milestones. |
| **Competitive Gap Re-evaluation** | Inspect changes in Nomi, Replika, Mindler, and Rocky.ai positioning. | Refine asymmetric advantages and update comparison documentation. |
| **Regulatory & Privacy Alignment** | Review updates to India’s DPDP Act rules or CERT-In directives. | Ensure cookie policies, consent banners, and PII redactors remain strictly compliant. |

---

## 3. Post-Deployment Regression Checklist

Whenever a code change is deployed to production:
1. **Verify Live Response Code:**
   - Execute an HTTP HEAD request against `https://baagupadu.com`:
     - Confirm HTTP status `200 OK`.
     - Confirm `X-Robots-Tag` is NOT set to `noindex` on production.
     - Confirm security headers (`X-Frame-Options`, `X-Content-Type-Options`) are present.
2. **Verify Canonical Link:**
   - Inspect `<link rel="canonical" href="...">` in page source to ensure it matches the exact public URL.
3. **Verify Sitemaps and Robots:**
   - Load `https://baagupadu.com/sitemap.xml` in a browser.
   - Load `https://baagupadu.com/robots.txt` in a browser.
4. **Verify Structured Data:**
   - Inspect JSON-LD blocks to ensure no undefined variables or unescaped characters were rendered.
5. **Verify Mobile Navigation:**
   - Check landing page on a mobile viewport to ensure hamburger menus, sticky navbars, and buttons do not cause horizontal layout shifting.

