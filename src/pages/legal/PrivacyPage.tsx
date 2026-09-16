// src/pages/legal/PrivacyPage.tsx
import React from 'react';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div id="privacy-page-container" className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          <Lock size={16} />
          <span>User Privacy & Data</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-2">Last updated: September 16, 2026</p>
      </div>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        {/* Placeholder reminder */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 mt-0.5" />
          <div>
            <strong>Notice to Site Administrator:</strong> Replace{' '}
            <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-800">[PLACEHOLDER: ...]</code>{' '}
            with your registered business information and privacy inquiry email before deployment.
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Introduction</h2>
          <p>
            This Privacy Policy explains how{' '}
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded">
              [PLACEHOLDER: legal entity name]
            </span>{' '}
            ("we", "our", or "us") collects, uses, and safeguards information when you visit the QB Gig Finder website. We are dedicated to respecting and safeguarding your personal privacy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
          <p>We do not operate public user accounts or require registration. We collect only limited categories of data:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              <strong>Search & Filter Queries:</strong> Directory search keywords entered to locate QuickBooks bookkeeping or setup gigs.
            </li>
            <li>
              <strong>Voluntary Inquiries:</strong> Name, email address, and message contents when you submit our contact form.
            </li>
            <li>
              <strong>Technical & Usage Data:</strong> Anonymized or pseudo-anonymized IP addresses, browser types, operating systems, referring URLs, and page navigation timestamps.
            </li>
            <li>
              <strong>Cookies & Tracking Identifiers:</strong> Standard session cookies and affiliate attribution parameters.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Purpose and Legal Basis for Processing</h2>
          <p>We process your information for legitimate business purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>To display, operate, and optimize our directory listings;</li>
            <li>To respond to user inquiries submitted through our contact form;</li>
            <li>To monitor website traffic trends and protect against malicious cyber traffic or denial-of-service attempts;</li>
            <li>To attribute referral traffic to Fiverr under our affiliate agreement.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Sharing & Affiliate Tracking</h2>
          <p>
            <strong>Fiverr Affiliate Network:</strong> When you click an outbound link to view or purchase a service on Fiverr.com, you are redirected to Fiverr. Fiverr and its affiliate tracking systems may place a tracking cookie on your device to record that you were referred by our site. This tracking is governed solely by Fiverr's Privacy Policy.
          </p>
          <p>
            <strong>No Sale of Data:</strong> We do not sell, rent, or trade your personal information or contact inquiries to any third party for commercial marketing purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Cookie Policy Summary</h2>
          <p>
            Cookies are small text files stored on your browser. We use necessary cookies for site navigation and session handling, and affiliate attribution tracking cookies. You may disable or block cookies in your web browser settings at any time, though some directory interactive features may function with reduced personalization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">6. Data Retention</h2>
          <p>
            Contact form submissions are retained for up to 12 months to satisfy communication follow-ups, after which they are securely purged. Standard web server access logs are retained on rotating cycles of 30 to 90 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">7. Your Privacy Rights (GDPR & CCPA/CPRA)</h2>
          <p>
            Depending on your location (including the European Economic Area, United Kingdom, and California), you may possess specific rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>The right to request confirmation of whether we hold personal data concerning you;</li>
            <li>The right to request access to and rectification or erasure of your personal data;</li>
            <li>The right to object to processing or request restriction of processing;</li>
            <li>The right to non-discrimination for exercising your privacy choices.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">8. Privacy Contact & Data Protection Officer</h2>
          <p>
            To exercise your privacy rights, request data deletion, or ask questions regarding this policy, please email:{' '}
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
