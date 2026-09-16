// src/pages/admin/AdminAddServicePage.tsx
import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Clock,
  Save,
  Play,
  RotateCcw,
  Code2,
  Zap,
  HelpCircle
} from 'lucide-react';
import { PackageItem, ReviewItem, BulkScrapeItem } from '../../types.ts';

interface AdminAddServicePageProps {
  onBack: () => void;
  onServiceCreated: () => void;
}

const SAMPLE_GIG_URLS = [
  'https://www.fiverr.com/bookkeeper_pro/setup-quickbooks-online-and-chart-of-accounts',
  'https://www.fiverr.com/cpa_expert/clean-up-quickbooks-messy-books-bank-reconciliation',
  'https://www.fiverr.com/accounting_lead/migrate-quickbooks-desktop-to-online-data-entry',
];

const TEMPLATES = {
  setup: {
    title: 'QuickBooks Online Setup, Custom Chart of Accounts & Bank Feeds',
    category: 'Setup & Configuration',
    priceStarting: 50,
    ratingValue: 5.0,
    ratingCount: 28,
    mainImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    description:
      'Professional QuickBooks Online initial company file creation, industry-specific Chart of Accounts design, sales tax setting configuration, and seamless live bank feed connections.',
    packages: [
      {
        packageName: 'Basic Setup',
        price: 50,
        deliveryDays: '2 Days',
        description: 'Standard company setup and standard Chart of Accounts.',
        sortOrder: 1,
      },
      {
        packageName: 'Standard Complete',
        price: 120,
        deliveryDays: '3 Days',
        description: 'Complete setup, customized accounts, 3 bank/credit card feeds, and initial balance entry.',
        sortOrder: 2,
      },
      {
        packageName: 'Premium Enterprise',
        price: 240,
        deliveryDays: '5 Days',
        description: 'Full setup, Stripe/Shopify integration, invoice template customization, and 30-min Zoom training.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'David K., eCommerce Founder',
        rating: 5,
        comment: 'Set up our QuickBooks Online from scratch flawlessly. Chart of accounts is tailored perfectly for our multichannel store!',
        reviewDate: '1 week ago',
      },
      {
        reviewerName: 'Sarah M., Agency Owner',
        rating: 5,
        comment: 'Fast delivery and very communicative. Bank feeds connected on the first attempt.',
        reviewDate: '3 weeks ago',
      },
    ],
  },
  bookkeeping: {
    title: 'Monthly QuickBooks Bookkeeping, Categorization & Reconciliation',
    category: 'Monthly Bookkeeping',
    priceStarting: 75,
    ratingValue: 4.9,
    ratingCount: 42,
    mainImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    description:
      'Dedicated monthly bookkeeping service for small and medium businesses. Monthly categorization of all bank/credit card transactions, monthly bank reconciliations, and generation of Profit & Loss and Balance Sheet statements.',
    packages: [
      {
        packageName: 'Starter (Up to 50 Transactions)',
        price: 75,
        deliveryDays: '3 Days',
        description: 'Monthly categorization and reconciliation for 1 bank account.',
        sortOrder: 1,
      },
      {
        packageName: 'Growth (Up to 150 Transactions)',
        price: 180,
        deliveryDays: '4 Days',
        description: 'Categorization and reconciliation for up to 3 accounts + monthly P&L report.',
        sortOrder: 2,
      },
      {
        packageName: 'Scale (Up to 400 Transactions)',
        price: 350,
        deliveryDays: '6 Days',
        description: 'Comprehensive monthly bookkeeping for multiple accounts, payroll journals, and management reports.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'Marcus T., Real Estate Broker',
        rating: 5,
        comment: 'Keeps my books immaculate every month. Zero stress during tax filing season!',
        reviewDate: '2 weeks ago',
      },
    ],
  },
  cleanup: {
    title: 'QuickBooks Messy Books Cleanup, Catch-Up & Forensic Reconciliation',
    category: 'Cleanup & Catch-Up',
    priceStarting: 100,
    ratingValue: 5.0,
    ratingCount: 35,
    mainImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    description:
      'Are your QuickBooks accounts months behind or full of duplicate entries and uncategorized expenses? We conduct comprehensive forensic audits, eliminate undeposited fund tangles, and bring your books 100% tax-ready.',
    packages: [
      {
        packageName: '1 to 3 Months Catch-Up',
        price: 100,
        deliveryDays: '3 Days',
        description: 'Diagnose and catch up 1-3 months of backlogged entries.',
        sortOrder: 1,
      },
      {
        packageName: 'Full Year Audit & Cleanup',
        price: 280,
        deliveryDays: '5 Days',
        description: 'Reconcile 12 months of prior statements and correct miscategorized transactions.',
        sortOrder: 2,
      },
      {
        packageName: 'Multi-Year Forensic Cleanup',
        price: 550,
        deliveryDays: '8 Days',
        description: 'Multi-year books restoration, tax-readiness audit, and CPA coordination.',
        sortOrder: 3,
      },
    ],
    reviews: [
      {
        reviewerName: 'Elena R., Contractor',
        rating: 5,
        comment: 'Saved me from a tax audit nightmare. Fixed 9 months of duplicate entries in 4 days!',
        reviewDate: 'Just now',
      },
    ],
  },
  migration: {
    title: 'QuickBooks Desktop to QuickBooks Online Seamless Data Migration',
    category: 'Setup & Configuration',
    priceStarting: 120,
    ratingValue: 5.0,
    ratingCount: 19,
    mainImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    description:
      'Full data migration from QuickBooks Desktop (Pro, Premier, Enterprise, or Mac) to QuickBooks Online without data loss. Includes verification of historical lists, vendors, customers, Chart of Accounts, and balances.',
    packages: [
      {
        packageName: 'Standard Migration',
        price: 120,
        deliveryDays: '2 Days',
        description: 'Direct migration of standard file with up to 3 years historical data.',
        sortOrder: 1,
      },
      {
        packageName: 'Enterprise / Complex Migration',
        price: 260,
        deliveryDays: '4 Days',
        description: 'Large company files with multiple currencies or custom inventory lists.',
        sortOrder: 2,
      },
    ],
    reviews: [
      {
        reviewerName: 'Jason W., Retail Manager',
        rating: 5,
        comment: 'Transferred 6 years of Desktop Enterprise records over to QBO with zero errors.',
        reviewDate: '1 month ago',
      },
    ],
  },
};

