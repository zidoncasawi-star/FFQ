# QB Gig Finder — QuickBooks Fiverr Affiliate Directory

**QB Gig Finder** is a specialized, production-ready niche affiliate directory built for QuickBooks setup, bookkeeping, cleanup, and consulting services available on Fiverr.com.

---

## 1. Features

- **Niche Focus**: Strictly QuickBooks-related services on Fiverr (Online & Desktop setup, Chart of Accounts, monthly reconciliations, forensic cleanups, and e-commerce sync).
- **Graceful Fiverr Scraper with 3-Tier Extraction**:
  1. **Open Graph meta tags** (`og:title`, `og:description`, `og:image`)
  2. **JSON-LD structured data** (`Product`/`Service` schemas, `offers.price`, `aggregateRating`)
  3. **Deep script search** (safe regex search through embedded JSON blobs for packages and reviews)
  4. **Anti-Bot Resilience**: Handles HTTP 403 / Cloudflare / PerimeterX challenges with an immediate, non-blocking fallback to manual entry.
- **Admin Panel**:
  - Protected Single-Admin authentication (seeded via environment credentials).
  - **Single URL Extractor**: Paste a link, extract, review/edit the populated preview, and save.
  - **Bulk URLs Queue**: Paste multiple gig URLs, configure sequential delays (default 2s) to prevent IP rate-limiting, view live progress, and batch-save as drafts.
  - Full CRUD management of services, packages, and client feedback.
- **Public Directory**:
  - Search by title, keyword, or description.
  - Category selector pills.
  - Responsive cards with starting prices, star ratings, and review counts.
  - Detailed service view with tiered packages comparison matrix and outbound affiliate links (`rel="nofollow noopener"`).
  - Dynamic `sitemap.xml` route for search engine indexing.
- **Complete Legal Suite**:
  - `/terms` (Terms of Use)
  - `/privacy` (Privacy Policy)
  - `/affiliate-disclosure` (FTC Endorsement Guides compliance)
  - `/disclaimer` (QuickBooks®, Intuit®, and Fiverr® trademark disclaimers, plus no-financial-advice notices)
  - `/contact` (Interactive contact form + plain text email)

---

## 2. Tech Stack

- **Framework**: Next.js 14+ / React 19 / Express Full-Stack Server
- **Styling**: Tailwind CSS
- **Database / ORM**: Prisma ORM (SQLite for local development, PostgreSQL for Vercel/production)
- **Authentication**: NextAuth.js (Credentials provider)
- **Scraping**: Server-side extraction with `node-html-parser`

---

## 3. Local Development Setup

### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/qb-gig-finder.git
cd qb-gig-finder

# Install npm packages
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Review and adjust variables:
```env
# Local SQLite database
DATABASE_URL="file:./dev.db"

# NextAuth configuration
NEXTAUTH_SECRET="your-generated-random-secret-key-32-chars-min"
NEXTAUTH_URL="http://localhost:3000"

# Initial admin credentials
ADMIN_SEED_USERNAME="admin"
ADMIN_SEED_PASSWORD="QBAdminSecurePassword2026!"

# Contact form recipient
CONTACT_EMAIL_TO="contact@yourdomain.com"
```

### Step 3: Run Database Migrations and Seed
```bash
# Generate Prisma Client and apply migrations
npx prisma migrate dev --name init

# Seed the initial admin user and sample QuickBooks gigs
npx tsx prisma/seed.ts
```

### Step 4: Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser:
- Public Homepage: `http://localhost:3000`
- Admin Login: `http://localhost:3000/admin/login` (Username: `admin`, Password: `QBAdminSecurePassword2026!`)

---

## 4. Production Deployment to Vercel (PostgreSQL)

> **Important Note on SQLite vs. PostgreSQL**:
> Vercel's serverless environment uses an ephemeral, read-only filesystem. SQLite databases (`dev.db`) will be reset on every cold-start. For production deployments on Vercel, you **must connect a managed PostgreSQL database** (e.g., Vercel Postgres, Supabase, Neon, or Railway).

### Step 1: Provision a Managed Postgres Database
- **Option A (Vercel Postgres)**: In your Vercel project dashboard, navigate to the **Storage** tab and click **Create Database** > **Postgres**.
- **Option B (Supabase / Neon)**: Create a free Postgres database at [Supabase](https://supabase.com) or [Neon](https://neon.tech).

Copy your pooled PostgreSQL connection string:
```text
postgresql://postgres:[YOUR-PASSWORD]@db.xxxx.supabase.co:5432/postgres?sslmode=require
```

### Step 2: Switch the Prisma Provider
In `prisma/schema.prisma`, update the datasource:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 3: Deploy to Vercel
1. Push your repository to GitHub or GitLab.
2. In the Vercel dashboard, click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `NEXTAUTH_SECRET`: A secure 32+ character random string (generated via `openssl rand -base64 32`).
   - `NEXTAUTH_URL`: `https://your-production-domain.vercel.app`
   - `ADMIN_SEED_USERNAME`: Your preferred admin login.
   - `ADMIN_SEED_PASSWORD`: A strong password for the admin account.
   - `CONTACT_EMAIL_TO`: Your support email address.
4. Set the Build Command in Vercel to:
   ```bash
   prisma generate && prisma migrate deploy && npm run build
   ```
5. Click **Deploy**.

---

## 5. Completing Required Legal Placeholders

Before driving public or paid traffic to the site, inspect the 5 legal page files in `src/pages/legal/` and update all bracketed placeholders:

| Placeholder | Meaning | Where to Update |
|---|---|---|
| `[PLACEHOLDER: legal entity name]` | Your company or operating entity | `TermsPage.tsx`, `PrivacyPage.tsx`, `AffiliateDisclosurePage.tsx`, `DisclaimerPage.tsx` |
| `[PLACEHOLDER: jurisdiction]` | State/Country for governing law | `TermsPage.tsx` |
| `[PLACEHOLDER: contact email]` | Public inquiries email address | All 5 legal pages and `.env` (`CONTACT_EMAIL_TO`) |

---

## 6. Anti-Bot Scraping Architecture

Fiverr.com employs Cloudflare and PerimeterX bot management, which blocks direct server-side HTTP requests with `403 Forbidden`—especially from cloud datacenter IP ranges (AWS, GCP, Vercel).

**How QB Gig Finder handles this:**
1. Every scrape request returns a typed `{ success: boolean, error?: string, warning?: string, data?: ScrapedData }` result without throwing unhandled exceptions.
2. If Fiverr returns `403` or a bot challenge, the Admin UI displays an informative alert and immediately presents a **fully pre-formatted manual entry form**.
3. If title and description are extracted via Open Graph but package tables are blocked, the admin receives an inline warning banner and can review or enter package prices manually.
4. The Bulk URL extractor incorporates a sequential delay (default 2s) between URL fetches to prevent rapid-fire IP rate-limiting.

---

## 7. License & Disclaimers

- QuickBooks® and Intuit® are registered trademarks of Intuit Inc.
- Fiverr® is a registered trademark of Fiverr International Ltd.
- This repository and project are independent and have no official affiliation with either Intuit Inc. or Fiverr International Ltd.
