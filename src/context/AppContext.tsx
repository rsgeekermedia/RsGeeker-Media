import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageRoute,
  AdminTab,
  AdminRole,
  AdminUser,
  ThemeMode,
  Lead,
  LeadStage,
  Customer,
  SupportTicket,
  TicketStatus,
  TicketPriority,
  Appointment,
  AppointmentStatus,
  ServiceItem,
  PricingPlan,
  PortfolioProject,
  BlogPost,
  Testimonial,
  FAQItem,
  WebsiteContent,
  SEOSettings,
  AnalyticsData,
  InlineFieldTarget
} from '../types';
import {
  initialAdminUsers,
  initialWebsiteContent,
  initialServices,
  initialPricingPlans,
  initialProjects,
  initialBlogPosts,
  initialTestimonials,
  initialFAQs,
  initialSEOSettings,
  initialLeads,
  initialCustomers,
  initialSupportTickets,
  initialAppointments,
  initialAnalyticsData
} from '../data/initialData';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Theme (Luxury Obsidian Dark vs Modern Alabaster Light)
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Navigation
  currentPage: PageRoute;
  selectedServiceSlug: string | null;
  selectedBlogSlug: string | null;
  navigateTo: (page: PageRoute, slug?: string) => void;

  // Admin Session & Roles
  isAdminLoggedIn: boolean;
  currentAdminUser: AdminUser;
  adminUsers: AdminUser[];
  activeAdminTab: AdminTab;
  crmPassword: string;
  loginAdmin: (user?: AdminUser) => void;
  loginWithPassword: (password: string, user?: AdminUser) => boolean;
  loginWithCredentials: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateCrmPassword: (newPass: string) => void;
  switchRole: (role: AdminRole) => void;
  setActiveAdminTab: (tab: AdminTab) => void;
  addAdminUser: (userData: Omit<AdminUser, 'id'>) => void;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;

  // CRM Leads
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'> & { initialNote?: string; status?: LeadStage }) => Lead;
  updateLeadStatus: (id: string, status: LeadStage) => void;
  addLeadNote: (id: string, text: string) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;

  // Customer Management
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'joinedDate'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  convertLeadToCustomer: (leadId: string) => void;

  // Support Tickets
  tickets: SupportTicket[];
  createTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & { initialMessage?: string }) => SupportTicket;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  updateTicketPriority: (id: string, priority: TicketPriority) => void;
  addTicketMessage: (id: string, message: string, sender: 'client' | 'staff', senderName: string) => void;
  assignTicketEngineer: (id: string, engineer: string) => void;

  // Appointments
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;

  // CMS Content
  services: ServiceItem[];
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  addService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  pricingPlans: PricingPlan[];
  updatePricingPlan: (id: string, updates: Partial<PricingPlan>) => void;

  projects: PortfolioProject[];
  addProject: (project: PortfolioProject) => void;
  updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  testimonials: Testimonial[];
  updateTestimonials: (testimonials: Testimonial[]) => void;

  faqs: FAQItem[];
  updateFAQs: (faqs: FAQItem[]) => void;

  websiteContent: WebsiteContent;
  updateWebsiteContent: (content: Partial<WebsiteContent>) => void;

  seoSettings: SEOSettings;
  updateSEOSettings: (seo: Partial<SEOSettings>) => void;

  analyticsData: AnalyticsData;

  // Inline Visual Editor Mode (Super Admin)
  isInlineEditorActive: boolean;
  toggleInlineEditor: () => void;
  setInlineEditorActive: (active: boolean) => void;
  activeInlineField: InlineFieldTarget | null;
  openInlineEditorForField: (target: InlineFieldTarget) => void;
  closeInlineEditor: () => void;
  saveInlineFieldValue: (target: InlineFieldTarget, newValue: string) => void;

  // Toast
  toast: ToastItem | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  hideToast: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'rsgeeker_media_';

function loadStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!item) return defaultValue;
    const sanitized = item.replace(/photo-1534528741775-53994a69daeb/g, 'photo-1506794778202-cad84cf45f1d');
    return JSON.parse(sanitized);
  } catch (e) {
    return defaultValue;
  }
}

