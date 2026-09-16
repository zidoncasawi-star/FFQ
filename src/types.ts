// src/types.ts
// Shared types and interfaces for QB Gig Finder

export interface PackageItem {
  id?: string;
  serviceId?: string;
  packageName: string;
  price?: number;
  deliveryDays?: string;
  description?: string;
  sortOrder: number;
}

export interface ReviewItem {
  id?: string;
  serviceId?: string;
  reviewerName?: string;
  rating?: number;
  comment?: string;
  reviewDate?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  sellerUsername?: string;
  description?: string;
  fiverrUrl: string;
  mainImage?: string;
  priceStarting?: number;
  category?: string;
  ratingValue?: number;
  ratingCount: number;
  status: 'draft' | 'published';
  packages: PackageItem[];
  reviews: ReviewItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ScrapeResultPayload {
  success: boolean;
  error?: string;
  warning?: string;
  httpStatus?: number;
  data?: {
    title: string;
    slug: string;
    sellerUsername?: string;
    description: string;
    fiverrUrl: string;
    mainImage: string;
    priceStarting?: number;
    category: string;
    ratingValue?: number;
    ratingCount?: number;
    packages: PackageItem[];
    reviews: ReviewItem[];
    extractionSource?: {
      titleFrom: string;
      descriptionFrom: string;
      imageFrom: string;
      pricingFrom: string;
      packagesFound: number;
      reviewsFound: number;
    };
  };
}

export interface BulkScrapeItem {
  id: string;
  url: string;
  status: 'pending' | 'scraping' | 'success' | 'warning' | 'failed';
  title?: string;
  error?: string;
  warning?: string;
  selected: boolean;
  scrapedData?: any;
}
