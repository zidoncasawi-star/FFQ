// src/pages/ServiceDetailPage.tsx
import React, { useState } from 'react';
import {
  Star,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Share2,
  AlertTriangle,
  Building2,
  Calendar
} from 'lucide-react';
import { Service } from '../types.ts';

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onBack, onNavigate }) => {
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const packages = service.packages || [];
  const reviews = service.reviews || [];
  const currentPkg = packages[selectedPackageIndex] || packages[0];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="service-detail-container" className="max-w-6xl mx-auto space-y-10">
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between">
        <button
          id="back-to-directory"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to All QuickBooks Gigs</span>
        </button>

        <div className="flex items-center gap-2">
          {service.category && (
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800">
              {service.category}
            </span>
          )}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 text-xs flex items-center gap-1"
            title="Copy link"
          >
            <Share2 size={14} />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Details & Right Checkout Sticky Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Image, Description, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Hero Image */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-sm">
            <img
              src={service.mainImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80'}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and Top Meta */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {service.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1 pb-3 border-b border-slate-200">
              {service.sellerUsername && (
                <>
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <span className="text-slate-400 font-normal">Seller:</span>
                    <span className="text-emerald-700">@{service.sellerUsername}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                </>
              )}

              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <Star size={15} className="fill-amber-400 text-amber-400" />
                <span>{service.ratingValue ? Number(service.ratingValue).toFixed(1) : '5.0'}</span>
                <span className="text-slate-500 font-normal">({service.ratingCount || 12} reviews)</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1">
                <Clock size={14} className="text-slate-400" />
                <span>Typical delivery: {currentPkg?.deliveryDays || '2-4 Days'}</span>
              </div>

              <span className="text-slate-300">•</span>

              <div className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck size={14} />
                <span>Indexed Freelancer on Fiverr</span>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              About This QuickBooks Gig
            </h2>
            <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
              {service.description}
            </div>
          </div>

          {/* Packages Comparison Grid */}
          <div className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Compare Available Packages
            </h2>
            <p className="text-xs text-slate-500">
              Select a tier below or review specific scopes before proceeding to the original Fiverr gig listing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {packages.map((pkg, idx) => {
                const isSelected = selectedPackageIndex === idx;
                return (
                  <div
                    key={pkg.id || idx}
                    onClick={() => setSelectedPackageIndex(idx)}
                    className={`cursor-pointer rounded-xl border p-4 transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          {pkg.packageName}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-xl font-bold text-slate-900 mb-2">
                        ${pkg.price || service.priceStarting || 50}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-3">
                        <Clock size={12} />
                        <span>{pkg.deliveryDays || '3 Days Delivery'}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-3">
                        {pkg.description || 'Standard task delivery and setup.'}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/60">
                      <a
                        href={service.fiverrUrl}
                        target="_blank"
                        rel="nofollow noopener"
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1 transition ${
                          isSelected
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Select on Fiverr</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Client Reviews & Feedback
                </h2>
                {service.sellerUsername && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Seller: @{service.sellerUsername}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500">
                {reviews.length} feedback entries recorded
              </span>
            </div>

            {reviews.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-4">
                No individual review quotes have been recorded for this listing yet. Visit the Fiverr page to inspect the seller's full feedback history.
              </p>
            ) : (
              <div className="space-y-4 pt-2">
                {reviews.map((rev, idx) => (
                  <div
                    key={rev.id || idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-slate-600">
                          {rev.reviewerName ? rev.reviewerName[0].toUpperCase() : 'C'}
                        </div>
                        <span className="text-xs font-semibold text-slate-800">
                          {rev.reviewerName || 'Client Review'}
                        </span>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        <Star size={12} className="fill-amber-400 text-amber-400 mr-1" />
                        <span>{rev.rating ? Number(rev.rating).toFixed(1) : '5.0'}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "{rev.comment}"
                    </p>
                    {rev.reviewDate && (
                      <div className="text-[10px] text-slate-400 pt-1 flex items-center gap-1">
                        <Calendar size={10} />
                        <span>{rev.reviewDate}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Action & Outbound Box */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <div>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider block">
                Selected Option
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-2xl font-black text-slate-900">
                  ${currentPkg?.price || service.priceStarting || 50}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {currentPkg?.packageName || 'Base Package'}
                </span>
              </div>
            </div>

            {/* Delivery time pill */}
            <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <Clock size={16} className="text-emerald-600 shrink-0" />
              <span>
                Estimated Delivery: <strong>{currentPkg?.deliveryDays || '3 Days'}</strong>
              </span>
            </div>

            {/* Selected package bullet summary */}
            {currentPkg?.description && (
              <div className="text-xs text-slate-600 space-y-2">
                <span className="font-semibold text-slate-700 block">Scope of work:</span>
                <p className="leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100">
                  {currentPkg.description}
                </p>
              </div>
            )}

            {/* Prominent Outbound Button */}
            <a
              id="order-on-fiverr-button"
              href={service.fiverrUrl}
              target="_blank"
              rel="nofollow noopener"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-600/20 transition group"
            >
              <span>Order on Fiverr</span>
              <ExternalLink size={16} className="group-hover:translate-x-0.5 transition" />
            </a>

            <p className="text-[11px] text-center text-slate-500 leading-tight">
              You will be redirected directly to the verified gig on Fiverr.com. All purchases are protected by Fiverr Customer Support and escrow.
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Direct communication with seller</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Full Fiverr buyer protection policy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>Custom milestone offers supported</span>
              </div>
            </div>

            {/* Mini affiliate box */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-800 leading-relaxed">
              <strong>Affiliate Notice:</strong> As an affiliate, we may receive a commission on qualifying orders placed after following this link at no additional charge to you.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
