// src/pages/admin/AdminEditServicePage.tsx
import React, { useState } from 'react';
import { ArrowLeft, Save, Trash2, Plus, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Service, PackageItem, ReviewItem } from '../../types.ts';

interface AdminEditServicePageProps {
  service: Service;
  onBack: () => void;
  onServiceUpdated: () => void;
}

export const AdminEditServicePage: React.FC<AdminEditServicePageProps> = ({
  service,
  onBack,
  onServiceUpdated,
}) => {
  const [title, setTitle] = useState(service.title);
  const [slug, setSlug] = useState(service.slug);
  const [sellerUsername, setSellerUsername] = useState(service.sellerUsername || '');
  const [description, setDescription] = useState(service.description || '');
  const [fiverrUrl, setFiverrUrl] = useState(service.fiverrUrl);
  const [mainImage, setMainImage] = useState(service.mainImage || '');
  const [priceStarting, setPriceStarting] = useState<number | ''>(service.priceStarting ?? 50);
  const [category, setCategory] = useState(service.category || 'Setup & Configuration');
  const [ratingValue, setRatingValue] = useState<number>(service.ratingValue ?? 5.0);
  const [ratingCount, setRatingCount] = useState<number>(service.ratingCount ?? 10);
  const [status, setStatus] = useState<'draft' | 'published'>(service.status);
  const [packages, setPackages] = useState<PackageItem[]>(service.packages || []);
  const [reviews, setReviews] = useState<ReviewItem[]>(service.reviews || []);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const payload = {
        title,
        slug,
        sellerUsername: sellerUsername.trim() || undefined,
        description,
        fiverrUrl,
        mainImage,
        priceStarting: Number(priceStarting || 50),
        category,
        ratingValue: Number(ratingValue),
        ratingCount: Number(ratingCount),
        status,
        packages,
        reviews,
      };

      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          onServiceUpdated();
        }, 800);
      } else {
        setSaveError(data.error || 'Failed to update service.');
      }
    } catch {
      setSaveError('Network error while updating service.');
    } finally {
      setIsSaving(false);
    }
  };

  const addPackageRow = () => {
    const nextOrder = packages.length + 1;
    setPackages([
      ...packages,
      {
        packageName: '',
        price: undefined,
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

  return (
    <div id="admin-edit-service-container" className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </button>

        <a
          href={service.fiverrUrl}
          target="_blank"
          rel="nofollow noopener"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
        >
          <span>Open on Fiverr</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <form onSubmit={handleUpdate} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Service Listing</h2>
            <p className="text-xs text-slate-500">ID: {service.id}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-700">Listing Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                status === 'published'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <option value="published">Published (Live)</option>
              <option value="draft">Draft (Hidden)</option>
            </select>
          </div>
        </div>

        {saveError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
            {saveError}
          </div>
        )}

        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Service successfully updated! Redirecting...</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

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

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fiverr Outbound URL *
            </label>
            <input
              type="url"
              required
              value={fiverrUrl}
              onChange={(e) => setFiverrUrl(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Main Image URL
            </label>
            <input
              type="url"
              value={mainImage}
              onChange={(e) => setMainImage(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Starting Price ($)
            </label>
            <input
              type="number"
              value={priceStarting}
              onChange={(e) => setPriceStarting(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rating (0 - 5.0)
            </label>
            <input
              type="number"
              step="0.1"
              value={ratingValue}
              onChange={(e) => setRatingValue(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Reviews Count
            </label>
            <input
              type="number"
              value={ratingCount}
              onChange={(e) => setRatingCount(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Packages */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Manage Packages ({packages.length})</h3>
            <button
              type="button"
              onClick={addPackageRow}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition"
            >
              <Plus size={14} />
              <span>Add Package</span>
            </button>
          </div>

          <div className="space-y-3">
            {packages.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                <p className="text-xs text-slate-500 mb-2">No packages configured for this service.</p>
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
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Package #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removePackageRow(idx)}
                      className="text-rose-500 hover:text-rose-700 p-1 transition"
                      title="Delete package"
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

        {/* Reviews */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Manage Reviews ({reviews.length})</h3>
            <button
              type="button"
              onClick={addReviewRow}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition"
            >
              <Plus size={14} />
              <span>Add Review</span>
            </button>
          </div>

          <div className="space-y-3">
            {reviews.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                <p className="text-xs text-slate-500 mb-2">No reviews recorded for this service.</p>
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
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
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
                      placeholder="Review Date / Duration"
                      value={rev.reviewDate || ''}
                      onChange={(e) => updateReview(idx, 'reviewDate', e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Client feedback / review text..."
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
            id="update-service-button"
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition flex items-center gap-2"
          >
            {isSaving ? (
              <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save size={14} />
            )}
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
