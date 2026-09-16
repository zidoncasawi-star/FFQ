// src/components/Navbar.tsx
import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, UserCheck, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, isAdminLoggedIn }) => {
  return (
    <header id="site-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top micro-bar with affiliate disclaimer reminder */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Independent Directory of QuickBooks Specialists on Fiverr</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline">Outbound referral links support this directory</span>
            <button
              onClick={() => onNavigate('/affiliate-disclosure')}
              className="hover:text-white underline text-[11px]"
            >
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            id="logo-brand-button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:bg-emerald-700 transition">
              QB
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight block leading-tight">
                QB Gig Finder
              </span>
              <span className="text-[11px] font-medium text-slate-500 block leading-none">
                Curated Fiverr Directory
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              id="nav-all-gigs"
              onClick={() => onNavigate('/')}
              className={`hover:text-emerald-700 transition ${currentPath === '/' ? 'text-emerald-600 font-semibold' : ''}`}
            >
              Browse Services
            </button>
            <button
              id="nav-disclosure"
              onClick={() => onNavigate('/affiliate-disclosure')}
              className={`hover:text-emerald-700 transition ${currentPath === '/affiliate-disclosure' ? 'text-emerald-600 font-semibold' : ''}`}
            >
              Affiliate Disclosure
            </button>
            <button
              id="nav-disclaimer"
              onClick={() => onNavigate('/disclaimer')}
              className={`hover:text-emerald-700 transition ${currentPath === '/disclaimer' ? 'text-emerald-600 font-semibold' : ''}`}
            >
              Trademark Disclaimer
            </button>
            <button
              id="nav-contact"
              onClick={() => onNavigate('/contact')}
              className={`hover:text-emerald-700 transition ${currentPath === '/contact' ? 'text-emerald-600 font-semibold' : ''}`}
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAdminLoggedIn ? (
            <button
              id="nav-admin-dashboard"
              onClick={() => onNavigate('/admin')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              <LayoutDashboard size={14} />
              <span>Admin Panel</span>
            </button>
          ) : (
            <button
              id="nav-admin-login"
              onClick={() => onNavigate('/admin/login')}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition"
            >
              Admin Login
            </button>
          )}

          <a
            id="nav-visit-fiverr"
            href="https://www.fiverr.com/search/gigs?query=quickbooks"
            target="_blank"
            rel="nofollow noopener"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
          >
            <span>Search Fiverr</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </header>
  );
};
