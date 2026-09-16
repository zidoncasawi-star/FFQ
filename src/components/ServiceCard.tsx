// src/components/ServiceCard.tsx
import React from 'react';
import { Star, ExternalLink, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Service } from '../types.ts';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const minDelivery = service.packages && service.packages.length > 0
    ? service.packages[0].deliveryDays
    : '2-4 Days';

  return (
    <div
      id={`service-card-${service.id}`}
      className="group bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition duration-200 flex flex-col overflow-hidden"
    >
      {/* Card Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={service.mainImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
        {/* Category Pill */}
        {service.category && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900/85 text-white backdrop-blur-sm shadow-sm">
            {service.category}
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Rating and Delivery Row */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {service.sellerUsername && (
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-100">
                @{service.sellerUsername}
              </span>
            )}
            <div className="flex items-center text-amber-500 font-semibold">
              <Star size={14} className="fill-amber-400 text-amber-400 mr-1" />
              <span>{service.ratingValue ? Number(service.ratingValue).toFixed(1) : '5.0'}</span>
            </div>
            <span className="text-slate-400">({service.ratingCount || 10}+)</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 shrink-0">
            <Clock size={13} />
            <span>{minDelivery}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(service)}
          className="text-base font-bold text-slate-900 line-clamp-2 hover:text-emerald-700 cursor-pointer transition mb-2"
        >
          {service.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed flex-1">
          {service.description || 'Specialized QuickBooks configuration and bookkeeping services on Fiverr.'}
        </p>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-medium">Starting at</span>
            <span className="text-lg font-bold text-slate-900">
              ${service.priceStarting || (service.packages && service.packages[0]?.price) || 50}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`view-details-${service.id}`}
              onClick={() => onSelect(service)}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              View Packages
            </button>
            <a
              id={`order-fiverr-${service.id}`}
              href={service.fiverrUrl}
              target="_blank"
              rel="nofollow noopener"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition shadow-sm"
              title="View on Fiverr"
            >
              <span>Fiverr</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
