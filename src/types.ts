export type ThemeMode = 'dark' | 'light';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'pricing'
  | 'tech-support'
  | 'portfolio'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'book-consultation'
  | 'privacy-policy'
  | 'terms'
  | 'admin';

export type AdminTab = 
  | 'overview'
  | 'analytics'
  | 'leads'
  | 'customers'
  | 'tickets'
  | 'appointments'
  | 'cms'
  | 'pricing'
  | 'users'
  | 'settings';

export type AdminRole = 'Super Admin' | 'Editor' | 'Sales Manager' | 'Support Manager' | 'Custom Role';

export interface AdminPermissions {
  canAccessOverview: boolean;
  canAccessLeads: boolean;
  canAccessCustomers: boolean;
  canAccessTickets: boolean;
  canAccessAppointments: boolean;
  canAccessBlog: boolean;
  canAccessWebsiteContent: boolean;
  canAccessServices: boolean;
  canManageUsers: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  username: string;
  password?: string;
  email: string;
  role: string;
  avatar: string;
  isSuperAdmin?: boolean;
  permissions?: AdminPermissions;
  createdAt?: string;
}

// Lead Management CRM
export type LeadStage = 'New Lead' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Won' | 'Lost';

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterested: string;
  budget: string;
  message: string;
  source: string; // e.g., 'Website Form', 'Services Page', 'Book Consultation', 'Google Ads'
  status: LeadStage;
  createdAt: string;
  assignedTo?: string;
  notes: LeadNote[];
  followUpDate?: string;
}

// Customer Profile (Mini CRM)
export interface CustomerProject {
  id: string;
  title: string;
  status: 'In Progress' | 'Completed' | 'Review' | 'On Hold';
  value: string;
  deliveryDate: string;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  amount: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  avatar?: string;
  status: 'Active Client' | 'Onboarding' | 'Enterprise Retainer' | 'Past Client';
  projects: CustomerProject[];
  invoices: CustomerInvoice[];
  supportRequestsCount: number;
  meetingHistory: string[];
  notes: string[];
  joinedDate: string;
}

// Support Ticket System
export type TicketStatus = 'Open' | 'In Progress' | 'Pending' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TicketMessage {
  id: string;
  sender: 'client' | 'staff';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string; // e.g. TICK-1042
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company?: string;
  category: string; // e.g., 'Network Troubleshooting', 'Website Issues', 'Remote Support', 'Email Configuration', 'Software Issues'
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedEngineer?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

// Appointments & Consultation Booking
export type AppointmentStatus = 'Scheduled' | 'Approved' | 'Completed' | 'Rescheduled' | 'Cancelled';

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  service: string;
  date: string;
  timeSlot: string;
  platform: 'Google Meet' | 'Microsoft Teams' | 'Phone Call';
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

// Services
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Digital Marketing' | 'Engineering' | 'IT Support';
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  benefits: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  startingPrice: string;
  popular?: boolean;
}

// Pricing Packages
export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  popular: boolean;
  ctaText: string;
}

// Portfolio Project
export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'Website Development' | 'Marketing' | 'Branding' | 'Tech Support';
  description: string;
  image: string;
  results: string[];
  tags: string[];
  year: string;
  featured?: boolean;
}

// Blog Post
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
  featured?: boolean;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  resultsAchieved: string;
}

// FAQ
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Pricing' | 'Tech Support';
}

// SEO Settings
export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsTxt: string;
  sitemapXml: string;
}

// Website Content (CMS)
export interface WebsiteContent {
  // Hero & Brand
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroCtaText: string;
  heroImage: string;

  // Key Stats
  statsClientsCount: string;
  statsClientsLabel: string;
  statsUptime: string;
  statsUptimeLabel: string;
  statsAdSpend: string;
  statsAdSpendLabel: string;
  statsRetention: string;
  statsRetentionLabel: string;

  // Founder & Executive Leadership
  founderName: string;
  founderRole: string;
  foundedYear: string;
  founderBio: string;
  founderQuote: string;
  founderImage: string;

  // About Page Story, Mission & Vision
  aboutTitle: string;
  aboutSubtitle: string;
  aboutStoryTitle: string;
  aboutStoryContent: string;
  aboutShowcaseImage: string;
  missionTitle: string;
  missionContent: string;
  visionTitle: string;
  visionContent: string;

  // Contact Details & Operations
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  emergencySupport: string;
  whatsappNumber: string;

  // Footer Copy
  footerDescription: string;
  footerTagline: string;
}

// Website Analytics
export interface AnalyticsData {
  visitors: {
    total: number;
    today: number;
    weekly: number;
    monthly: number;
    unique: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: string;
    conversionRate: number;
    returningVisitorsPercent: number;
  };
  trafficDaily: { date: string; visitors: number; pageViews: number; leads: number }[];
  trafficSources: { name: string; value: number; color: string }[];
  deviceBreakdown: { device: string; percentage: number }[];
  browserBreakdown: { browser: string; percentage: number }[];
  geoBreakdown: { country: string; visitors: number; flag: string }[];
  topPages: { path: string; views: number; uniqueVisitors: number; bounceRate: string }[];
}

// Inline Visual Editor Target
export type InlineTargetType = 'text' | 'textarea' | 'image' | 'blog' | 'service';

export interface InlineFieldTarget {
  id: string;
  label: string;
  type: InlineTargetType;
  currentValue: string;
  options?: {
    blogId?: string;
    serviceId?: string;
    property?: string;
    fieldPath?: keyof WebsiteContent | string;
  };
}
