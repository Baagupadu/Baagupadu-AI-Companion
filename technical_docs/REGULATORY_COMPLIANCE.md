# REGULATORY COMPLIANCE & REGULATED SOFTWARE SPECIFICATION
**Baagupadu AI Career Guidance & Mentorship Platform**  
*Document Version: 1.0.0 | Status: Active Specification | Classification: Internal Engineering & Compliance*

---

## 1. Executive Summary & Assessment

This specification evaluates the legal, regulatory, and software compliance requirements governing the **Baagupadu AI Career Guidance Platform**. Because Baagupadu processes student personal data, career aspirations, demographic markers, and employs generative AI to provide automated guidance, it is subject to statutory data protection frameworks and AI governance regulations.

```
                      ┌─────────────────────────────────────────────────────────┐
                      │              BAAGUPADU COMPLIANCE STACK                │
                      └────────────────────────────┬────────────────────────────┘
                                                   │
         ┌─────────────────────────────────────────┼─────────────────────────────────────────┐
         │                                         │                                         │
         ▼                                         ▼                                         ▼
┌─────────────────────────┐               ┌─────────────────────────┐               ┌─────────────────────────┐
│     DATA PRIVACY        │               │      AI GOVERNANCE      │               │   SECURITY & LOGGING    │
│  DPDP Act 2023 (India)  │               │   EU AI Act (High-Risk) │               │   CERT-In Directives    │
│  FERPA & COPPA (Global) │               │   ISO/IEC 42001 (AIMS)  │               │   OWASP & SOC 2 Type II │
└─────────────────────────┘               └─────────────────────────┘               └─────────────────────────┘
```

### 1.1 Direct Assessment: Are We Using Regulated Software?
* **Current Status:** **Partially Compliant via Internal Controls; No External GRC Software Active.**
* **What is Active in Codebase:**
  * **PII Redaction Engine:** [`backend/core/pii_scrubber.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/pii_scrubber.py) sanitizes Indian phone numbers, emails, Aadhaar numbers, PAN cards, and credit cards before LLM dispatch.
  * **LLM Guardrails & Penetration Testing:** [`backend/agent/guardrail_agent.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/agent/guardrail_agent.py) and [`backend/tests/test_guardrail_redteam.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/tests/test_guardrail_redteam.py) prevent prompt theft, jailbreaking, and system prompt exfiltration.
  * **Audit Logging:** [`backend/models.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/models.py) persists user interactions and security events in PostgreSQL.
  * **Network & Transport Hardening:** Cloudflare Zero Trust tunnel, Clerk RS256 JWKS authentication, and OWASP security headers.
* **What is Missing:**
  * No external **GRC (Governance, Risk, and Compliance)** platform (e.g., Scrut, Sprinto, Vanta) is currently connected to automate continuous compliance monitoring.
  * No formal third-party statutory certifications (**ISO 27001**, **SOC 2 Type II**, or **ISO 42001**) have been conducted.

### 1.2 Is It Mandatory or Not?

| Operational Stage | Is External Compliance Software Mandatory? | Are Statutory Regulatory Rules Mandatory? |
| :--- | :--- | :--- |
| **Stage 1: MVP / Pilot / Academic Beta** *(Current)* | **NO.** Purchasing costly enterprise GRC tools ($5,000–$25,000/year) is not legally required at this stage. | **YES.** Statutory compliance with India's DPDP Act 2023 and IT Act 2000 is legally enforceable. Violations carry statutory penalties regardless of startup size. |
| **Stage 2: Institutional B2B Sales** *(Colleges, Schools, Universities)* | **YES.** Educational institutions legally require vendors to hold **SOC 2 Type II**, **ISO 27001**, and student data processing agreements before procurement. | **YES.** Data processing agreements (DPAs), parental consent audit trails for minors, and student record protections are legally binding. |

---

## 2. Applicable Regulatory Frameworks

### 2.1 India: Digital Personal Data Protection Act (DPDP Act 2023)
* **Governing Body:** Data Protection Board of India (DPBI).
* **Penalty:** Statutory fines up to **₹250 Crores (approx. $30M USD)** per incident for failing to protect personal data.
* **Mandatory Obligations for Baagupadu:**
  1. **Protection of Minor Data (Section 9):**
     * For users aged under 18 (e.g., 10th and 12th grade students), platforms **must not** undertake behavioral tracking, targeted profiling, or display advertisements.
     * Platforms must obtain verifiable consent from the parent/lawful guardian prior to processing minor data.
  2. **Data Minimization & Purpose Limitation:** Personal data collected (education stream, marks, district) must only be used for career guidance and not sold or shared with unvetted third parties.
  3. **Data Principal Rights:**
     * **Right to Access:** Students can view all stored guidance data and chat histories.
     * **Right to Erasure ("Right to be Forgotten"):** The platform must provide an automated mechanism for students to permanently delete their account and history.
     * **Right to Grievance Redressal:** A nominated Data Protection Officer (DPO) or grievance email must be published.

