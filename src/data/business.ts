export type BusinessAdType = "poster" | "video";

export interface Business {
  id: string;
  name: string;
  nameMr?: string;
  ownerName: string;
  ownerAvatarUrl?: string;
  memberId?: string;
  category: string;
  categoryMr?: string;
  description: string;
  location: string;
  addressLine?: string; // full multi-line address for detail page
  mobile: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  adType: BusinessAdType;
  posterUrl?: string;
  youtubeUrl?: string;
  rating?: number;
  reviewCount?: number;
  isOpen?: boolean;
}

export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function toTelHref(mobile: string): string {
  return `tel:${mobile.replace(/[^\d+]/g, "")}`;
}

export function toWhatsAppHref(mobile: string, message?: string): string {
  const digits = mobile.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function toWebsiteHref(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function toMailHref(email: string): string {
  return `mailto:${email}`;
}

export function toDirectionsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getBusinessById(id: string): Business | undefined {
  return sampleBusinesses.find((b) => b.id === id);
}

export const sampleBusinesses: Business[] = [
  {
    id: "b1",
    name: "The Daily Mercantile",
    nameMr: "श्री स्वीट्स अँड फरसाण",
    ownerName: "Rajesh Kohali",
    ownerAvatarUrl: "https://i.pravatar.cc/80?img=12",
    memberId: "#4421",
    category: "Retail & Grocery",
    categoryMr: "मिठाई",
    description:
      "Kohali Supermart has been serving the community for over 15 years. We provide fresh groceries, daily essentials, and specialty cultural items. Committed to quality and community trust. Special discounts available for registered samaj members.",
    location: "Kohali Enclave, Pune",
    addressLine: "123 Heritage Marg, Kohali Enclave, Pune, Maharashtra 411038",
    mobile: "+919876543210",
    whatsapp: "+919876543210",
    email: "contact@dailymercantile.example.com",
    website: "shreesweets.example.com",
    adType: "poster",
    posterUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    rating: 4.8,
    reviewCount: 120,
    isOpen: true,
  },
  {
    id: "b2",
    name: "Patil Constructions",
    ownerName: "Anil Patil",
    memberId: "#3312",
    category: "Construction",
    categoryMr: "बांधकाम",
    description: "Residential and commercial construction, from foundation to finishing.",
    location: "Kohali Main Road",
    addressLine: "Plot 42, Kohali Main Road, Kolhapur, Maharashtra 416003",
    mobile: "+919812345678",
    adType: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.5,
    reviewCount: 38,
    isOpen: true,
  },
  {
    id: "b3",
    name: "Kohali Digital Studio",
    ownerName: "Priya Deshmukh",
    memberId: "#5108",
    category: "Photography",
    categoryMr: "फोटोग्राफी",
    description: "Wedding, event and portrait photography with same-day highlight reels.",
    location: "Near Gram Panchayat, Kohali",
    addressLine: "Shop 6, Gram Panchayat Road, Kohali, Maharashtra 416004",
    mobile: "+919900112233",
    whatsapp: "+919900112233",
    website: "instagram.com/kohalidigital",
    adType: "poster",
    posterUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80",
    rating: 4.9,
    reviewCount: 76,
    isOpen: false,
  },
];