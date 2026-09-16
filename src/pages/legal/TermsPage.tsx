// src/pages/legal/TermsPage.tsx
import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div id="terms-page-container" className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <FileText size={16} />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Terms of Use</h1>
        <p className="text-xs text-slate-500 mt-2">Last updated: September 16, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        {/* Placeholder reminder banner */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Notice to Site Administrator:</strong> Please replace all bracketed items such as{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-800">[PLACEHOLDER: ...]</code>{' '}
            with your registered entity credentials and specific governing jurisdiction prior to commercial launch.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing QB Gig Finder (accessible at this domain, operated by{' '}
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">
              [PLACEHOLDER: legal entity name]
            </span>
            , referred to herein as "we", "us", or "our"), you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Nature of the Service (Affiliate Directory Only)</h2>
          <p>
            QB Gig Finder operates solely as an informational and promotional directory of independent freelance services hosted on Fiverr.com. We are <strong>NOT</strong> an online marketplace, employer, broker, or financial service agency:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>We do not process payments, escrow funds, or issue invoices for freelance services.</li>
            <li>All commercial transactions, service orders, communications, milestones, and deliverable handoffs take place exclusively on Fiverr.com under Fiverr’s Terms of Service.</li>
            <li>We do not employ, supervise, or control the independent freelancers whose services are cataloged on our site.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Non-Affiliation Disclaimers</h2>
          <p>
            <strong>Intuit & QuickBooks:</strong> QuickBooks® and Intuit® are registered trademarks of Intuit Inc. QB Gig Finder is an independent third-party publication and directory. We are not affiliated with, endorsed by, sponsored by, or officially connected to Intuit Inc.
          </p>
          <p>
            <strong>Fiverr:</strong> Fiverr® is a registered trademark of Fiverr International Ltd. QB Gig Finder participates in the Fiverr Affiliate Program as an independent referral partner and does not act as an official corporate representative of Fiverr.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Information Accuracy & Price Lag Disclaimer</h2>
          <p>
            While we strive to keep gig titles, descriptions, starting prices, and rating counters updated via automated extraction and editorial review, prices and terms set by individual freelancers on Fiverr change dynamically.
          </p>
          <p>
            The listed details on QB Gig Finder may occasionally lag behind the live gig page on Fiverr.com. You are solely responsible for inspecting the actual price, delivery timeline, revision count, and scope of work on Fiverr.com before confirming any order or releasing payment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall{' '}
            <span className="font-semibold text-slate-800">[PLACEHOLDER: legal entity name]</span>, its directors, employees, or affiliates be liable for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Any direct, indirect, punitive, incidental, or consequential damages resulting from the use or inability to use this directory;</li>
            <li>The quality, accuracy, timeliness, completeness, or outcomes of bookkeeping, accounting, tax filing, or consulting services provided by freelancers found via Fiverr;</li>
            <li>Loss of financial data, incorrect tax returns, accounting irregularities, or business interruptions;</li>
            <li>Any disputes, payment reversals, or delivery delays occurring between you and any third-party seller on Fiverr.com.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">6. External Links & Third-Party Websites</h2>
          <p>
            Our website contains outbound hyperlinks to external platforms, primarily Fiverr.com. We have no authority over the content, privacy practices, terms of service, or operational safety of third-party platforms and accept no liability for third-party practices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">7. Modifications to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Use at any time without prior notice. By continuing to use this website after changes are posted, you agree to be bound by the updated version.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">8. Governing Law & Jurisdiction</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of{' '}
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">
              [PLACEHOLDER: jurisdiction]
            </span>
            , without giving effect to any principles of conflicts of law. Any legal dispute or proceeding arising from these terms shall be subject to the exclusive jurisdiction of the competent courts in{' '}
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">
              [PLACEHOLDER: jurisdiction]
            </span>
            .
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">9. Contact Information</h2>
          <p>
            For inquiries regarding these Terms of Use, please reach out to us via our contact form or directly via email at:{' '}
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
