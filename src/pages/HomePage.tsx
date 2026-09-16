// src/pages/HomePage.tsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, BookOpen, AlertCircle } from 'lucide-react';
import { Service } from '../types.ts';
import { ServiceCard } from '../components/ServiceCard.tsx';

interface HomePageProps {
  services: Service[];
  onSelectService: (service: Service) => void;
  onNavigate: (path: string) => void;
}

const CATEGORIES = [
  'All',
  'Setup & Configuration',
  'Monthly Bookkeeping',
  'Cleanup & Catch-Up',
  'App Integrations',
  'Consulting & Training',
];

export const HomePage: React.FC<HomePageProps> = ({ services, onSelectService, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter ONLY published services for the public homepage
  const publishedServices = useMemo(() => {
    return services.filter((s) => s.status === 'published');
  }, [services]);

  const filteredServices = useMemo(() => {
    return publishedServices.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (service.category && service.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesSearch =
        !searchQuery.trim() ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (service.category && service.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [publishedServices, selectedCategory, searchQuery]);

  return (
    <div id="homepage-container" className="space-y-12">
      {/* Hero Directory Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles size={14} />
            <span>Curated QuickBooks Fiverr Specialists</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
            Find the Best QuickBooks Services on Fiverr
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            Compare trusted QuickBooks Online & Desktop ProAdvisors for new company setups, monthly bookkeeping, multi-year cleanups, and e-commerce integrations.
          </p>

          {/* Quick Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by service (e.g., 'Chart of accounts', 'Shopify sync', 'Catch-up')..."
                className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Key Value Points */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Direct Fiverr Outbound Links</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Transparent Package Pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>Independent Directory</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Filter size={18} className="text-emerald-600" />
            <span>Filter by Specialized Category</span>
          </h2>
          <span className="text-xs text-slate-500">
            Showing {filteredServices.length} of {publishedServices.length} published gigs
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Services Grid */}
      <section>
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200">
            <AlertCircle size={40} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">No services found matching your criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or selecting "All" from the category filter above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={onSelectService}
              />
            ))}
          </div>
        )}
      </section>

      {/* Affiliate & How It Works Notice Box */}
      <section className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
              Browse Specialized Gigs
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We scout and index reliable Fiverr freelancers specializing exclusively in QuickBooks Online and Desktop bookkeeping, setup, and cleanup tasks.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">2</span>
              Compare Transparent Packages
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect starting prices, delivery timelines, included transactions, and real customer feedback before deciding on the right tier.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
              Order Securely on Fiverr
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click the outbound link to place your order directly on Fiverr.com with full buyer protection, secure escrow, and milestone delivery.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-emerald-200/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <p>
            <strong>FTC Disclosure:</strong> We may receive an affiliate commission from Fiverr if you choose to purchase through our links. This comes at zero extra cost to you.
          </p>
          <button
            onClick={() => onNavigate('/affiliate-disclosure')}
            className="text-emerald-800 font-semibold underline hover:text-emerald-950"
          >
            Read Full Disclosure
          </button>
        </div>
      </section>
    </div>
  );
};
