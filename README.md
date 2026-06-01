# AI Auditor: Governance & Compliance for the AI Era

**The first enterprise-grade platform designed specifically for auditors and consultants to review AI programs against global standards.**

As AI adoption scales, so does the regulatory burden. **AI Auditor** streamlines the complex process of evaluating organizational AI maturity against frameworks like **NIST AI RMF 1.0** and **ISO/IEC 42001:2023**.

## 🚀 Why AI Auditor?

Auditing AI programs is currently a manual, fragmented process involving endless spreadsheets and disjointed evidence. AI Auditor centralizes governance, making audits faster, more accurate, and ready for certification.

### ✨ Key Features

- **Built-in Global Standards**: Pre-populated with the full hierarchical structures of NIST AI RMF and ISO 42001. No more manual data entry.
- **Hierarchical Control Mapping**: Navigate complex frameworks with ease. Drill down from high-level Functions to specific Subcategories and Annex A controls.
- **Evidence Management**: Link audit findings directly to internal documentation (SharePoint, Jira, Policy Docs) for a single source of truth.
- **Multi-User Collaboration**:
  - **Admins**: Manage the audit portfolio and standard frameworks.
  - **Auditors**: Execute reviews, assign statuses, and document findings.
  - **Clients**: Provide evidence and track their compliance journey.
- **Automated Gap Analysis**: Instantly generate professional compliance reports with scoring, visualizations, and actionable recommendations.
- **Print-Ready Reports**: Export audit results to PDF for board-level reporting or certification preparation.

## 🛠 Tech Stack

Built for security, speed, and local data sovereignty:
- **Next.js 15+** & **TypeScript**
- **Tailwind CSS** for a modern, responsive UI
- **Prisma & SQLite** for robust, portable data management
- **Lucide Icons** for a clean, professional aesthetic

## 🏁 Getting Started

### Prerequisites
- Node.js 22.x or later
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup the database:**
   ```bash
   npx prisma migrate dev --name init
   node prisma/seed.js
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Login:**
   - URL: `http://localhost:3000/login`
   - Credentials: `admin@example.com` / `password123`

## 📊 Roadmap

- [ ] **AI-Assisted Evidence Review**: Automatically summarize and verify uploaded documents.
- [ ] **EU AI Act Integration**: Support for the latest European regulatory requirements.
- [ ] **Custom Framework Builder**: Create your own internal compliance standards.
- [ ] **Cloud Storage Integration**: Direct upload for evidence documents.

---

*Empowering organizations to build trustworthy AI through rigorous, structured governance.*
