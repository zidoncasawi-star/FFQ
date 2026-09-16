// src/pages/legal/DisclaimerPage.tsx
import React from 'react';
import { ShieldAlert, AlertTriangle, Scale, Building } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div id="disclaimer-page-container" className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
          <ShieldAlert size={16} />
          <span>Trademarks & Advisory Disclaimers</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Legal & Trademark Disclaimer</h1>
        <p className="text-xs text-slate-500 mt-2">Last updated: September 16, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        {/* Placeholder reminder banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Notice to Site Administrator:</strong> Ensure{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-800">[PLACEHOLDER: ...]</code>{' '}
            elements are completed with your registered operating entity credentials and verified email.
          </div>
        </div>

        {/* Intuit / QuickBooks Trademark Notice */}
        <section className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <Building size={18} className="text-emerald-700" />
            <h2>1. Intuit® & QuickBooks® Trademark Notice</h2>
          </div>
          <p>
            <strong>QuickBooks®</strong>, <strong>QuickBooks Online®</strong>, <strong>QuickBooks Pro®</strong>, and <strong>Intuit®</strong> are registered trademarks and service marks of Intuit Inc. in the United States and other countries.
          </p>
          <p className="text-slate-600">
            QB Gig Finder (operated by <span className="font-semibold text-slate-800">[PLACEHOLDER: legal entity name]</span>) is an independent affiliate and resource directory. This website is <strong>NOT</strong> affiliated with, endorsed by, sponsored by, authorized by, or in any way officially associated with Intuit Inc. Any reference to "QuickBooks" is made strictly for nominative fair-use purposes to describe the compatibility and nature of services cataloged herein.
          </p>
        </section>

        {/* Fiverr Trademark Notice */}
        <section className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
            <Building size={18} className="text-emerald-700" />
            <h2>2. Fiverr® Trademark Notice</h2>
          </div>
          <p>
            <strong>Fiverr®</strong> is a registered trademark of Fiverr International Ltd. QB Gig Finder is an independent participant in the Fiverr Affiliate Program. We do not act as an official corporate spokesperson, subsidiary, or joint venture partner of Fiverr International Ltd.
          </p>
        </section>

        {/* No Financial, Tax, or Accounting Advice Disclaimer */}
        <section className="space-y-3 p-5 bg-amber-50/50 rounded-xl border border-amber-200/80">
          <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
            <Scale size={18} className="text-amber-700" />
            <h2>3. No Financial, Bookkeeping, Tax, or Legal Advice</h2>
          </div>
          <p className="text-amber-900">
            <strong>CRITICAL NOTICE:</strong> The contents, directory listings, comparisons, and articles published on QB Gig Finder are provided for general informational and directory reference purposes only.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-amber-800 text-xs leading-relaxed">
            <li>
              <strong>QB Gig Finder is NOT a certified public accounting firm (CPA), registered tax preparer, enrolled agent, or licensed financial advisory firm.</strong>
            </li>
            <li>
              None of the information presented on this site constitutes professional accounting, audit, tax preparation, legal, or investment advice.
            </li>
            <li>
              You should always consult with a licensed CPA, certified financial planner, or tax attorney licensed in your jurisdiction before making financial commitments or modifying corporate financial statements.
            </li>
          </ul>
        </section>

        {/* Delivery by Independent Third-Party Freelancers */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Freelance Delivery</h2>
          <p>
            All services cataloged on this website are executed, delivered, and billed by independent freelance contractors operating on the Fiverr.com platform. QB Gig Finder does not manage, oversee, or audit seller deliverables.
          </p>
          <p>
            We do not warrant or guarantee that any seller’s services will meet your expectations, achieve specific tax outcomes, or remain free of errors. All warranties, express or implied, including merchantability or fitness for a particular purpose, are expressly disclaimed.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">5. Contact & Legal Notifications</h2>
          <p>
            For legal inquiries or trademark clarifications, please contact our legal representative at:{' '}
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