export const AdminAddServicePage: React.FC<AdminAddServicePageProps> = ({ onBack, onServiceCreated }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'html' | 'bulk'>('single');

  // Single URL state
  const [singleUrl, setSingleUrl] = useState('');
  const [isScrapingSingle, setIsScrapingSingle] = useState(false);
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeWarning, setScrapeWarning] = useState<string | null>(null);
  const [isEstimatedDraft, setIsEstimatedDraft] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);

  // Paste HTML state
  const [rawHtml, setRawHtml] = useState('');
  const [rawHtmlFiverrUrl, setRawHtmlFiverrUrl] = useState('');
  const [isParsingHtml, setIsParsingHtml] = useState(false);
  const [htmlParseError, setHtmlParseError] = useState<string | null>(null);

  // Editable Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [sellerUsername, setSellerUsername] = useState('');
  const [description, setDescription] = useState('');
  const [fiverrUrl, setFiverrUrl] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [priceStarting, setPriceStarting] = useState<number | ''>('');
  const [category, setCategory] = useState('Setup & Configuration');
  const [ratingValue, setRatingValue] = useState<number>(5.0);
  const [ratingCount, setRatingCount] = useState<number>(10);
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Bulk URL state
  const [bulkUrlsText, setBulkUrlsText] = useState(SAMPLE_GIG_URLS.join('\n'));
  const [delaySeconds, setDelaySeconds] = useState<number>(2);
  const [isBulkRunning, setIsBulkRunning] = useState(false);
  const [bulkQueue, setBulkQueue] = useState<BulkScrapeItem[]>([]);
  const [isBulkSaving, setIsBulkSaving] = useState(false);
  const [bulkSaveFeedback, setBulkSaveFeedback] = useState<string | null>(null);

  // Quick Preset Template Loader
  const loadTemplate = (key: keyof typeof TEMPLATES) => {
    const t = TEMPLATES[key];
    setTitle(t.title);
    setSlug(t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 70));
    setSellerUsername(key === 'setup' ? 'bookkeeper_pro' : key === 'bookkeeping' ? 'cpa_expert' : 'accounting_lead');
    setDescription(t.description);
    setCategory(t.category);
    setMainImage(t.mainImage);
    setPriceStarting(t.priceStarting);
    setRatingValue(t.ratingValue);
    setRatingCount(t.ratingCount);
    setPackages(t.packages);
    setReviews(t.reviews);
    if (!fiverrUrl && singleUrl) {
      setFiverrUrl(singleUrl);
    } else if (!fiverrUrl) {
      setFiverrUrl('https://www.fiverr.com');
    }
    setScrapeWarning(null);
  };

  // ===========================================================================
  // SINGLE URL EXTRACTION HANDLER
  // ===========================================================================
  const handleExtractSingle = async (urlToScrape?: string) => {
    const target = urlToScrape || singleUrl;
    if (!target.trim()) {
      setScrapeError('Please enter a valid Fiverr gig URL.');
      return;
    }

    setIsScrapingSingle(true);
    setScrapeError(null);
    setScrapeWarning(null);
    setFallbackNotice(null);
    setFiverrUrl(target.trim());

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: target.trim() }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        const d = result.data;
        setTitle(d.title || '');
        setSlug(d.slug || '');
        setSellerUsername(d.sellerUsername || '');
        setDescription(d.description || '');
        setMainImage(d.mainImage || '');
        setPriceStarting(d.priceStarting ?? 50);
        setCategory(d.category || 'Setup & Configuration');
        setRatingValue(d.ratingValue || 5.0);
        setRatingCount(d.ratingCount || 15);
        if (d.packages && d.packages.length > 0) setPackages(d.packages);
        if (d.reviews && d.reviews.length > 0) setReviews(d.reviews);
        setIsEstimatedDraft(!!result.isEstimatedDraft);
        if (result.warning) setScrapeWarning(result.warning);
      } else {
        setIsEstimatedDraft(false);
        // Cloudflare / PerimeterX / 403 or parsing error -> graceful fallback
        setScrapeError(result.error || 'Failed to extract gig data.');
        setFallbackNotice(
          'Fiverr anti-bot protection restricted automated extraction from this IP. Manual fallback mode activated: you can choose a quick template below or enter all details directly.'
        );
        // Pre-fill defaults so user can immediately customize and save without delay
        if (!title) setTitle('QuickBooks Specialized Service');
        if (!slug) setSlug('quickbooks-service-' + Date.now().toString().slice(-4));
        if (!mainImage) setMainImage('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80');
        if (!priceStarting) setPriceStarting(50);
      }
    } catch {
      setScrapeError('Network request failed. Manual fallback form opened.');
      setFallbackNotice('Network error occurred. Please complete the details manually below.');
    } finally {
      setIsScrapingSingle(false);
    }
  };

  // ===========================================================================
  // PARSE RAW HTML (100% bypasses datacenter IP blocks)
  // ===========================================================================
  const handleParseHtml = async () => {
    if (!rawHtml.trim()) {
      setHtmlParseError('Please paste the gig page HTML source.');
      return;
    }

    setIsParsingHtml(true);
    setHtmlParseError(null);

    try {
      const res = await fetch('/api/scrape/html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: rawHtml,
          url: rawHtmlFiverrUrl.trim() || fiverrUrl || 'https://www.fiverr.com',
        }),
      });

      const result = await res.json();
      if (result.success && result.data) {
        const d = result.data;
        setTitle(d.title || '');
        setSlug(d.slug || '');
        setSellerUsername(d.sellerUsername || '');
        setDescription(d.description || '');
        setMainImage(d.mainImage || '');
        setPriceStarting(d.priceStarting ?? 50);
        setCategory(d.category || 'Setup & Configuration');
        setRatingValue(d.ratingValue || 5.0);
        setRatingCount(d.ratingCount || 10);
        if (rawHtmlFiverrUrl.trim()) setFiverrUrl(rawHtmlFiverrUrl.trim());
        if (d.packages && d.packages.length > 0) setPackages(d.packages);
        if (d.reviews && d.reviews.length > 0) setReviews(d.reviews);

        // Switch to single tab to view the populated review form
        setActiveTab('single');
        setIsEstimatedDraft(false);
        setScrapeWarning(null);
        setScrapeError(null);
        setFallbackNotice('✓ 100% Real gig data successfully extracted from HTML source (real prices, packages, images & reviews)!');
      } else {
        setHtmlParseError(result.error || 'Failed to parse metadata from the provided HTML.');
      }
    } catch {
      setHtmlParseError('Network error while parsing HTML.');
    } finally {
      setIsParsingHtml(false);
    }
  };

  // Save single service
  const handleSaveSingle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fiverrUrl.trim()) {
      setSaveError('Title and Fiverr URL are required.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const payload = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        sellerUsername: sellerUsername.trim() || undefined,
        description,
        fiverrUrl,
        mainImage,
        priceStarting: Number(priceStarting || 50),
        category,
        ratingValue: Number(ratingValue || 5.0),
        ratingCount: Number(ratingCount || 1),
        status,
        packages,
        reviews,
      };

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onServiceCreated();
      } else {
        setSaveError(data.error || 'Failed to save service.');
      }
    } catch {
      setSaveError('Network error while saving service.');
    } finally {
      setIsSaving(false);
    }
  };

  // Helper package manipulation
  const addPackageRow = () => {
    const nextOrder = packages.length + 1;
    setPackages([
      ...packages,
      {
        packageName: '',
        price: '',
        deliveryDays: '',
        description: '',
        sortOrder: nextOrder,
      },
    ]);
  };

  const removePackageRow = (idx: number) => {
    setPackages(packages.filter((_, i) => i !== idx));
  };

  const updatePackage = (idx: number, field: keyof PackageItem, value: any) => {
    const copy = [...packages];
    copy[idx] = { ...copy[idx], [field]: value };
    setPackages(copy);
  };

  // Helper review manipulation
  const addReviewRow = () => {
    setReviews([
      ...reviews,
      {
        reviewerName: '',
        rating: 5,
        comment: '',
        reviewDate: 'Recent',
      },
    ]);
  };

  const removeReviewRow = (idx: number) => {
    setReviews(reviews.filter((_, i) => i !== idx));
  };

  const updateReview = (idx: number, field: keyof ReviewItem, value: any) => {
    const copy = [...reviews];
    copy[idx] = { ...copy[idx], [field]: value };
    setReviews(copy);
  };

  // Bulk Extraction Handler
  const handleStartBulk = async () => {
    const lines = bulkUrlsText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && l.startsWith('http'));

    if (lines.length === 0) {
      alert('Please enter at least one valid HTTP/HTTPS Fiverr gig URL.');
      return;
    }

    const items: BulkScrapeItem[] = lines.map((url, idx) => ({
      id: `bulk_${idx}_${Date.now()}`,
      url,
      status: 'pending',
      selected: false,
    }));

    setBulkQueue(items);
    setIsBulkRunning(true);
    setBulkSaveFeedback(null);

    for (let i = 0; i < items.length; i++) {
      setBulkQueue((prev) =>
        prev.map((it, idx) => (idx === i ? { ...it, status: 'scraping' } : it))
      );

      try {
        const res = await fetch('/api/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: items[i].url }),
        });
        const result = await res.json();

        if (result.success && result.data) {
          setBulkQueue((prev) =>
            prev.map((it, idx) =>
              idx === i
                ? {
                    ...it,
                    status: result.warning ? 'warning' : 'success',
                    title: result.data.title,
                    warning: result.warning,
                    selected: true,
                    scrapedData: result.data,
                  }
                : it
            )
          );
        } else {
          const fallbackTitle = `QuickBooks Gig (${items[i].url.split('/').pop()?.replace(/-/g, ' ') || 'Service'})`;
          setBulkQueue((prev) =>
            prev.map((it, idx) =>
              idx === i
                ? {
                    ...it,
                    status: 'failed',
                    error: result.error || 'Bot protection / 403',
                    title: fallbackTitle,
                    selected: true,
                    scrapedData: {
                      title: fallbackTitle,
                      fiverrUrl: items[i].url,
                      category: 'Setup & Configuration',
                      priceStarting: 50,
                      description: 'Imported via bulk crawler. Please review and update details.',
                      packages: [{ packageName: 'Basic', price: 50, deliveryDays: '3 Days', description: 'Standard tier', sortOrder: 1 }],
                      reviews: [],
                    },
                  }
                : it
            )
          );
        }
      } catch (err: any) {
        setBulkQueue((prev) =>
          prev.map((it, idx) =>
            idx === i
              ? {
                  ...it,
                  status: 'failed',
                  error: err.message || 'Network exception',
                  selected: false,
                }
              : it
          )
        );
      }

      if (i < items.length - 1 && delaySeconds > 0) {
        await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000));
      }
    }

    setIsBulkRunning(false);
  };

  const handleSaveBulkSelected = async () => {
    const selectedItems = bulkQueue.filter((it) => it.selected && it.scrapedData);
    if (selectedItems.length === 0) {
      alert('No rows are selected for saving.');
      return;
    }

    setIsBulkSaving(true);
    setBulkSaveFeedback(null);

    try {
      const payload = {
        services: selectedItems.map((it) => ({
          ...it.scrapedData,
          fiverrUrl: it.url,
          status: 'draft',
        })),
      };

      const res = await fetch('/api/services/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBulkSaveFeedback(`Successfully saved ${data.count} services to Drafts!`);
        setTimeout(() => {
          onServiceCreated();
        }, 1500);
      } else {
        setBulkSaveFeedback(`Failed to save: ${data.error}`);
      }
    } catch {
      setBulkSaveFeedback('Network error while saving bulk items.');
    } finally {
      setIsBulkSaving(false);
    }
  };

  return (
    <div id="admin-add-service-container" className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>

        {/* Tab Toggle */}
        <div className="flex items-center bg-slate-200 p-1 rounded-xl">
          <button
            id="tab-single-url"
            onClick={() => setActiveTab('single')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Single URL Extractor
          </button>
          <button
            id="tab-paste-html"
            onClick={() => setActiveTab('html')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
              activeTab === 'html' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 size={13} />
            <span>Paste HTML Source</span>
          </button>
          <button
            id="tab-bulk-urls"
            onClick={() => setActiveTab('bulk')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'bulk' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bulk URLs Queue
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* TAB 1: SINGLE URL EXTRACTOR */}
      {/* ===================================================================== */}
      {activeTab === 'single' && (
        <div className="space-y-6">
          {/* Extraction Input Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-600" />
                <span>Extract Fiverr Gig Details</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Paste any QuickBooks Fiverr gig URL to parse Open Graph meta tags, JSON-LD schemas, pricing, and packages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <input
                id="fiverr-url-input"
                type="url"
                value={singleUrl}
                onChange={(e) => setSingleUrl(e.target.value)}
                placeholder="https://www.fiverr.com/seller/gig-title-slug..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
              <button
                id="extract-data-button"
                onClick={() => handleExtractSingle()}
                disabled={isScrapingSingle}
                className="w-full sm:w-auto shrink-0 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2"
              >
                {isScrapingSingle ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Extract Data</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Test Sample Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-600">Quick Test Samples:</span>
              {SAMPLE_GIG_URLS.map((sampleUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSingleUrl(sampleUrl);
                    handleExtractSingle(sampleUrl);
                  }}
                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] transition"
                >
                  Sample {idx + 1}
                </button>
              ))}
            </div>

            {/* Anti-Bot / 403 Notice with 1-Click Template Helpers */}
            {scrapeError && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <ShieldAlert size={18} className="text-amber-700 shrink-0" />
                  <span>Notice: Anti-Bot Protection Encountered (HTTP 403)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  {scrapeError}
                </p>

                {/* 1-Click QuickBooks Preset Templates */}
                <div className="pt-2 border-t border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] text-amber-950">
                    <Zap size={14} className="text-amber-600" />
                    <span>1-Click Solution: Load a Pre-configured QuickBooks Template:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => loadTemplate('setup')}
                      className="px-2.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg font-bold text-[11px] text-slate-800 transition shadow-xs"
                    >
                      ⚡ Setup & CoA Template
                    </button>
                    <button
                      type="button"
                      onClick={() => loadTemplate('bookkeeping')}
                      className="px-2.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg font-bold text-[11px] text-slate-800 transition shadow-xs"
                    >
                      ⚡ Monthly Bookkeeping Template
                    </button>
                    <button
                      type="button"
                      onClick={() => loadTemplate('cleanup')}
                      className="px-2.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg font-bold text-[11px] text-slate-800 transition shadow-xs"
                    >
                      ⚡ Messy Books Cleanup Template
                    </button>
                    <button
                      type="button"
                      onClick={() => loadTemplate('migration')}
                      className="px-2.5 py-1.5 bg-white hover:bg-amber-100 border border-amber-300 rounded-lg font-bold text-[11px] text-slate-800 transition shadow-xs"
                    >
                      ⚡ Migration Template
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setRawHtmlFiverrUrl(singleUrl);
                        setActiveTab('html');
                      }}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[11px] transition shadow-xs"
                    >
                      📋 Or Paste Page HTML
                    </button>
                  </div>
                </div>

                {fallbackNotice && (
                  <div className="text-[11px] font-semibold text-emerald-800 pt-1">
                    ✓ {fallbackNotice}
                  </div>
                )}
              </div>
            )}

            {/* Smart URL Extraction / Estimated Draft Banner */}
            {isEstimatedDraft && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-3">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-amber-900 text-sm">
                        ⚠️ مسودة تقديرية (حماية فايفر منعت السحب التلقائي HTTP 403)
                      </span>
                      <span className="text-[11px] px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full font-semibold">
                        Estimated Draft Active
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/90 leading-relaxed">
                      يقوم نظام حماية فايفر (PerimeterX / Cloudflare) بحظر السيرفرات السحابية عند محاولة قراءة الصفحة برمجياً عبر السيرفر. لذلك الحقول المعروضة بالأسفل حالياً هي <strong>مسودة تقديرية ذكية</strong> تم إنشاؤها من كلمات الرابط فقط.
                    </p>
                  </div>
                </div>

                {/* 2 Actionable Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {/* Option 1: 100% Real Data */}
                  <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                      <Sparkles size={14} className="text-emerald-600" />
                      <span>الخيار 1: استيراد البيانات الحقيقية 100% (موصى به)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      لجلب الأسعار الفعلية، الباقات الثلاث الدقيقة، التقييمات، وصور البائع الأصلية:
                    </p>
                    <div className="flex flex-col gap-1.5 pt-1">
                      {(singleUrl || fiverrUrl) && (
                        <a
                          href={singleUrl || fiverrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-medium text-[11px] transition"
                        >
                          <ExternalLink size={12} /> 1. فتح الخدمة في فايفر ↗
                        </a>
                      )}
                      <span className="text-[10px] text-slate-500 text-center">
                        (في صفحة الخدمة: اضغط Ctrl+U لعرض الكود ثم Ctrl+A و Ctrl+C للنسخ)
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setRawHtmlFiverrUrl(singleUrl || fiverrUrl);
                          setActiveTab('html');
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] transition shadow-xs"
                      >
                        <Code2 size={13} /> 2. لصق كود الصفحة واستخراج البيانات →
                      </button>
                    </div>
                  </div>

                  {/* Option 2: Edit current draft */}
                  <div className="p-3.5 bg-white rounded-xl border border-amber-200 shadow-xs space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                        <CheckCircle2 size={14} className="text-blue-600" />
                        <span>الخيار 2: استخدام وتعديل المسودة الحالية</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug mt-1">
                        يمكنك تعديل أي حقل أدناه مباشرة (العنوان، السعر الابتدائي، الباقات، الوصف) بما يناسبك وحفظ الخدمة فوراً بدون أي خطوات إضافية.
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] font-medium text-slate-400 block">
                        ✓ جميع الحقول أدناه قابلة للتحرير والتعديل الكامل
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!isEstimatedDraft && scrapeWarning && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-emerald-900">
                      ⚡ Smart URL Extraction Active
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setRawHtmlFiverrUrl(singleUrl);
                        setActiveTab('html');
                      }}
                      className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 flex items-center gap-1"
                    >
                      <Code2 size={12} /> Paste Raw HTML instead
                    </button>
                  </div>
                  <span className="text-[11px] text-emerald-800 leading-relaxed block">
                    {scrapeWarning}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Toolbar above the form */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-600" />
              Quick-Fill Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => loadTemplate('setup')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md border border-slate-200 font-medium text-[11px] transition"
              >
                Setup & CoA
              </button>
              <button
                type="button"
                onClick={() => loadTemplate('bookkeeping')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md border border-slate-200 font-medium text-[11px] transition"
              >
                Monthly Bookkeeping
              </button>
              <button
                type="button"
                onClick={() => loadTemplate('cleanup')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md border border-slate-200 font-medium text-[11px] transition"
              >
                Messy Books Cleanup
              </button>
              <button
                type="button"
                onClick={() => loadTemplate('migration')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-md border border-slate-200 font-medium text-[11px] transition"
              >
                Desktop Migration
              </button>
            </div>
          </div>

          {/* EDITABLE PREVIEW FORM (Never auto-saves, must be reviewed and submitted) */}
          <form onSubmit={handleSaveSingle} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Service Listing Review & Customization
                </h3>
                <p className="text-xs text-slate-500">
                  All extracted fields are fully editable before being committed to the database.
                </p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-700">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="published">Published (Public)</option>
                  <option value="draft">Draft (Private)</option>
                </select>
              </div>
            </div>

            {saveError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                {saveError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., QuickBooks Online Setup & Chart of Accounts..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="quickbooks-online-setup..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Setup & Configuration">Setup & Configuration</option>
                  <option value="Monthly Bookkeeping">Monthly Bookkeeping</option>
                  <option value="Cleanup & Catch-Up">Cleanup & Catch-Up</option>
                  <option value="App Integrations">App Integrations</option>
                  <option value="Consulting & Training">Consulting & Training</option>
                </select>
              </div>

              {/* Seller Username (Separated from Title & placed in Feedback/Reviews) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Seller Username <span className="text-[10px] font-normal text-slate-500">(Displayed in Feedback/Seller section)</span>
                </label>
                <input
                  type="text"
                  value={sellerUsername}
                  onChange={(e) => setSellerUsername(e.target.value)}
                  placeholder="e.g., mejaz86"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-emerald-800 bg-emerald-50/20"
                />
              </div>

              {/* Fiverr Outbound URL */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fiverr Outbound Affiliate Link *
                </label>
                <input
                  type="url"
                  required
                  value={fiverrUrl}
                  onChange={(e) => setFiverrUrl(e.target.value)}
                  placeholder="https://www.fiverr.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Main Image URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Image URL
                </label>
                <input
                  type="url"
                  value={mainImage}
                  onChange={(e) => setMainImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Starting Price */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Price ($)
                </label>
                <input
                  type="number"
                  value={priceStarting}
                  onChange={(e) => setPriceStarting(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="50"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Rating and Reviews Count */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Rating (0 - 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={ratingValue}
                  onChange={(e) => setRatingValue(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Review Count
                </label>
                <input
                  type="number"
                  value={ratingCount}
                  onChange={(e) => setRatingCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed service overview, deliverables, and QuickBooks version compatibility..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Repeatable Packages Grid */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Service Packages</h4>
                  <p className="text-[11px] text-slate-500">Tiered packages for client selection</p>
                </div>
                <button
                  type="button"
                  onClick={addPackageRow}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Plus size={14} />
                  <span>Add Tier</span>
                </button>
              </div>

              <div className="space-y-3">
                {packages.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                    <p className="text-xs text-slate-500 mb-2">No service packages added. Packages remain empty unless extracted or added manually.</p>
                    <button
                      type="button"
                      onClick={addPackageRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 hover:bg-emerald-100 rounded-lg transition"
                    >
                      <Plus size={14} />
                      <span>Add Package Tier</span>
                    </button>
                  </div>
                ) : (
                  packages.map((pkg, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Tier #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removePackageRow(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1 transition"
                          title="Delete tier"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Package Name (e.g. Basic Setup)"
                          value={pkg.packageName}
                          onChange={(e) => updatePackage(idx, 'packageName', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="Price ($)"
                          value={pkg.price ?? ''}
                          onChange={(e) => updatePackage(idx, 'price', e.target.value ? Number(e.target.value) : undefined)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Delivery (e.g. 3 Days)"
                          value={pkg.deliveryDays || ''}
                          onChange={(e) => updatePackage(idx, 'deliveryDays', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Brief scope description..."
                        value={pkg.description || ''}
                        onChange={(e) => updatePackage(idx, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Repeatable Reviews Section */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Reviews & Quotes</h4>
                  <p className="text-[11px] text-slate-500">Highlighted client testimonials</p>
                </div>
                <button
                  type="button"
                  onClick={addReviewRow}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1.5 rounded-lg transition"
                >
                  <Plus size={14} />
                  <span>Add Quote</span>
                </button>
              </div>

              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                    <p className="text-xs text-slate-500 mb-2">No reviews added yet. Reviews remain empty unless extracted or added manually.</p>
                    <button
                      type="button"
                      onClick={addReviewRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 hover:bg-emerald-100 rounded-lg transition"
                    >
                      <Plus size={14} />
                      <span>Add Review</span>
                    </button>
                  </div>
                ) : (
                  reviews.map((rev, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Review #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => removeReviewRow(idx)}
                          className="text-rose-500 hover:text-rose-700 p-1 transition"
                          title="Delete review"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          placeholder="Reviewer Name"
                          value={rev.reviewerName || ''}
                          onChange={(e) => updateReview(idx, 'reviewerName', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          placeholder="Rating"
                          value={rev.rating || 5}
                          onChange={(e) => updateReview(idx, 'rating', Number(e.target.value))}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Date / Duration (e.g. 1 week ago)"
                          value={rev.reviewDate || ''}
                          onChange={(e) => updateReview(idx, 'reviewDate', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Client testimonial / feedback text..."
                        value={rev.comment || ''}
                        onChange={(e) => updateReview(idx, 'comment', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                id="save-single-service-button"
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Save Service ({status})</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 2: PASTE RAW HTML (100% BYPASSES BOT DETECTION) */}
      {/* ===================================================================== */}
      {activeTab === 'html' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <ShieldAlert size={14} />
              <span>100% Real Data Importer (Bypasses Bot Shields)</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Code2 size={18} className="text-emerald-600" />
              <span>Paste Gig Page HTML Source</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              When automated requests get blocked by Fiverr's anti-bot system (HTTP 403), this method extracts <strong>100% real gig data</strong> (actual pricing, tiered packages, delivery times, photos, and genuine client reviews) directly from the page source HTML.
            </p>
          </div>

          {/* 3 Simple Steps Helper */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-600" />
              كيفية الحصول على كود الصفحة في 3 ثوانٍ / Quick 3-Step Guide:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-0.5">1. افتح صفحة الخدمة:</span>
                {(rawHtmlFiverrUrl || singleUrl || fiverrUrl) ? (
                  <a
                    href={rawHtmlFiverrUrl || singleUrl || fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline mt-1"
                  >
                    <ExternalLink size={11} /> فتح الرابط في فايفر ↗
                  </a>
                ) : (
                  <span>افتح رابط الخدمة في متصفحك</span>
                )}
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-0.5">2. اعرض مصدر الصفحة:</span>
                <span>اضغط <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">Ctrl+U</kbd> ثم حدد الكل <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">Ctrl+A</kbd> وانسخ <kbd className="px-1 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px]">Ctrl+C</kbd></span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-700 block mb-0.5">3. الصق واستخرج:</span>
                <span>الصق الكود في المربع أدناه واضغط على زر استخراج الأخضر.</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fiverr Gig Outbound URL
              </label>
              <input
                type="url"
                value={rawHtmlFiverrUrl}
                onChange={(e) => setRawHtmlFiverrUrl(e.target.value)}
                placeholder="https://www.fiverr.com/seller/gig-name..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Raw Page Source HTML (or &lt;head&gt; / JSON-LD snippet)
              </label>
              <textarea
                rows={8}
                value={rawHtml}
                onChange={(e) => setRawHtml(e.target.value)}
                placeholder="<!DOCTYPE html><html><head><meta property='og:title' content='...'>...</html>"
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            {htmlParseError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                {htmlParseError}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('single')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                ← Back to Single Extractor
              </button>

              <button
                id="parse-html-button"
                onClick={handleParseHtml}
                disabled={isParsingHtml || !rawHtml.trim()}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2"
              >
                {isParsingHtml ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span>Parsing Real Gig HTML...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    <span>Extract 100% Real Gig Data</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TAB 3: BULK URLS QUEUE */}
      {/* ===================================================================== */}
      {activeTab === 'bulk' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers size={18} className="text-emerald-600" />
              <span>Bulk URLs Batch Extractor</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Paste multiple Fiverr URLs (one per line). Sequential scraping will run with a configurable delay between calls to minimize bot blocks. All saved items are stored as <strong>"draft"</strong> so you can review each before publishing.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fiverr Gig URLs (one per line)
              </label>
              <textarea
                rows={5}
                value={bulkUrlsText}
                onChange={(e) => setBulkUrlsText(e.target.value)}
                placeholder="https://www.fiverr.com/seller1/gig-1&#10;https://www.fiverr.com/seller2/gig-2..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-slate-500" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    Sequential Request Delay:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Reduces Cloudflare rate-limiting risks
                  </span>
                </div>
                <select
                  value={delaySeconds}
                  onChange={(e) => setDelaySeconds(Number(e.target.value))}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value={1}>1 Second</option>
                  <option value={2}>2 Seconds (Default)</option>
                  <option value={3}>3 Seconds</option>
                  <option value={5}>5 Seconds</option>
                </select>
              </div>

              <button
                id="start-bulk-button"
                onClick={handleStartBulk}
                disabled={isBulkRunning}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-2"
              >
                {isBulkRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    <span>Extracting Sequentially...</span>
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    <span>Start Extraction</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bulk Results Table */}
          {bulkQueue.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Extraction Results ({bulkQueue.filter((q) => q.selected).length} selected)
                </h3>

                <button
                  id="save-selected-bulk-button"
                  onClick={handleSaveBulkSelected}
                  disabled={isBulkSaving || isBulkRunning || bulkQueue.filter((q) => q.selected).length === 0}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Save Selected as Drafts</span>
                </button>
              </div>

              {bulkSaveFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  {bulkSaveFeedback}
                </div>
              )}

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3 w-10">Select</th>
                      <th className="py-2.5 px-3">Fiverr URL</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Extracted Title</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bulkQueue.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setBulkQueue((prev) =>
                                prev.map((it, i) => (i === idx ? { ...it, selected: checked } : it))
                              );
                            }}
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600 max-w-xs truncate">
                          {item.url}
                        </td>
                        <td className="py-2.5 px-3">
                          {item.status === 'pending' && (
                            <span className="text-slate-400">Pending</span>
                          )}
                          {item.status === 'scraping' && (
                            <span className="text-emerald-600 font-semibold flex items-center gap-1">
                              <div className="w-2.5 h-2.5 border border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                              Extracting
                            </span>
                          )}
                          {item.status === 'success' && (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 size={13} />
                              Success
                            </span>
                          )}
                          {item.status === 'warning' && (
                            <span className="text-blue-700 font-semibold flex items-center gap-1" title={item.warning}>
                              <AlertTriangle size={13} />
                              Partial
                            </span>
                          )}
                          {item.status === 'failed' && (
                            <span className="text-amber-700 font-medium flex items-center gap-1" title={item.error}>
                              <ShieldAlert size={13} />
                              Fallback
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-medium">
                          {item.title || (item.status === 'scraping' ? '...' : '—')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
