// src/components/Footer.tsx
import React from 'react';
import { ExternalLink, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="site-footer" className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                QB
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                QB Gig Finder
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              QB Gig Finder is an independent, curated affiliate directory designed to help small business owners, freelancers, and entrepreneurs quickly locate certified QuickBooks ProAdvisors, bookkeepers, and accounting specialists on Fiverr.com.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-950/60 border border-emerald-800/40 p-3 rounded-lg max-w-md">
              <ShieldAlert size={18} className="shrink-0 text-emerald-400" />
              <span>Independent Directory — All contracts, payments, and deliverables occur directly on Fiverr.com.</span>
            </div>
          </div>

          {/* Directory Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              QuickBooks Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition text-left"
                >
                  Setup & Configuration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition text-left"
                >
                  Monthly Bookkeeping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition text-left"
                >
                  Cleanup & Catch-Up Accounting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition text-left"
                >
                  QuickBooks Desktop to QBO Migration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-white transition text-left"
                >
                  Shopify & E-commerce Sync
                </button>
              </li>
            </ul>
          </div>

          {/* Required Legal Pages */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase text-xs">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-terms-link"
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-emerald-400 transition"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  id="footer-privacy-link"
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-emerald-400 transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  id="footer-affiliate-disclosure-link"
                  onClick={() => onNavigate('/affiliate-disclosure')}
                  className="hover:text-emerald-400 transition"
                >
                  Affiliate Disclosure (FTC)
                </button>
              </li>
              <li>
                <button
                  id="footer-disclaimer-link"
                  onClick={() => onNavigate('/disclaimer')}
                  className="hover:text-emerald-400 transition"
                >
                  Trademark & Advice Disclaimer
                </button>
              </li>
              <li>
                <button
                  id="footer-contact-link"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-emerald-400 transition"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Explicit Disclaimer Banner */}
        <div className="border-t border-slate-800 pt-6 pb-6 text-xs text-slate-400 space-y-2.5 leading-relaxed">
          <p className="font-semibold text-slate-300">
            Important Trademark & Affiliate Disclosure:
          </p>
          <p>
            QuickBooks® and Intuit® are registered trademarks of Intuit Inc. This website is an independent affiliate directory and is NOT affiliated with, sponsored by, authorized by, or endorsed by Intuit Inc.
          </p>
          <p>
            Fiverr® is a registered trademark of Fiverr International Ltd. This website participates in the Fiverr Affiliate Program. When you click on links to services listed on this site and make a purchase on Fiverr.com, we may earn an affiliate referral commission at no additional cost to you.
          </p>
          <p>
            All professional accounting, bookkeeping, and consulting services presented on this directory are performed independently by third-party sellers on Fiverr.com. QB Gig Finder does not provide direct financial, tax, or legal advice.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} QB Gig Finder. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener"
              className="hover:text-slate-300 transition flex items-center gap-1"
            >
              <span>Sitemap XML</span>
              <ArrowUpRight size={12} />
            </a>
            <button
              onClick={() => onNavigate('/admin')}
              className="hover:text-slate-300 transition"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
