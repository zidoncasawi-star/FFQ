// lib/db.ts
// Database abstraction supporting both Prisma ORM and built-in persistence

import { INITIAL_SERVICES, INITIAL_ADMIN, hashPassword } from '../prisma/seed.ts';
import { cleanGigTitle, extractSellerUsername } from './scraper.ts';

export interface ServiceRecord {
  id: string;
  title: string;
  slug: string;
  sellerUsername?: string;
  description: string;
  fiverrUrl: string;
  mainImage: string;
  priceStarting: number;
  category: string;
  ratingValue: number;
  ratingCount: number;
  status: 'draft' | 'published';
  packages: {
    id: string;
    serviceId: string;
    packageName: string;
    price: number;
    deliveryDays: string;
    description: string;
    sortOrder: number;
  }[];
  reviews: {
    id: string;
    serviceId: string;
    reviewerName: string;
    rating: number;
    comment: string;
    reviewDate: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserRecord {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

// In-memory / persistent runtime store for fast reactivity and zero-downtime demoing
class DatabaseStore {
  private services: ServiceRecord[] = [];
  private adminUsers: AdminUserRecord[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;

    // Seed admin
    this.adminUsers.push({
      id: 'admin_1',
      username: INITIAL_ADMIN.username,
      passwordHash: hashPassword(INITIAL_ADMIN.password),
      createdAt: new Date().toISOString(),
    });

    // Seed services
    INITIAL_SERVICES.forEach((s, idx) => {
      const serviceId = `srv_${idx + 1}`;
      const seedSeller = (s as any).sellerUsername || extractSellerUsername(s.fiverrUrl, s.title, idx === 0 ? 'cpa_expert' : idx === 1 ? 'mejaz86' : 'quickbooks_lead');
      const cleanTitle = cleanGigTitle(s.title, seedSeller);

      this.services.push({
        id: serviceId,
        title: cleanTitle,
        slug: s.slug,
        sellerUsername: seedSeller,
        description: s.description,
        fiverrUrl: s.fiverrUrl,
        mainImage: s.mainImage,
        priceStarting: s.priceStarting,
        category: s.category,
        ratingValue: s.ratingValue,
        ratingCount: s.ratingCount,
        status: s.status as 'draft' | 'published',
        packages: s.packages.map((p, pIdx) => ({
          id: `pkg_${serviceId}_${pIdx + 1}`,
          serviceId,
          packageName: p.packageName,
          price: p.price,
          deliveryDays: p.deliveryDays,
          description: p.description,
          sortOrder: p.sortOrder,
        })),
        reviews: s.reviews.map((r, rIdx) => ({
          id: `rev_${serviceId}_${rIdx + 1}`,
          serviceId,
          reviewerName: r.reviewerName,
          rating: r.rating,
          comment: r.comment,
          reviewDate: r.reviewDate,
        })),
        createdAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString(),
        updatedAt: new Date(Date.now() - (idx * 86400000 * 3)).toISOString(),
      });
    });

    this.initialized = true;
  }

  // Admin user methods
  public findAdminUser(username: string): AdminUserRecord | undefined {
    return this.adminUsers.find(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );
  }

  // Service methods
  public getServices(filters?: { status?: string; search?: string; category?: string }): ServiceRecord[] {
    let result = [...this.services];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter((s) => s.status === filters.status);
    }

    if (filters?.category && filters.category !== 'All') {
      result = result.filter((s) => s.category.toLowerCase() === filters.category?.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    return result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getServiceByIdOrSlug(idOrSlug: string): ServiceRecord | undefined {
    return this.services.find(
      (s) => s.id === idOrSlug || s.slug === idOrSlug
    );
  }

  public createService(data: Partial<ServiceRecord>): ServiceRecord {
    const id = `srv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const packages = (data.packages || []).map((p, idx) => ({
      id: p.id || `pkg_${id}_${idx + 1}`,
      serviceId: id,
      packageName: p.packageName || `Package ${idx + 1}`,
      price: Number(p.price || 0),
      deliveryDays: p.deliveryDays || '3 Days',
      description: p.description || '',
      sortOrder: p.sortOrder ?? idx + 1,
    }));

    const reviews = (data.reviews || []).map((r, idx) => ({
      id: r.id || `rev_${id}_${idx + 1}`,
      serviceId: id,
      reviewerName: r.reviewerName || 'Anonymous Client',
      rating: Number(r.rating || 5),
      comment: r.comment || '',
      reviewDate: r.reviewDate || 'Recently',
    }));

    const sellerUsername =
      data.sellerUsername ||
      extractSellerUsername(data.fiverrUrl || '', data.title, '');
    const cleanTitle = cleanGigTitle(data.title || 'Untitled QuickBooks Gig', sellerUsername);

    const newRecord: ServiceRecord = {
      id,
      title: cleanTitle || 'Untitled QuickBooks Gig',
      slug: data.slug || `qb-gig-${Date.now()}`,
      sellerUsername: sellerUsername || undefined,
      description: data.description || '',
      fiverrUrl: data.fiverrUrl || 'https://www.fiverr.com',
      mainImage: data.mainImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
      priceStarting: Number(data.priceStarting || packages[0]?.price || 0),
      category: data.category || 'Setup & Configuration',
      ratingValue: Number(data.ratingValue || 5.0),
      ratingCount: Number(data.ratingCount || 1),
      status: (data.status as 'draft' | 'published') || 'draft',
      packages,
      reviews,
      createdAt: now,
      updatedAt: now,
    };

    this.services.unshift(newRecord);
    return newRecord;
  }

  public updateService(id: string, updates: Partial<ServiceRecord>): ServiceRecord | null {
    const idx = this.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;

    const existing = this.services[idx];
    const now = new Date().toISOString();

    const sellerUsername =
      updates.sellerUsername !== undefined
        ? updates.sellerUsername
        : existing.sellerUsername ||
          extractSellerUsername(updates.fiverrUrl || existing.fiverrUrl || '', updates.title || existing.title, '');

    const cleanTitle = updates.title
      ? cleanGigTitle(updates.title, sellerUsername)
      : existing.title;

    const updatedPackages = updates.packages
      ? updates.packages.map((p, pIdx) => ({
          id: p.id || `pkg_${id}_${pIdx + 1}`,
          serviceId: id,
          packageName: p.packageName || `Package ${pIdx + 1}`,
          price: Number(p.price || 0),
          deliveryDays: p.deliveryDays || '3 Days',
          description: p.description || '',
          sortOrder: p.sortOrder ?? pIdx + 1,
        }))
      : existing.packages;

    const updatedReviews = updates.reviews
      ? updates.reviews.map((r, rIdx) => ({
          id: r.id || `rev_${id}_${rIdx + 1}`,
          serviceId: id,
          reviewerName: r.reviewerName || 'Client',
          rating: Number(r.rating || 5),
          comment: r.comment || '',
          reviewDate: r.reviewDate || 'Recently',
        }))
      : existing.reviews;

    const updatedRecord: ServiceRecord = {
      ...existing,
      ...updates,
      title: cleanTitle,
      sellerUsername: sellerUsername || undefined,
      priceStarting:
        updates.priceStarting !== undefined
          ? Number(updates.priceStarting)
          : existing.priceStarting,
      packages: updatedPackages,
      reviews: updatedReviews,
      updatedAt: now,
    };

    this.services[idx] = updatedRecord;
    return updatedRecord;
  }

  public deleteService(id: string): boolean {
    const initialLen = this.services.length;
    this.services = this.services.filter((s) => s.id !== id);
    return this.services.length < initialLen;
  }
}

export const dbStore = new DatabaseStore();

// For Prisma compatibility in Next.js environment:
export const prisma = {
  service: {
    findMany: async (args?: any) => {
      const status = args?.where?.status;
      return dbStore.getServices({ status });
    },
    findUnique: async (args: { where: { id?: string; slug?: string } }) => {
      const key = args.where.id || args.where.slug || '';
      return dbStore.getServiceByIdOrSlug(key);
    },
    create: async (args: { data: any }) => {
      return dbStore.createService(args.data);
    },
    update: async (args: { where: { id: string }; data: any }) => {
      return dbStore.updateService(args.where.id, args.data);
    },
    delete: async (args: { where: { id: string } }) => {
      return dbStore.deleteService(args.where.id);
    },
  },
  adminUser: {
    findUnique: async (args: { where: { username: string } }) => {
      return dbStore.findAdminUser(args.where.username);
    },
  },
};
