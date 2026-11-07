# Baagupadu — Search Engine Submission & Verification Guide

**Target Domain:** `https://baagupadu.com`  
**Target Search Engines:** Google Search, Bing (powers ChatGPT Search, Copilot, Yahoo, DuckDuckGo), Yandex  
**Document Classification:** Operations & Webmaster SOP  
**Author:** Principal Technical SEO Architect  
**Date:** November 7, 2026  

---

## 1. Google Search Console (Mandatory for Google Search & AI Overviews)

Because `site:baagupadu.com` currently yields **0 indexed pages**, completing Google Search Console verification is the single most critical external prerequisite to organic discoverability.

### Method A: Domain-Level Verification via DNS TXT (Recommended)
Domain verification covers all subdomains (`www`, root, future subdomains) and protocols (`http`, `https`):

1. **Access Google Search Console:**
   - Navigate to [search.google.com/search-console](https://search.google.com/search-console) and sign in with the official company Google account.
2. **Add Property:**
   - Under the property dropdown, select **Add Property**.
   - In the **Domain** box (left option), enter: `baagupadu.com` (do not include `https://` or trailing slashes).
   - Click **Continue**.
3. **Copy the DNS TXT Verification String:**
   - Google will generate a unique TXT record string (e.g., `google-site-verification=abc123xyz...`). Copy this exact string.
4. **Log in to Hostinger hPanel:**
   - Open [hpanel.hostinger.com](https://hpanel.hostinger.com).
   - Go to **Domains** → select `baagupadu.com` → click **DNS / Nameservers**.
5. **Add the TXT Record:**
   - Under **Manage DNS records**, fill out the fields:
     - **Type:** `TXT`
     - **Name / Host:** `@` (represents the root domain)
     - **TXT Value:** *(Paste the `google-site-verification` string copied from Google)*
     - **TTL:** `300` (5 minutes for rapid propagation)
   - Click **Add Record**.
6. **Complete Verification:**
   - Return to Google Search Console and click **Verify**.
   - *Note: DNS propagation typically takes between 2 to 15 minutes. If Google reports that the record was not found, wait 10 minutes and click Verify again.*

### Method B: Submitting the Sitemap & Requesting Indexing
Once ownership is verified:
1. **Submit XML Sitemap:**
   - On the left sidebar of Search Console, navigate to **Sitemaps**.
   - Under *Add a new sitemap*, enter: `sitemap.xml`.
   - Click **Submit**.
   - Verify that the status reports **Success** and displays 11 discovered pages.
2. **Request Priority Indexing for the Homepage:**
   - In the top search bar (*"Inspect any URL in 'baagupadu.com'"*), paste: `https://baagupadu.com`.
   - Press **Enter** to trigger live URL inspection.
   - Click **Test Live URL**.
   - Once the live test passes with *"URL is available to Google"*, click **Request Indexing**.
   - This places `https://baagupadu.com` into Google’s priority crawl queue.

> [!NOTE]
> **Realistic Indexing Timeline:** Google does not index brand-new domains instantaneously. Priority crawl requests typically result in initial homepage indexation within **24 to 72 hours**, with secondary subpages discovered over the subsequent 1 to 2 weeks.

---

## 2. Bing Webmaster Tools (Powers ChatGPT Search & Microsoft Copilot)

Bing Webmaster Tools feeds the live search index utilized by **ChatGPT Search**, **Microsoft Copilot**, **Yahoo**, and **DuckDuckGo**. Indexing in Bing is vital for Generative Engine Optimization (GEO).

### Step-by-Step 1-Click Synchronization:
1. **Access Bing Webmaster Tools:**
   - Navigate to [bing.com/webmasters](https://www.bing.com/webmasters).
   - Sign in using your Google or Microsoft account.
2. **Import from Google Search Console:**
   - On the welcome screen, select **Import your sites from GSC** (right option).
   - Click **Continue**.
   - Select the same Google account verified in Step 1.
   - Bing will automatically import `baagupadu.com`, verify ownership instantly, and import `sitemap.xml`.
3. **Verify Sitemaps:**
   - On the left navigation, click **Sitemaps**.
   - Confirm that `https://baagupadu.com/sitemap.xml` is listed and processing.
4. **Submit Homepage via URL Submission:**
   - Click **URL Submission** on the left menu.
   - Click **Submit URLs**.
   - Enter `https://baagupadu.com` and click **Submit**.

---

## 3. IndexNow Protocol Configuration

IndexNow is an open protocol created by Microsoft Bing and Yandex that allows websites to instantly inform search engines whenever content is published, updated, or deleted, bypassing traditional crawl delays.

### How IndexNow Operates:
```
[ New Article Published on Baagupadu ]
                  │
                  ▼
   [ POST request to IndexNow API ]
                  │
     ┌────────────┴────────────┐
     ▼                         ▼
[ Bing / Copilot ]         [ Yandex ]
(Crawled in minutes)      (Crawled in minutes)
```

### Setup Instructions:
1. **Generate an IndexNow API Key:**
   - Generate a 32-character hexadecimal key (e.g., via Bing Webmaster Tools or a standard UUID generator).
2. **Host the Key File:**
   - Place a text file named `{your-key}.txt` containing the key string inside `frontend/public/` so it is publicly accessible at `https://baagupadu.com/{your-key}.txt`.
3. **Automate Submission via Vercel Deploy Hook or API Call:**
   - Whenever new content is published, trigger an HTTP POST request:
     ```bash
     curl -X POST "https://api.indexnow.org/indexnow" \
          -H "Content-Type: application/json; charset=utf-8" \
          -d '{
            "host": "baagupadu.com",
            "key": "YOUR_INDEXNOW_KEY",
            "keyLocation": "https://baagupadu.com/YOUR_KEY.txt",
            "urlList": [
              "https://baagupadu.com",
              "https://baagupadu.com/research",
              "https://baagupadu.com/how-it-works"
            ]
          }'
     ```

---

## 4. Verification Troubleshooting & Diagnostic FAQ

### Issue: "DNS TXT record not found" in Google Search Console
- **Cause:** DNS propagation delay or incorrect Host field in Hostinger.
- **Fix:** In Hostinger hPanel, verify that the **Name** field is set to `@` (not `baagupadu.com` or `https://baagupadu.com`). Use a DNS lookup tool (e.g. `dig txt baagupadu.com +short` or `whatsmydns.net`) to verify that the TXT record has propagated globally.

### Issue: "Discovered - currently not indexed" in Search Console
- **Cause:** Google has discovered the URL but has not allocated crawl budget to render the page yet.
- **Fix:** This is standard for newly registered domains with low backlink authority. Ensure internal links point cleanly to the URL and execute the priority "Request Indexing" action on the parent page.

### Issue: "Page is not mobile-friendly" or "Text too small"
- **Cause:** Viewport meta tag missing or elements scaling beyond 100vw.
- **Fix:** Next.js 16 App Router handles `<meta name="viewport" content="width=device-width, initial-scale=1">` natively. Ensure Tailwind classes avoid fixed pixel widths (`w-[1200px]`) on mobile containers.