---

### 2.2 European Union: EU AI Act (Regulation (EU) 2024/1689)
The European Union AI Act establishes binding rules on artificial intelligence systems based on risk tiers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EU AI ACT RISK TIERS                            │
├────────────────────────────────┬───────────────────────────────────────┤
│ Unacceptable Risk              │ Cognitive manipulation, social scoring│
│ (Banned)                       │ (Prohibited)                          │
├────────────────────────────────┼───────────────────────────────────────┤
│ High-Risk AI Systems           │ Education, vocational training, career│
│ (Strict Compliance Mandate)   │ pathway assignment [ANNEX III, SEC 3] │
│                                │ ──► BAAGUPADU CLASSIFICATION          │
├────────────────────────────────┼───────────────────────────────────────┤
│ Specific Transparency Risk     │ Chatbots, synthetic content disclosure│
│ (Notification Required)        │                                       │
├────────────────────────────────┼───────────────────────────────────────┤
│ Minimal / Low Risk             │ Spam filters, video games             │
└────────────────────────────────┴───────────────────────────────────────┘
```

#### Why Baagupadu Falls Under "High-Risk AI Systems":
Under **Annex III, Section 3(a) & 3(b)** of the EU AI Act:
> *"AI systems intended to be used to determine access or admission or to assign natural persons to educational and vocational training institutions or programmes at all levels..."*
> *"AI systems intended to be used to evaluate learning outcomes, evaluate the appropriate level of education, or steer the student's learning pathway..."*

#### High-Risk AI Compliance Requirements for Baagupadu:
1. **Risk Management System (Article 9):** Continuous identification and mitigation of algorithmic bias or career misdirection.
2. **Data Governance (Article 10):** Training data and RAG retrieval sources must be audited against regional, socioeconomic, or gender bias.
3. **Technical Documentation & Logging (Articles 11 & 12):** Automatic logging of all agent executions, input queries, and model responses with audit timestamps.
4. **Transparency & Information (Article 13):** Clear disclosure to students that they are interacting with an AI system, detailing its capabilities and limitations.
5. **Human-in-the-Loop Oversight (Article 14):** Mechanism for human career counselors to review or override AI-generated roadmaps.
6. **Cybersecurity & Robustness (Article 15):** Resilience against prompt injection, jailbreaking, and data poisoning attacks.

---

### 2.3 United States: FERPA & COPPA (For International Expansion)
* **COPPA (Children’s Online Privacy Protection Act):**
  * Applies to children under 13. Requires verifiable parental consent before collecting personal information.
* **FERPA (Family Educational Rights and Privacy Act):**
  * Applies when partnering with US schools and universities. Student educational records cannot be disclosed without written consent.

---

### 2.4 India: CERT-In Cybersecurity Directives (April 2022)
* **Governing Body:** Indian Computer Emergency Response Team (CERT-In).
* **Mandatory 6-Hour Reporting:** Any cyber incident (data breach, unauthorized server access, system compromise) must be reported to CERT-In within **6 hours** of detection.
* **Log Retention Mandate:** ICT system logs (API access logs, firewall logs, user authentication records) must be securely maintained within the Indian jurisdiction for **180 rolling days**.

---

## 3. Regulated Software & Compliance Tooling Landscape

The following software categories and vendor platforms provide automated compliance enforcement:

### 3.1 Continuous GRC (Governance, Risk, and Compliance) Platforms

| Software Platform | Primary Coverage | Regional Fit | Description & Recommendation |
| :--- | :--- | :--- | :--- |
| **[Scrut Automation](https://www.scrut.io/)** | DPDP Act 2023, SOC 2 Type II, ISO 27001, ISO 42001 | **India & Global** | **Top Recommendation for India.** Native integration with Indian DPDP Act compliance, cloud posture monitoring (AWS/GCP), and automated evidence collection. |
| **[Sprinto](https://sprinto.com/)** | SOC 2 Type II, ISO 27001, GDPR, HIPAA | **India & Global** | Fast-track compliance automation engine tailored for SaaS and tech startups targeting fast institutional certification. |
| **[Vanta](https://www.vanta.com/)** | SOC 2 Type II, ISO 27001, GDPR | **North America & EU** | Global market leader in continuous automated compliance and vendor risk management. |
| **[Drata](https://drata.com/)** | SOC 2 Type II, ISO 27001, PCI-DSS | **Global Enterprise** | Real-time continuous audit platform with deep GitHub and CI/CD policy enforcement. |

---

### 3.2 AI Governance, Guardrails & LLMOps Compliance

| Tool / Technology | License Type | Compliance Purpose | Application in Baagupadu |
| :--- | :--- | :--- | :--- |
| **[Langfuse](https://langfuse.com/)** | Open-Source / Self-Hosted | EU AI Act Article 12 (Traceability & Logging) | Captures end-to-end LLM traces, prompt versions, latency, costs, and student interaction audits with zero data leakage. |
| **[Credo AI](https://www.credo.ai/)** | Commercial Enterprise | EU AI Act & NIST AI RMF Governance | Automated AI registry, model card generator, bias audits, and compliance documentation. |
| **[Holistic AI](https://www.holisticai.com/)** | Commercial Enterprise | ISO/IEC 42001 (AI Management System) | Algorithmic auditing for bias, fairness, transparency, and safety guardrail verification. |
| **[NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails)** | Open Source (Apache 2.0) | EU AI Act Article 15 (System Robustness) | Programmable rails to block toxic content, hallucination, and topical deviations. |

---

### 3.3 Privacy & Consent Management (CMP & DSAR)

| Tool / Technology | Function | Key Feature for EdTech |
| :--- | :--- | :--- |
| **[OneTrust](https://www.onetrust.com/)** | Enterprise Privacy Management | Complete DSAR (Data Subject Access Request) automation, parental consent workflows, and DPDP record keeping. |
| **[Ketch](https://www.ketch.com/)** | Programmatic Privacy API | Real-time consent orchestration across web clients, databases, and LLM pipelines. |
| **Custom DSAR Endpoint** *(Built-in)* | Self-Hosted In-App Erasure | Simple `DELETE /api/user/account` API endpoint that anonymizes and deletes student records on demand. |

---

### 3.4 Software Supply Chain & SBOM (Software Bill of Materials)

| Tool | License | Function |
| :--- | :--- | :--- |
| **[Syft](https://github.com/anchore/syft) + [Grype](https://github.com/anchore/grype)** | Open Source (Apache 2.0) | Generates SPDX/CycloneDX SBOM files in CI/CD and detects known CVEs across Python & Node packages. |
| **[FOSSA](https://fossa.com/)** | Commercial / Freemium | Scans all open-source dependencies to guarantee zero viral license contamination (e.g. AGPL/GPL). |

---

## 4. Current Baagupadu Architecture vs. Regulatory Requirements

### Gap Analysis Matrix

| Regulatory Requirement | Mandating Law | Current Technical Status | Implementation in Baagupadu Codebase | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PII Anonymization** | DPDP Act (Sec 8), GDPR | ✅ Active | Phone, Email, Aadhaar, PAN, and Card masking in [`backend/core/pii_scrubber.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/pii_scrubber.py) | **Compliant** |
| **Transport Encryption** | DPDP Act, OWASP | ✅ Active | TLS 1.3 enforced via Cloudflare Zero Trust Tunnel | **Compliant** |
| **Adversarial Jailbreak Defense** | EU AI Act (Art 15) | ✅ Active | Tested and verified in [`backend/tests/test_guardrail_redteam.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/tests/test_guardrail_redteam.py) | **Compliant** |
| **Cryptographic Authentication** | SOC 2 (CC6.1), OWASP | ✅ Active | Clerk RS256 JWKS validation via PyJWKClient | **Compliant** |
| **Audit Event Recording** | CERT-In, EU AI Act | 🟡 Partial | AuditLog database model active in [`backend/models.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/models.py); automated 180-day rotation pending | **Partial** |
| **Right to Erasure ("Delete Me")** | DPDP Act (Sec 12) | 🟡 Partial | Database cascade deletes configured; user-facing frontend delete button pending | **Pending UI** |
| **Parental Consent Flow** | DPDP Act (Sec 9) | 🔴 Missing | Formal parental consent gate for users under 18 not yet implemented in onboarding | **Action Required** |
| **Third-Party GRC Platform** | Institutional B2B | 🔴 Missing | No live connection to Scrut, Sprinto, or Vanta | **Action Required for B2B** |