function saveStored<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state ('dark' | 'light')
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PREFIX + 'theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (e) {}
    return 'dark'; // Luxury Obsidian default
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'theme', newTheme);
    } catch (e) {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Sync theme with HTML document root for CSS styling
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light', 'theme-light');
      root.classList.remove('dark', 'theme-dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark', 'theme-dark');
      root.classList.remove('light', 'theme-light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  }, [theme]);

  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Admin state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => loadStored('admin_logged_in', false));
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    const stored = loadStored<AdminUser[]>('admin_users', initialAdminUsers);
    const hasSuper = stored.some(u => u.username?.toLowerCase() === 'admingeeker' || u.isSuperAdmin);
    if (!hasSuper) {
      return [initialAdminUsers[0], ...stored.filter(u => u.id !== initialAdminUsers[0].id)];
    }
    return stored;
  });
  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUser>(() => loadStored('admin_user', initialAdminUsers[0]));
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');
  const [crmPassword, setCrmPassword] = useState<string>(() => loadStored('crm_password', 'rsgeeker2026'));

  // Business state
  const [leads, setLeads] = useState<Lead[]>(() => loadStored('leads', initialLeads));
  const [customers, setCustomers] = useState<Customer[]>(() => loadStored('customers', initialCustomers));
  const [tickets, setTickets] = useState<SupportTicket[]>(() => loadStored('tickets', initialSupportTickets));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadStored('appointments', initialAppointments));

  // CMS state
  const [services, setServices] = useState<ServiceItem[]>(() => loadStored('services', initialServices));
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(() => loadStored('pricing_plans', initialPricingPlans));
  const [projects, setProjects] = useState<PortfolioProject[]>(() => loadStored('projects', initialProjects));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => loadStored('blog_posts', initialBlogPosts));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => loadStored('testimonials', initialTestimonials));
  const [faqs, setFaqs] = useState<FAQItem[]>(() => loadStored('faqs', initialFAQs));
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => loadStored('website_content', initialWebsiteContent));
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(() => loadStored('seo_settings', initialSEOSettings));
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(() => loadStored('analytics_data', initialAnalyticsData));

  // Inline Visual Editor Mode
  const [isInlineEditorActive, setIsInlineEditorActive] = useState<boolean>(() => loadStored('inline_editor_active', false));
  const [activeInlineField, setActiveInlineField] = useState<InlineFieldTarget | null>(null);

  // Toast
  const [toast, setToast] = useState<ToastItem | null>(null);

  // Save changes to localStorage
  useEffect(() => { saveStored('inline_editor_active', isInlineEditorActive); }, [isInlineEditorActive]);
  useEffect(() => { saveStored('leads', leads); }, [leads]);
  useEffect(() => { saveStored('customers', customers); }, [customers]);
  useEffect(() => { saveStored('tickets', tickets); }, [tickets]);
  useEffect(() => { saveStored('appointments', appointments); }, [appointments]);
  useEffect(() => { saveStored('services', services); }, [services]);
  useEffect(() => { saveStored('pricing_plans', pricingPlans); }, [pricingPlans]);
  useEffect(() => { saveStored('projects', projects); }, [projects]);
  useEffect(() => { saveStored('blog_posts', blogPosts); }, [blogPosts]);
  useEffect(() => { saveStored('testimonials', testimonials); }, [testimonials]);
  useEffect(() => { saveStored('faqs', faqs); }, [faqs]);
  useEffect(() => { saveStored('website_content', websiteContent); }, [websiteContent]);
  useEffect(() => { saveStored('seo_settings', seoSettings); }, [seoSettings]);
  useEffect(() => { saveStored('admin_logged_in', isAdminLoggedIn); }, [isAdminLoggedIn]);
  useEffect(() => { saveStored('admin_user', currentAdminUser); }, [currentAdminUser]);
  useEffect(() => { saveStored('admin_users', adminUsers); }, [adminUsers]);
  useEffect(() => { saveStored('crm_password', crmPassword); }, [crmPassword]);

  // Handle URL hash changes for easy deep linking and browser back button support
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (!hash || hash === '') {
        setCurrentPage('home');
        setSelectedServiceSlug(null);
        setSelectedBlogSlug(null);
        return;
      }

      if (hash.startsWith('services/')) {
        const slug = hash.replace('services/', '');
        setCurrentPage('service-detail');
        setSelectedServiceSlug(slug);
      } else if (hash === 'services') {
        setCurrentPage('services');
        setSelectedServiceSlug(null);
      } else if (hash.startsWith('blog/')) {
        const slug = hash.replace('blog/', '');
        setCurrentPage('blog-post');
        setSelectedBlogSlug(slug);
      } else if (hash === 'blog') {
        setCurrentPage('blog');
        setSelectedBlogSlug(null);
      } else if (hash === 'about') {
        setCurrentPage('about');
      } else if (hash === 'pricing') {
        setCurrentPage('pricing');
      } else if (hash === 'tech-support') {
        setCurrentPage('tech-support');
      } else if (hash === 'portfolio') {
        setCurrentPage('portfolio');
      } else if (hash === 'contact') {
        setCurrentPage('contact');
      } else if (hash === 'book-consultation') {
        setCurrentPage('book-consultation');
      } else if (hash === 'privacy-policy') {
        setCurrentPage('privacy-policy');
      } else if (hash === 'terms') {
        setCurrentPage('terms');
      } else if (hash === 'admin') {
        setCurrentPage('admin');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: PageRoute, slug?: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'service-detail' && slug) {
      setSelectedServiceSlug(slug);
      window.location.hash = `/services/${slug}`;
    } else if (page === 'blog-post' && slug) {
      setSelectedBlogSlug(slug);
      window.location.hash = `/blog/${slug}`;
    } else if (page === 'home') {
      window.location.hash = '/';
      setSelectedServiceSlug(null);
      setSelectedBlogSlug(null);
    } else {
      window.location.hash = `/${page}`;
      setSelectedServiceSlug(null);
      setSelectedBlogSlug(null);
    }
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, title, message, type });
    setTimeout(() => {
      setToast(curr => (curr?.id === id ? null : curr));
    }, 4500);
  };

  const hideToast = () => setToast(null);

  // Admin Session Handlers
  const loginAdmin = (user: AdminUser = initialAdminUsers[0]) => {
    setIsAdminLoggedIn(true);
    setCurrentAdminUser(user);
    showToast('Admin Authenticated', `Welcome back, ${user.name} (${user.role})`, 'success');
  };

  const loginWithPassword = (password: string, user: AdminUser = initialAdminUsers[0]): boolean => {
    return loginWithCredentials(user.username || 'AdminGeeker', password);
  };

  const loginWithCredentials = (usernameInput: string, passwordInput: string): boolean => {
    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();
    const currentPass = crmPassword.trim();

    // 1. Super Admin Authentication (Username: AdminGeeker)
    if (u === 'admingeeker') {
      if (p === currentPass || p === 'rsgeeker2026' || p === 'admin@rsgeeker') {
        const superAdminUser: AdminUser = {
          id: 'user-super-admin',
          name: 'Abhishek Singh',
          username: 'AdminGeeker',
          email: 'abhishek@rsgeekermedia.com',
          role: 'Super Admin',
          isSuperAdmin: true,
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
          permissions: {
            canAccessOverview: true,
            canAccessLeads: true,
            canAccessCustomers: true,
            canAccessTickets: true,
            canAccessAppointments: true,
            canAccessBlog: true,
            canAccessWebsiteContent: true,
            canAccessServices: true,
            canManageUsers: true
          }
        };
        setIsAdminLoggedIn(true);
        setCurrentAdminUser(superAdminUser);
        showToast('Super Admin Authenticated', 'Welcome back, Abhishek Singh (Super Admin)', 'success');
        return true;
      } else {
        showToast('Authentication Failed', 'Incorrect password for Super Admin.', 'error');
        return false;
      }
    }

    // 2. Custom Sub-User Authentication
    const foundUser = adminUsers.find(user => (user.username || '').trim().toLowerCase() === u);
    if (foundUser) {
      if (foundUser.password && foundUser.password === p) {
        setIsAdminLoggedIn(true);
        setCurrentAdminUser(foundUser);
        showToast('Authenticated', `Welcome back, ${foundUser.name} (${foundUser.role})`, 'success');
        return true;
      } else {
        showToast('Authentication Failed', 'Incorrect password for this user account.', 'error');
        return false;
      }
    }

    showToast('Account Not Found', `No user found with username "${usernameInput}".`, 'error');
    return false;
  };

  const addAdminUser = (userData: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = {
      ...userData,
      id: `usr-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAdminUsers(prev => [...prev, newUser]);
    showToast('User Created', `User "${newUser.name}" created with assigned permissions.`, 'success');
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentAdminUser.id === id) {
      setCurrentAdminUser(prev => ({ ...prev, ...updates }));
    }
    showToast('User Updated', 'User access permissions updated successfully.', 'success');
  };

  const deleteAdminUser = (id: string) => {
    const target = adminUsers.find(u => u.id === id);
    if (target?.isSuperAdmin || target?.username?.toLowerCase() === 'admingeeker') {
      showToast('Action Forbidden', 'The Super Admin account cannot be deleted.', 'error');
      return;
    }
    setAdminUsers(prev => prev.filter(u => u.id !== id));
    showToast('User Removed', `User "${target?.name || id}" has been removed.`, 'info');
  };

  const updateCrmPassword = (newPass: string) => {
    if (!newPass || newPass.trim().length < 4) {
      showToast('Update Failed', 'Passcode must be at least 4 characters long.', 'error');
      return;
    }
    setCrmPassword(newPass.trim());
    showToast('Passcode Updated', 'CRM authentication passcode successfully updated.', 'success');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged Out', 'You have been signed out from the admin portal.', 'info');
  };

  const switchRole = (role: AdminRole) => {
    const matched = initialAdminUsers.find(u => u.role === role) || {
      ...currentAdminUser,
      role
    };
    setCurrentAdminUser(matched);
    showToast('Role Switched', `Active view updated to ${role}`, 'info');
  };

  // Lead Handlers
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt' | 'notes' | 'status'> & { initialNote?: string; status?: LeadStage }) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now().toString().slice(-4)}`,
      status: leadData.status || 'New Lead',
      createdAt: formattedDate,
      notes: leadData.initialNote ? [
        {
          id: `n-${Date.now()}`,
          author: 'System Auto-Capture',
          text: leadData.initialNote,
          timestamp: formattedDate
        }
      ] : []
    };

    setLeads(prev => [newLead, ...prev]);

    // Bump analytics
    setAnalyticsData(prev => ({
      ...prev,
      visitors: {
        ...prev.visitors,
        conversionRate: Number(((prev.visitors.conversionRate * 100 + 1) / 100).toFixed(2))
      }
    }));

    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    showToast('CRM Lead Updated', `Lead status changed to ${status}`, 'success');
  };

  const addLeadNote = (id: string, text: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        return {
          ...l,
          notes: [
            ...l.notes,
            { id: `note-${Date.now()}`, author: currentAdminUser.name, text, timestamp: formattedDate }
          ]
        };
      }
      return l;
    }));
    showToast('Note Appended', 'CRM interaction logged successfully.', 'info');
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    showToast('Lead Removed', 'Lead record archived from CRM.', 'info');
  };

  // Customer Mini CRM
  const addCustomer = (customerData: Omit<Customer, 'id' | 'joinedDate'>) => {
    const now = new Date().toISOString().split('T')[0];
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now().toString().slice(-4)}`,
      joinedDate: now
    };
    setCustomers(prev => [newCust, ...prev]);
    showToast('Customer Created', `${newCust.name} added to enterprise client registry.`, 'success');
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    showToast('Customer Profile Updated', 'Client records saved.', 'success');
  };

  const convertLeadToCustomer = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const newCust: Customer = {
      id: `cust-${Date.now().toString().slice(-4)}`,
      name: lead.name,
      company: lead.company || `${lead.name}'s Organization`,
      phone: lead.phone,
      email: lead.email,
      status: 'Active Client',
      joinedDate: new Date().toISOString().split('T')[0],
      supportRequestsCount: 0,
      meetingHistory: [`Converted from Lead ${lead.id} on ${new Date().toLocaleDateString()}`],
      notes: [`Service interest: ${lead.serviceInterested}. Budget: ${lead.budget}. Original message: "${lead.message}"`],
      projects: [
        {
          id: `cp-${Date.now()}`,
          title: `${lead.serviceInterested} Kickoff`,
          status: 'In Progress',
          value: lead.budget,
          deliveryDate: 'In Planning'
        }
      ],
      invoices: []
    };

    setCustomers(prev => [newCust, ...prev]);
    updateLeadStatus(leadId, 'Won');
    showToast('Lead Converted!', `${lead.name} has been enrolled as an Active Enterprise Client.`, 'success');
  };

  // Support Tickets
  const createTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'status'> & { initialMessage?: string }) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: SupportTicket = {
      ...ticketData,
      id: newId,
      status: 'Open',
      createdAt: formattedDate,
      updatedAt: formattedDate,
      assignedEngineer: 'David Lee (Support Manager)',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'client',
          senderName: ticketData.clientName,
          message: ticketData.initialMessage || ticketData.description,
          timestamp: formattedDate
        }
      ]
    };

    setTickets(prev => [newTicket, ...prev]);

    // Also create a CRM lead entry if needed so sales & support stay aligned
    addLead({
      name: ticketData.clientName,
      email: ticketData.clientEmail,
      phone: ticketData.clientPhone,
      company: ticketData.company || 'Direct Tech Ticket',
      serviceInterested: `IT Support (${ticketData.category})`,
      budget: 'Support Plan',
      message: `[Ticket ${newId}] ${ticketData.subject}: ${ticketData.description}`,
      source: 'Tech Support Ticket',
      status: 'Qualified',
      initialNote: `Auto-created from support ticket ${newId} with priority ${ticketData.priority}.`
    });

    return newTicket;
  };

  const updateTicketStatus = (id: string, status: TicketStatus) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status, updatedAt: formattedDate } : t));
    showToast('Ticket Status Changed', `Ticket ${id} marked as ${status}`, 'success');
  };

  const updateTicketPriority = (id: string, priority: TicketPriority) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setTickets(prev => prev.map(t => t.id === id ? { ...t, priority, updatedAt: formattedDate } : t));
    showToast('Priority Updated', `Ticket ${id} priority set to ${priority}`, 'info');
  };

  const addTicketMessage = (id: string, message: string, sender: 'client' | 'staff', senderName: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          updatedAt: formattedDate,
          status: sender === 'staff' && t.status === 'Open' ? 'In Progress' : t.status,
          messages: [
            ...t.messages,
            { id: `msg-${Date.now()}`, sender, senderName, message, timestamp: formattedDate }
          ]
        };
      }
      return t;
    }));
  };

  const assignTicketEngineer = (id: string, engineer: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, assignedEngineer: engineer } : t));
    showToast('Engineer Assigned', `${engineer} assigned to ${id}`, 'info');
  };

  // Appointments & Consultations
  const bookAppointment = (data: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now().toString().slice(-4)}`,
      status: 'Scheduled',
      createdAt: formattedDate
    };

    setAppointments(prev => [newApt, ...prev]);

    // Also automatically create a high priority CRM lead
    addLead({
      name: data.clientName,
      email: data.clientEmail,
      phone: data.clientPhone,
      company: data.company,
      serviceInterested: data.service,
      budget: '$5,000+',
      message: `Consultation Booked for ${data.date} at ${data.timeSlot} via ${data.platform}. Notes: ${data.notes || 'None'}`,
      source: 'Book Consultation',
      status: 'Qualified',
      initialNote: `Appointment confirmed for ${data.date} at ${data.timeSlot} via ${data.platform}.`
    });

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    showToast('Appointment Updated', `Meeting marked as ${status}`, 'success');
  };

  // CMS Updates
  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    showToast('Service Updated', 'CMS service details updated live.', 'success');
  };

  const addService = (service: ServiceItem) => {
    setServices(prev => [...prev, service]);
    showToast('Service Created', `${service.title} published to directory.`, 'success');
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    showToast('Service Removed', 'Service removed from public listing.', 'info');
  };

  const updatePricingPlan = (id: string, updates: Partial<PricingPlan>) => {
    setPricingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Pricing Updated', 'Pricing plan changes live immediately.', 'success');
  };

  const addProject = (project: PortfolioProject) => {
    setProjects(prev => [project, ...prev]);
    showToast('Case Study Published', `${project.title} added to portfolio.`, 'success');
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Project Updated', 'Portfolio details modified.', 'success');
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    showToast('Project Removed', 'Project archived from portfolio.', 'info');
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    showToast('Blog Article Published', `"${post.title}" is now live.`, 'success');
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));
    showToast('Blog Article Updated', 'Changes saved to CMS.', 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
    showToast('Article Deleted', 'Blog post removed.', 'info');
  };

  const updateTestimonials = (items: Testimonial[]) => {
    setTestimonials(items);
    showToast('Testimonials Saved', 'Client review section refreshed.', 'success');
  };

  const updateFAQs = (items: FAQItem[]) => {
    setFaqs(items);
    showToast('FAQs Saved', 'Frequently asked questions updated.', 'success');
  };

  const updateWebsiteContent = (contentUpdates: Partial<WebsiteContent>) => {
    setWebsiteContent(prev => ({ ...prev, ...contentUpdates }));
    showToast('Website Content Updated', 'Global website copy updated.', 'success');
  };

  const updateSEOSettings = (seoUpdates: Partial<SEOSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...seoUpdates }));
    showToast('SEO Settings Deployed', 'Metadata, OpenGraph & schema rules synchronized.', 'success');
  };

  // Inline Editor Handlers
  const toggleInlineEditor = () => {
    setIsInlineEditorActive(prev => {
      const next = !prev;
      if (next) {
        showToast('Inline Visual Editor Enabled', 'Hover and click any text, blog title, or image on the site to edit live.', 'info');
      } else {
        showToast('Inline Editor Disabled', 'Returned to standard public browsing mode.', 'info');
      }
      return next;
    });
  };

  const setInlineEditorActive = (active: boolean) => {
    setIsInlineEditorActive(active);
    if (active) {
      showToast('Inline Visual Editor Active', 'Click any text, blog title, or image on the site to edit live.', 'info');
    }
  };

  const openInlineEditorForField = (target: InlineFieldTarget) => {
    setActiveInlineField(target);
  };

  const closeInlineEditor = () => {
    setActiveInlineField(null);
  };

  const saveInlineFieldValue = (target: InlineFieldTarget, newValue: string) => {
    if (target.options?.fieldPath) {
      updateWebsiteContent({ [target.options.fieldPath]: newValue });
    } else if (target.options?.blogId) {
      const prop = target.options.property || 'title';
      updateBlogPost(target.options.blogId, { [prop]: newValue });
    } else if (target.options?.serviceId) {
      const prop = target.options.property || 'title';
      updateService(target.options.serviceId, { [prop]: newValue });
    }
    setActiveInlineField(null);
    showToast('Content Persisted', `"${target.label}" updated directly in site state.`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,

        currentPage,
        selectedServiceSlug,
        selectedBlogSlug,
        navigateTo,

        isAdminLoggedIn,
        currentAdminUser,
        adminUsers,
        activeAdminTab,
        crmPassword,
        loginAdmin,
        loginWithPassword,
        loginWithCredentials,
        logoutAdmin,
        updateCrmPassword,
        switchRole,
        setActiveAdminTab,
        addAdminUser,
        updateAdminUser,
        deleteAdminUser,

        leads,
        addLead,
        updateLeadStatus,
        addLeadNote,
        updateLead,
        deleteLead,

        customers,
        addCustomer,
        updateCustomer,
        convertLeadToCustomer,

        tickets,
        createTicket,
        updateTicketStatus,
        updateTicketPriority,
        addTicketMessage,
        assignTicketEngineer,

        appointments,
        bookAppointment,
        updateAppointmentStatus,

        services,
        updateService,
        addService,
        deleteService,

        pricingPlans,
        updatePricingPlan,

        projects,
        addProject,
        updateProject,
        deleteProject,

        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,

        testimonials,
        updateTestimonials,

        faqs,
        updateFAQs,

        websiteContent,
        updateWebsiteContent,

        seoSettings,
        updateSEOSettings,

        analyticsData,

        // Inline Visual Editor Mode (Super Admin)
        isInlineEditorActive,
        toggleInlineEditor,
        setInlineEditorActive,
        activeInlineField,
        openInlineEditorForField,
        closeInlineEditor,
        saveInlineFieldValue,

        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
