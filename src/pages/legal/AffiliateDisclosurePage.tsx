// src/pages/legal/AffiliateDisclosurePage.tsx
import React from 'react';
import { DollarSign, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export const AffiliateDisclosurePage: React.FC = () => {
  return (
    <div id="affiliate-disclosure-container" className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <DollarSign size={16} />
          <span>Transparency & FTC Compliance</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Affiliate Disclosure</h1>
        <p className="text-xs text-slate-500 mt-2">Last updated: September 16, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        {/* Placeholder banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Notice to Site Administrator:</strong> Ensure{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-800">[PLACEHOLDER: ...]</code>{' '}
            fields are completed with your operating entity name prior to launching ad campaigns or affiliate drives.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Compliance with FTC Endorsement Guides</h2>
          <p>
            In compliance with the Federal Trade Commission (FTC) guidelines concerning the use of endorsements and testimonials in advertising (16 CFR Part 255), this Affiliate Disclosure informs visitors that{' '}
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">
              [PLACEHOLDER: legal entity name]
            </span>{' '}
            maintains a commercial affiliate relationship with Fiverr International Ltd.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. How Our Affiliate Relationship Works</h2>
          <p>
            QB Gig Finder is an independently curated directory designed to highlight high-performing QuickBooks bookkeeping, setup, reconciliation, and troubleshooting gigs offered on Fiverr.com.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-950">
              <CheckCircle size={16} className="text-emerald-600" />
              <span>Zero Additional Cost to You</span>
            </div>
            <p>
              When you click on an outbound button or link on our website (e.g., "Order on Fiverr", "Select on Fiverr", or "View on Fiverr") and subsequently complete a service purchase on Fiverr.com, we may receive a referral commission from Fiverr. This commission comes directly from Fiverr's marketing budget and costs you <strong>nothing extra</strong>. The price you pay on Fiverr is identical whether you use our link or navigate directly.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Editorial Integrity & Directory Listings Policy</h2>
          <p>
            We believe in complete transparency regarding how services are cataloged and ranked on QB Gig Finder:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Niche Curation:</strong> We only catalog services explicitly focused on Intuit QuickBooks (Online, Desktop, Payroll, or App Integrations).
            </li>
            <li>
              <strong>Ranking & Inclusion:</strong> Service listings on our directory are curated based on seller rating scores, transaction volume, category relevance, and client feedback history on Fiverr.
            </li>
            <li>
              <strong>No Pay-to-Rank:</strong> Freelancers cannot pay our website to be featured at the top of our default rankings. However, all listed gigs contain affiliate referral parameters that allow our team to sustain the costs of maintaining this directory.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Independent User Responsibility</h2>
          <p>
            Because freelance services are delivered entirely by independent third parties on Fiverr.com, we strongly encourage all visitors to conduct their own due diligence. Please read each seller's latest customer reviews, clarify scope through Fiverr messaging prior to ordering, and select the package tier that accurately reflects your business requirements.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">5. Questions & Feedback</h2>
          <p>
            If you have questions about our affiliate relationships or listing criteria, please contact our administrative team at:{' '}
            <span className="font-semibold text-slate-800 underline">
              [PLACEHOLDER: contact email]
            </span>
            .
          </p>
        </section>
      </div>
    </div>
  );
};