---

## 5. Technical Implementation Blueprint

### 5.1 Architecture Data Flow with Privacy & Audit Controls

```
[ Student / User ]
       │
       ▼ (HTTPS / TLS 1.3)
[ Cloudflare Zero Trust ]
       │  - WAF DDoS Protection
       │  - OWASP Strict Headers
       ▼
[ FastAPI Backend (Port 8000) ]
       │
       ├──► [ 1. Clerk JWKS Auth Validator ] ────► Reject 401/403 if invalid
       │
       ├──► [ 2. PII Scrubber Engine ] ──────────► Scrub Aadhaar, Phone, Email
       │
       ├──► [ 3. Guardrail Agent (Safety) ] ─────► Reject Prompt Injections / Jailbreaks
       │
       ├──► [ 4. LangGraph Engine ] ─────────────► Agentic RAG / Career Guidance
       │
       ├──► [ 5. Audit Logger (PostgreSQL) ] ────► Persist user action & timestamps
       │
       └──► [ 6. PII Masked LLM Dispatch ] ──────► External LLM (OpenAI / Gemini / Ollama)
```

---

### 5.2 Implementation of DPDP Right-to-Erasure API Endpoint

Under Section 12 of the DPDP Act 2023, data principals have the right to demand erasure of their personal data. Below is the reference backend implementation to be added to [`backend/api.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/api.py):

```python
@app.delete("/api/user/account", status_code=status.HTTP_200_OK)
async def delete_user_account(
    user_id: str = Depends(get_current_user_id),
    db: AsyncSession = Depends(get_db)
):
    """
    DPDP Act 2023 Section 12 Compliance:
    Permanently erases student profile, chat history, and career roadmaps upon request.
    """
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User record not found")
    
    # Anonymize audit logs before record deletion
    await db.execute(
        update(AuditLog)
        .where(AuditLog.user_id == user_id)
        .values(user_id="ANONYMIZED_USER_DELETED")
    )
    
    # Delete user profile (cascades to conversations, roadmaps, and messages)
    await db.delete(user)
    await db.commit()
    
    return {"status": "success", "message": "All personal data successfully erased in compliance with DPDP Act 2023."}
```

---

### 5.3 CI/CD SBOM Generation (Software Bill of Materials)

To satisfy institutional vendor assessments, integrate automated SBOM generation in [`.github/workflows/security.yml`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/.github/workflows/security.yml):

```yaml
  sbom-generation:
    name: Generate Software Bill of Materials (SBOM)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Generate CycloneDX SBOM
        uses: anchore/sbom-action@v0
        with:
          format: cyclonedx-json
          output-file: "sbom.cyclonedx.json"

      - name: Archive SBOM Artifact
        uses: actions/upload-artifact@v4
        with:
          name: sbom-report
          path: sbom.cyclonedx.json
```

---

## 6. Phased Compliance Roadmap

```
PHASE 1 (Immediate / $0 Budget)  ──►  PHASE 2 (Pre-Institutional Launch) ──►  PHASE 3 (Commercial B2B)
 • PII Scrubber Active (Done)          • Publish DPDP-Compliant Privacy Policy  • Onboard Scrut Automation
 • Guardrail Red-Team (Done)           • "Delete My Account" in Frontend UI      • Formal SOC 2 Type II Audit
 • OWASP Security Headers (Done)       • Minor Age Gate & Parental Consent Flow  • Formal ISO 27001 Certification
 • CI/CD Bandit & Gitleaks (Done)      • 180-Day Encrypted Log Archival Policy   • ISO/IEC 42001 AI Certification
```

### Phase 1: Immediate Baseline (Completed / Zero Software Cost)
* Maintain all in-repo privacy filters ([`backend/core/pii_scrubber.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/core/pii_scrubber.py)).
* Maintain automated CI security and penetration tests ([`backend/tests/test_guardrail_redteam.py`](file:///Users/sreekarreddypindi/.gemini/antigravity-ide/scratch/Baagupadu-Career-Guidance-Coach-Assistant-Gem/backend/tests/test_guardrail_redteam.py)).
* Keep Gitleaks, Bandit, and dependency vulnerability scans active.

### Phase 2: Pre-Institutional Launch (Low Cost)
1. **Legal Documents:** Publish a compliant Privacy Policy, Terms of Service, and nominate a Data Protection Officer (DPO) email (`privacy@baagupadu.com`).
2. **Student Consent & Age Verification:** Add age confirmation during onboarding. If the student is under 18, require parent/guardian email verification.
3. **Right to Erasure UI:** Add a "Delete Account & History" button in the frontend profile settings.
4. **Log Retention:** Implement an automated rolling 180-day audit log archival job to fulfill Indian CERT-In guidelines.

### Phase 3: Commercial B2B Enterprise Rollout (Vendor Engagement)
1. **Onboard Scrut Automation or Sprinto:** Connect AWS/GCP, GitHub, and database to automate 80% of compliance evidence collection.
2. **Achieve SOC 2 Type II & ISO 27001 Certifications:** Engage an accredited auditor (via Scrut/Sprinto) to complete the official audit report.
3. **Adopt ISO/IEC 42001 (Artificial Intelligence Management System):** Certify Baagupadu's career guidance models against ethical AI and EU AI Act standards.
