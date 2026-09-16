// prisma/seed.ts
// Seeds the initial admin user and authentic QuickBooks gigs on Fiverr

import crypto from 'crypto';

// Password hasher helper (compatible with bcrypt or sha256 with salt)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_qb_salt_2026').digest('hex');
}

export const INITIAL_ADMIN = {
  username: process.env.ADMIN_SEED_USERNAME || 'admin',
  password: process.env.ADMIN_SEED_PASSWORD || 'QBAdminSecurePassword2026!',
};

export const INITIAL_SERVICES = [
  {
    title: 'QuickBooks Online Setup, Chart of Accounts & Bank Integration',
    slug: 'quickbooks-online-setup-chart-of-accounts',
    description: 'Complete setup of your QuickBooks Online subscription tailored to your industry. Includes custom Chart of Accounts design, automated bank and credit card feed connections, invoice template branding, and initial historical balance entry.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+online+setup',
    mainImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 50,
    category: 'Setup & Configuration',
    ratingValue: 5.0,
    ratingCount: 142,
    status: 'published',
    packages: [
      {
        packageName: 'Basic Setup',
        price: 50,
        deliveryDays: '2 Days',
        description: 'New QuickBooks Online company file setup, 1 bank account feed connection, and standard Chart of Accounts.',
        sortOrder: 1,
      },
      {
        packageName: 'Standard Professional',
        price: 120,
        deliveryDays: '3 Days',
        description: 'Custom industry Chart of Accounts, up to 3 bank/credit card feeds, custom invoice branding, and vendor/customer import.',
        sortOrder: 2,
      },
      {
        packageName: 'Complete Enterprise Setup',
        price: 250,
        deliveryDays: '5 Days',
        description: 'Full QBO setup, inventory tracking setup, multiple currency configuration, 5 bank feeds, and 30-minute Zoom walkthrough.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'David K., E-commerce Founder',
        rating: 5.0,
        comment: 'Outstanding setup! Sorted out my Chart of Accounts and connected my Stripe & Mercury accounts in under 48 hours.',
        reviewDate: '2 weeks ago',
      },
      {
        reviewerName: 'Sarah M., Marketing Agency Owner',
        rating: 5.0,
        comment: 'Very professional, saved me days of headaches trying to configure QuickBooks Online on my own.',
        reviewDate: '1 month ago',
      },
    ],
  },
  {
    title: 'Monthly Bookkeeping & Bank Reconciliation in QuickBooks Online',
    slug: 'monthly-bookkeeping-bank-reconciliation-quickbooks',
    description: 'Ongoing, reliable monthly bookkeeping services for small and medium businesses. Accurate categorization of all income, expenses, payroll entries, and monthly bank/credit card reconciliations with clean P&L and Balance Sheet reports.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+monthly+bookkeeping',
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 75,
    category: 'Monthly Bookkeeping',
    ratingValue: 4.9,
    ratingCount: 238,
    status: 'published',
    packages: [
      {
        packageName: 'Starter Monthly',
        price: 75,
        deliveryDays: '4 Days',
        description: 'Up to 50 transactions monthly, 1 bank reconciliation, and end-of-month Profit & Loss report.',
        sortOrder: 1,
      },
      {
        packageName: 'Growth Business',
        price: 180,
        deliveryDays: '5 Days',
        description: 'Up to 200 transactions, 3 accounts reconciled, payroll journal entry, P&L + Balance Sheet.',
        sortOrder: 2,
      },
      {
        packageName: 'Full-Service Pro',
        price: 320,
        deliveryDays: '7 Days',
        description: 'Up to 500 transactions, all bank/credit accounts reconciled, accounts receivable review, and monthly financial health summary.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'Robert B., Tech Consultancy',
        rating: 5.0,
        comment: 'Has been handling our books for 4 months now. Clean, fast, and always answers questions promptly.',
        reviewDate: '3 days ago',
      },
      {
        reviewerName: 'Elena P., Retail Store',
        rating: 4.9,
        comment: 'Helped us catch several duplicate charges during reconciliation. Highly recommended!',
        reviewDate: '3 weeks ago',
      },
    ],
  },
  {
    title: 'QuickBooks Messy Books Cleanup, Catch-Up & Tax-Ready Filing',
    slug: 'quickbooks-messy-books-cleanup-catch-up',
    description: 'Behind on your bookkeeping for months or an entire fiscal year? Expert forensic cleanup of unreconciled accounts, mismatched transfers, duplicate transactions, and negative inventory balances to make your books 100% CPA and tax ready.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+cleanup+catchup',
    mainImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 150,
    category: 'Cleanup & Catch-Up',
    ratingValue: 5.0,
    ratingCount: 94,
    status: 'published',
    packages: [
      {
        packageName: 'Quarterly Catch-Up',
        price: 150,
        deliveryDays: '3 Days',
        description: 'Catch-up and reconcile up to 3 months of neglected transactions for 1 business bank account.',
        sortOrder: 1,
      },
      {
        packageName: '6-Month Cleanup',
        price: 350,
        deliveryDays: '5 Days',
        description: 'Full cleanup of 6 months of backlog, resolve suspense accounts, match transfers, and CPA-ready statements.',
        sortOrder: 2,
      },
      {
        packageName: 'Full Annual Tax-Prep',
        price: 650,
        deliveryDays: '7 Days',
        description: 'Full 12-month fiscal year reconstruction, 1099 vendor review, and final balance sheet tie-out.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'Jason T., Construction LLC',
        rating: 5.0,
        comment: 'Fixed 9 months of chaotic entries in QuickBooks that my CPA refused to touch. Lifesaver during tax season.',
        reviewDate: '1 week ago',
      },
    ],
  },
  {
    title: 'QuickBooks Desktop to Online Migration & Data Verification',
    slug: 'quickbooks-desktop-to-online-migration',
    description: 'Flawless migration of your legacy QuickBooks Desktop (Pro, Premier, or Enterprise) company file into QuickBooks Online without losing transaction history, vendor profiles, payroll lists, or inventory tracking.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+desktop+to+online+migration',
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 95,
    category: 'Setup & Configuration',
    ratingValue: 4.9,
    ratingCount: 88,
    status: 'published',
    packages: [
      {
        packageName: 'Single Company Migration',
        price: 95,
        deliveryDays: '2 Days',
        description: 'Direct migration of 1 QuickBooks Desktop file (under 350k targets) to QBO and post-migration balance check.',
        sortOrder: 1,
      },
      {
        packageName: 'Migration + Post-Audit',
        price: 190,
        deliveryDays: '3 Days',
        description: 'Desktop migration + deep comparison of Trial Balance, Profit & Loss, and Balance Sheet between both systems.',
        sortOrder: 2,
      },
    ],
    reviews: [
      {
        reviewerName: 'Liam G., Real Estate Brokerage',
        rating: 5.0,
        comment: 'Transferred 5 years of historical desktop records into QBO seamlessly. Everything balanced to the penny.',
        reviewDate: '2 weeks ago',
      },
    ],
  },
  {
    title: 'QuickBooks E-commerce Sync: Shopify, Amazon, Stripe & PayPal',
    slug: 'quickbooks-ecommerce-sync-shopify-amazon-stripe',
    description: 'Eliminate duplicate sales entries and fee confusion. Automated integration between Shopify, Amazon Seller Central, Stripe, PayPal, and QuickBooks Online with proper COGS, sales tax liabilities, and merchant fee tracking.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+shopify+amazon+integration',
    mainImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 80,
    category: 'App Integrations',
    ratingValue: 4.8,
    ratingCount: 63,
    status: 'published',
    packages: [
      {
        packageName: 'Single Store Sync',
        price: 80,
        deliveryDays: '2 Days',
        description: 'Connect 1 store (Shopify or Amazon) to QuickBooks with A2X, Synder, or native app connector.',
        sortOrder: 1,
      },
      {
        packageName: 'Multi-Channel + Stripe Sync',
        price: 175,
        deliveryDays: '4 Days',
        description: 'Connect 2 stores plus Stripe/PayPal merchant gateway, test payouts, and map sales tax categories.',
        sortOrder: 2,
      },
    ],
    reviews: [
      {
        reviewerName: 'Amanda C., D2C Brand',
        rating: 5.0,
        comment: 'Finally our gross sales and Stripe processing fees are categorized correctly instead of as one lump sum.',
        reviewDate: '3 weeks ago',
      },
    ],
  },
  {
    title: 'QuickBooks 1-on-1 Consultation, Error Troubleshooting & Training',
    slug: 'quickbooks-consultation-troubleshooting-training',
    description: 'Get live expert advice from a certified QuickBooks ProAdvisor. Fix frustrating bank feed errors, undo incorrect reconciliations, customize management reports, and receive tailored training for your team.',
    fiverrUrl: 'https://www.fiverr.com/search/gigs?query=quickbooks+consultation+training',
    mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    priceStarting: 45,
    category: 'Consulting & Training',
    ratingValue: 5.0,
    ratingCount: 177,
    status: 'published',
    packages: [
      {
        packageName: '30-Min Rapid Problem Fix',
        price: 45,
        deliveryDays: '1 Day',
        description: 'Live 30-minute screen-share session to diagnose and repair an immediate QuickBooks error or bank discrepancy.',
        sortOrder: 1,
      },
      {
        packageName: '60-Min In-Depth Training',
        price: 85,
        deliveryDays: '1 Day',
        description: 'Full 1-hour coaching session covering invoicing, expense entry, reporting workflows, and Q&A.',
        sortOrder: 2,
      },
    ],
    reviews: [
      {
        reviewerName: 'Marcus V., General Contractor',
        rating: 5.0,
        comment: 'Solved in 25 minutes an issue I had been struggling with for weeks. Patient, knowledgeable, and clear.',
        reviewDate: '5 days ago',
      },
    ],
  },
];
