// src/pages/admin/AdminDashboardPage.tsx
import React, { useState } from 'react';
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { Service } from '../../types.ts';

interface AdminDashboardPageProps {
  services: Service[];
  onAddNew: () => void;
  onEdit: (service: Service) => void;
  onPreview: (service: Service) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'draft' | 'published') => void;
  onLogout: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  services,
  onAddNew,
  onEdit,
  onPreview,
  onDelete,
  onToggleStatus,
  onLogout,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const publishedCount = services.filter((s) => s.status === 'published').length;
  const draftCount = services.filter((s) => s.status === 'draft').length;

  const filteredServices = services.filter((s) => {
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    const matchesSearch =
      !searchQuery.trim() ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div id="admin-dashboard-container" className="space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
            Directory Administration
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            QuickBooks Fiverr Services
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your affiliate gig catalog, scrape fresh listings from Fiverr, and review drafts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="admin-add-new-button"
            onClick={onAddNew}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            <Plus size={16} />
            <span>Add / Scrape Gigs</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
            title="Log out"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Services</span>
            <span className="text-2xl font-bold text-slate-900">{services.length}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <Layers size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Published Public Gigs</span>
            <span className="text-2xl font-bold text-emerald-600">{publishedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Pending Drafts</span>
            <span className="text-2xl font-bold text-amber-600">{draftCount}</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({services.length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'published'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'draft'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Drafts ({draftCount})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title or category..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Starting</th>
                <th className="py-3.5 px-4">Packages</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No services found. Click "Add / Scrape Gigs" to extract new listings.
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => {
                  const isPublished = service.status === 'published';
                  return (
                    <tr key={service.id} className="hover:bg-slate-50/80 transition">
                      {/* Image + Title */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={service.mainImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=150&q=80'}
                            alt=""
                            className="w-12 h-9 object-cover rounded-md border border-slate-200 shrink-0"
                          />
                          <div className="truncate">
                            <span className="font-bold text-slate-900 block truncate" title={service.title}>
                              {service.title}
                            </span>
                            <a
                              href={service.fiverrUrl}
                              target="_blank"
                              rel="nofollow noopener"
                              className="text-[10px] text-emerald-700 hover:underline flex items-center gap-1"
                            >
                              <span>Fiverr Link</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {service.category || 'General'}
                        </span>
                      </td>

                      {/* Starting Price */}
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ${service.priceStarting || (service.packages?.[0]?.price) || 0}
                      </td>

                      {/* Packages Count */}
                      <td className="py-3 px-4 text-slate-600">
                        {service.packages?.length || 0} tiers
                      </td>

                      {/* Status with Quick Toggle */}
                      <td className="py-3 px-4">
                        <button
                          id={`toggle-status-${service.id}`}
                          onClick={() => onToggleStatus(service.id, isPublished ? 'draft' : 'published')}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 transition ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                          }`}
                          title="Click to toggle status"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${isPublished ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                          <span className="capitalize">{service.status}</span>
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            id={`preview-service-${service.id}`}
                            onClick={() => onPreview(service)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                            title="Preview Public Page"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            id={`edit-service-${service.id}`}
                            onClick={() => onEdit(service)}
                            className="p-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 rounded-lg transition"
                            title="Edit Service"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            id={`delete-service-${service.id}`}
                            onClick={() => setServiceToDelete(service)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Service"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full shadow-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Delete this service?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>"{serviceToDelete.title}"</strong> from the directory? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setServiceToDelete(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-service-btn"
                onClick={() => {
                  onDelete(serviceToDelete.id);
                  setServiceToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
