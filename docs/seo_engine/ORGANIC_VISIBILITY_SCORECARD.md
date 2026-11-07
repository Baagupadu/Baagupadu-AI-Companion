# Baagupadu — Organic Visibility & Measurement Scorecard

**Focus:** Real Business Impact, Search Engine Telemetry & Verified Performance Metrics  
**Baseline Date:** November 7, 2026  
**Document Classification:** Analytics, Performance & Measurement Specification  
**Author:** Analytics & Conversion Optimization Engineer  

---

## 1. Principles of Measurement

Traditional SEO relies heavily on synthetic third-party scores (e.g. arbitrary "SEO Score: 95/100" or automated Lighthouse runs in isolation). Baagupadu rejects vanity metrics.

### Our Measurement Principles:
1. **First-Party Truth:** Rely on first-party search telemetry directly from Google Search Console, Bing Webmaster Tools, and server-side logs.
2. **Business Impact Over Pageviews:** Focus on qualified user engagements (e.g. student waitlist registrations, campus pilot inquiries, conversation starts) rather than untargeted traffic.
3. **Verified AI Citations:** Track empirical citation instances across Perplexity, ChatGPT Search, and Google AI Overviews rather than estimated "AI visibility percentages."
4. **Privacy-Respecting Telemetry:** Avoid intrusive third-party commercial pixels or ad trackers, strictly honoring India’s DPDP Act 2023.

---

## 2. Analytics & Measurement Infrastructure Audit

| Tool / Platform | Current State in Repository | Evaluation & Recommendation |
| :--- | :--- | :--- |
| **Google Search Console** | DNS verification instructions drafted; no HTML meta verification tag present. | Complete DNS TXT verification or add Next.js native `verification.google` token in `layout.tsx`. |
| **Bing Webmaster Tools** | Documented in playbook; not yet connected. | Import verified property from Google Search Console into Bing Webmaster Tools to power ChatGPT Search & Copilot. |
| **Google Analytics 4 (GA4)** | Not installed. | Optional. If installed, configure with IP anonymization, zero advertising cookies, and cookie banner consent gating. |
| **Vercel Web Analytics** | Supported by Vercel deployment infrastructure. | Recommended: Lightweight, zero-cookie, GDPR/DPDP compliant traffic telemetry built natively for Next.js. |
| **Vercel Speed Insights** | Supported by Vercel deployment infrastructure. | Recommended: Real User Monitoring (RUM) for live Core Web Vitals (INP, LCP, CLS) across real Indian networks and mobile devices. |
| **IndexNow Protocol** | Not configured. | Configure IndexNow automated webhook for instant page updates to Bing and Yandex upon publishing. |

---

## 3. High-Value Conversion Events

Rather than tracking raw page scrolling, conversion tracking focuses on high-intent actions:

```
[ Visitor Landing (Organic / AI Citation) ]
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
[ Schedule Campus  [ Join Student  [ Initiate
  Pilot Inquiry ]    Waitlist ]      Chat / Demo ]
```

| Event Name | Trigger Condition | Business Significance | Measurement Method |
| :--- | :--- | :--- | :--- |
| **`inquiry_campus_pilot`** | Clicks on "Schedule Campus Pilot" or sends email to `info@baagupadu.com` with Institutional subject. | High-value B2B institutional lead for colleges and placement cells. | Custom event tracking / outbound mailto link click. |
| **`waitlist_submission`** | Submits valid email in footer early access form. | Direct prospective student and early-adopter user acquisition. | Form submission handler state. |
| **`start_companion_demo`** | Clicks "Meet Your AI Companion" or navigates to `/chat`. | Core product engagement and self-discovery exploration. | Route transition event to `/chat`. |
| **`whitepaper_download_view`**| Spends $> 2$ minutes reading `/research` or copies architecture citations. | High-intent technical evaluation by researchers, developers, or partners. | Engaged reading time trigger. |

---

## 4. Empirical Baseline Scorecard (November 2026)

This scorecard establishes the documented baseline prior to executing technical updates:

| Dimension / Metric | Verified Baseline Value | 30-Day Target | 90-Day Target | Source of Truth |
| :--- | :--- | :--- | :--- | :--- |
| **Google Indexed Pages** | **0 Pages** | 11 Core Pages | 25+ Pages (with Roadmap) | Google Search Console (`site:baagupadu.com`) |
| **Bing Indexed Pages** | **0 Pages** | 11 Core Pages | 25+ Pages | Bing Webmaster Tools |
| **Branded Search Impressions** | Minimal / Secondary directories | $> 500$ monthly impressions | $> 3,000$ monthly impressions | Google Search Console Performance Report |
| **Non-Branded Query Impressions**| 0 | $> 1,000$ impressions | $> 10,000$ impressions | Google Search Console Performance Report |
| **Organic Clicks** | 0 | $> 100$ qualified clicks | $> 1,000$ qualified clicks | Search Console / Server Telemetry |
| **Verified AI Search Citations** | Cited via scrapers only (`aiunicorn.lol`)| Direct domain citations for brand queries | Top-3 citations for Purposeful AI Companion queries | Empirical probes in Perplexity & ChatGPT Search |
| **Largest Contentful Paint (LCP)** | ~1.8s (dev baseline) | $< 1.8\text{s}$ on mobile | $< 1.5\text{s}$ on mobile | Vercel Speed Insights (RUM) |
| **Cumulative Layout Shift (CLS)** | ~0.02 | $< 0.05$ | $< 0.02$ | Vercel Speed Insights (RUM) |
| **Interaction to Next Paint (INP)**| ~120ms | $< 150\text{ms}$ | $< 100\text{ms}$ | Vercel Speed Insights (RUM) |
| **Verified External Profiles** | GitHub, Medium active | Crunchbase, LinkedIn verified | Product Hunt upcoming page live | Public URL audits |

---

## 5. Ongoing Monitoring Cadence

- **Weekly Review (30 Minutes):**
  - Check Google Search Console for crawl errors, soft 404s, or index coverage drops.
  - Review Search Console search queries for new high-intent long-tail impressions.
  - Review Core Web Vitals telemetry in Vercel Speed Insights.
- **Monthly Review (60 Minutes):**
  - Execute repeatable AI visibility probes across Perplexity and ChatGPT Search.
  - Analyze student waitlist conversion rates and campus pilot inquiries.
  - Review technical changelog and update sitemap priorities based on newly published articles.

