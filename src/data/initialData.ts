import { 
  ServiceItem, 
  PricingPlan, 
  PortfolioProject, 
  BlogPost, 
  Testimonial, 
  FAQItem, 
  SEOSettings, 
  WebsiteContent, 
  Lead, 
  Customer, 
  SupportTicket, 
  Appointment, 
  AnalyticsData,
  AdminUser
} from '../types';

export const initialAdminUsers: AdminUser[] = [
  {
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
    },
    createdAt: '2024-01-15'
  },
  {
    id: 'user-2',
    name: 'Sarah Jenkins',
    username: 'sarah.sales',
    password: 'password123',
    email: 'sarah@rsgeekermedia.com',
    role: 'Sales Manager',
    isSuperAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canAccessOverview: true,
      canAccessLeads: true,
      canAccessCustomers: true,
      canAccessTickets: false,
      canAccessAppointments: true,
      canAccessBlog: false,
      canAccessWebsiteContent: false,
      canAccessServices: true,
      canManageUsers: false
    },
    createdAt: '2024-03-10'
  },
  {
    id: 'user-3',
    name: 'David Lee',
    username: 'david.tech',
    password: 'password123',
    email: 'david.tech@rsgeekermedia.com',
    role: 'Support Manager',
    isSuperAdmin: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    permissions: {
      canAccessOverview: false,
      canAccessLeads: false,
      canAccessCustomers: true,
      canAccessTickets: true,
      canAccessAppointments: false,
      canAccessBlog: false,
      canAccessWebsiteContent: false,
      canAccessServices: false,
      canManageUsers: false
    },
    createdAt: '2024-04-01'
  }
];

export const initialWebsiteContent: WebsiteContent = {
  // Hero & Brand
  heroTitle: 'Engineered Growth for Ambitious Modern Enterprises',
  heroSubtitle: 'RSGeeker Media unifies performance digital marketing, bespoke web platforms, and around-the-clock enterprise IT infrastructure into one seamless growth engine.',
  heroBadge: 'Bespoke Luxury Digital & Enterprise IT Engineering',
  heroCtaText: 'Schedule Strategic Discovery',
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',

  // Key Stats
  statsClientsCount: '150+',
  statsClientsLabel: 'Enterprise Deployments',
  statsUptime: '99.98%',
  statsUptimeLabel: 'Managed IT SLA Uptime',
  statsAdSpend: '$12M+',
  statsAdSpendLabel: 'Profitable Ad Spend Managed',
  statsRetention: '98%',
  statsRetentionLabel: 'Annual Client Retention',

  // Founder & Leadership
  founderName: 'Abhishek Singh',
  founderRole: 'Founder & Managing Director',
  foundedYear: '2020',
  founderBio: 'Abhishek Singh founded RSGeeker Media with a singular mission: bridge the gap between creative marketing excellence and bulletproof enterprise technology engineering. He has steered the agency into an international partner for high-growth tech ventures, e-commerce giants, and modern institutions.',
  founderQuote: 'We do not build generic websites or run vanity ad campaigns. We build resilient digital infrastructure and high-intent acquisition funnels that scale enterprise value predictably.',
  founderImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',

  // About Page
  aboutTitle: 'Bridging High-ROI Marketing With Resilient Enterprise IT',
  aboutSubtitle: 'Founded by Abhishek Singh, RSGeeker Media was forged to solve corporate technology\'s greatest pain points: vendor fragmentation and accountability leaks.',
  aboutStoryTitle: 'The RSGeeker Media Genesis',
  aboutStoryContent: 'Abhishek Singh recognized an acute inefficiency in the corporate landscape: businesses frequently hired separate marketing agencies, separate web developers, and separate IT support providers. These three pillars rarely communicated, leading to finger-pointing when campaigns failed, site outages during peak ad campaigns, and compromised cybersecurity. RSGeeker Media was born to unify these three mission-critical disciplines under one synchronized, accountable roof.',
  aboutShowcaseImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
  missionTitle: 'Our Mission',
  missionContent: 'To engineer sustainable enterprise growth through synchronized digital marketing, modern web platforms, and zero-downtime IT support.',
  visionTitle: 'Our Vision',
  visionContent: 'To become the gold standard partner for ambitious enterprises demanding unified technical competence, transparency, and relentless ROI.',

  // Contact Details
  phone: '+1 (800) 555-0199',
  email: 'rsgeeker.media@gmail.com',
  address: '548 Market St, Suite 72401, San Francisco, CA 94104',
  workingHours: 'Mon - Fri: 8:00 AM - 7:00 PM PST',
  emergencySupport: '24/7 Dedicated IT Emergency Line Active',
  whatsappNumber: '+18005550199',

  // Footer Copy
  footerDescription: 'Founded by Abhishek Singh, RSGeeker Media builds resilient digital growth engines. We harmonize full-funnel digital marketing, custom Next.js web applications, and round-the-clock enterprise IT support.',
  footerTagline: 'Digital Marketing & Enterprise IT'
};

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-seo',
    slug: 'seo',
    title: 'Search Engine Optimization (SEO)',
    category: 'Digital Marketing',
    tagline: 'Dominate organic search with data-backed technical SEO and authority building.',
    description: 'Our full-funnel search engine optimization strategy combines technical site architecture audits, core web vitals speed engineering, semantic content strategy, and high-impact digital PR authority acquisition. We turn organic search into your most profitable revenue channel.',
    iconName: 'Search',
    startingPrice: '$1,200 / mo',
    popular: true,
    features: [
      'Comprehensive Technical Site Audits & Indexing Optimization',
      'High-Intent Keyword & Semantic Entity Mapping',
      'On-Page Optimization & Schema.org Rich Snippets',
      'Authoritative Digital PR & Tier-1 Backlink Acquisition',
      'Monthly Real-Time Organic Growth Dashboards'
    ],
    benefits: [
      'Average +240% organic organic search visibility within 6 months',
      'Sustainable compounding traffic with zero reliance on ad spend spikes',
      'Higher conversion rates from high-intent transactional buyer queries'
    ],
    process: [
      { step: '01', title: 'Deep Technical Audit', desc: 'Crawl analysis, Core Web Vitals profiling, crawl budget review, and competitor backlink autopsy.' },
      { step: '02', title: 'Architecture & Strategy', desc: 'Topic clustering, internal linking roadmap, and high-intent commercial keyword mapping.' },
      { step: '03', title: 'Execution & Velocity', desc: 'Publishing optimized hubs, resolving schema issues, and conducting strategic digital PR outreach.' },
      { step: '04', title: 'Scale & Conversion', desc: 'Continuous keyword expansion, conversion rate experiments, and rank tracking reporting.' }
    ],
    faqs: [
      { question: 'How quickly can we expect measurable SEO results?', answer: 'Initial technical crawl fixes and keyword position movements typically surface within 30 to 60 days. Substantial revenue and traffic inflection points typically mature between 3 to 6 months.' },
      { question: 'Do you guarantee top 1 ranking on Google?', answer: 'No reputable enterprise agency guarantees static #1 rankings because algorithms evolve constantly. However, our 98% client retention rate reflects our consistent track record of generating top-3 placement for primary commercial intent keywords.' }
    ]
  },
  {
    id: 'srv-google-ads',
    slug: 'google-ads',
    title: 'Google Ads & Performance Max',
    category: 'Digital Marketing',
    tagline: 'High-intent PPC campaigns that capture active enterprise buyers at peak intent.',
    description: 'Precision-targeted paid search, display remarketing, YouTube video campaigns, and AI-optimized Performance Max funnels designed to maximize Return on Ad Spend (ROAS) and eliminate budget waste.',
    iconName: 'Target',
    startingPrice: '$1,500 / mo',
    popular: true,
    features: [
      'High-Intent Search Campaign Architectures',
      'Precision Performance Max & Feed Optimization',
      'Server-Side Google Tag Manager Conversion Tracking',
      'Negative Keyword Mining & Waste Eradication',
      'Custom Landing Page A/B Testing Integration'
    ],
    benefits: [
      'Immediate qualified inbound lead flow within 48 hours of launch',
      'Average 3.8x to 5.4x verified Return on Ad Spend (ROAS)',
      '100% transparent attribution with closed-loop CRM syncing'
    ],
    process: [
      { step: '01', title: 'Audience & Search Intent Audit', desc: 'Analyzing search query logs, competitor ad copy, and high-margin conversion triggers.' },
      { step: '02', title: 'Funnel & Tracking Setup', desc: 'Implementing server-side conversion tags, offline conversion imports, and tailored landing pages.' },
      { step: '03', title: 'Campaign Deployment', desc: 'Launching structured ad groups with responsive search ads and hyper-targeted ad extensions.' },
      { step: '04', title: 'Bid Algorithm Tuning', desc: 'Iterative value-based bidding adjustments and continuous search term optimization.' }
    ],
    faqs: [
      { question: 'What minimum ad spend budget do you recommend?', answer: 'We generally recommend a minimum monthly media ad budget of $2,000 for Google Ads to give the bidding algorithms enough statistical conversion signal to optimize efficiently.' }
    ]
  },
  {
    id: 'srv-meta-ads',
    slug: 'meta-ads',
    title: 'Meta Ads (Facebook & Instagram)',
    category: 'Digital Marketing',
    tagline: 'Scalable paid social funnels powered by high-converting creative testing frameworks.',
    description: 'We construct dynamic social ad funnels across Facebook and Instagram that capture passive attention, spark desire, and drive high-volume customer acquisitions. Utilizing first-party Conversions API (CAPI) for privacy-proof tracking.',
    iconName: 'Share2',
    startingPrice: '$1,400 / mo',
    features: [
      'Iterative Creative Testing Engine (Hooks, Angles, Formats)',
      'Full Meta Conversions API (CAPI) First-Party Integration',
      'Dynamic Product Ads (DPA) & Catalog Retargeting',
      'Hyper-Targeted Lookalike & Broad Demographic Scaling',
      'Real-Time Customer Acquisition Cost (CAC) Tracking'
    ],
    benefits: [
      'Lower CAC through rapid viral creative iteration and testing',
      'Predictable top-of-funnel customer generation at scale',
      'Resilient tracking immune to iOS privacy constraints'
    ],
    process: [
      { step: '01', title: 'Creative Hook Analysis', desc: 'Formulating compelling angles, customer pain points, and scroll-stopping visuals.' },
      { step: '02', title: 'CAPI & Data Infrastructure', desc: 'Establishing bulletproof server-side tracking to capture 100% of conversion events.' },
      { step: '03', title: 'Scientific Testing Phase', desc: 'Deploying controlled dynamic creative tests to identify winning hook combinations.' },
      { step: '04', title: 'Budget Scaling', desc: 'Aggressively scaling winning creatives while sustaining target ROAS thresholds.' }
    ],
    faqs: [
      { question: 'Who produces the video and image ad creatives?', answer: 'Our in-house design and copywriting team produces high-converting motion graphics, statics, and script concepts tailored to your brand.' }
    ]
  },
  {
    id: 'srv-social-media',
    slug: 'social-media-marketing',
    title: 'Social Media Management',
    category: 'Digital Marketing',
    tagline: 'Organic social authority, community building, and executive thought leadership.',
    description: 'Elevate your brand presence across LinkedIn, X (Twitter), Instagram, and YouTube. We curate strategic editorial calendars, craft thought-leadership narratives, and nurture engaged communities that advocate for your solutions.',
    iconName: 'Sparkles',
    startingPrice: '$950 / mo',
    features: [
      'Strategic Monthly Content Calendar & Narrative Strategy',
      'Executive Ghostwriting & LinkedIn Thought Leadership',
      'Custom Graphic Assets, Carousels & Motion Snippets',
      'Active Community Management & Direct Engagement',
      'Cross-Platform Performance & Sentiment Analytics'
    ],
    benefits: [
      'Establish authoritative industry leadership and trust',
      'Direct warm inquiries from B2B executives and partners',
      'Organic brand defense and enhanced customer loyalty'
    ],
    process: [
      { step: '01', title: 'Brand Voice Definition', desc: 'Establishing key narrative pillars, tonal guidelines, and executive profiles.' },
      { step: '02', title: 'Content Production Sprint', desc: 'Drafting batches of high-value industry breakdowns, case studies, and carousels.' },
      { step: '03', title: 'Distribution & Engagement', desc: 'Daily posting schedules and active engagement with key industry commentators.' },
      { step: '04', title: 'Analytics Review', desc: 'Monthly performance retrospectives measuring reach, clicks, and inbound leads.' }
    ],
    faqs: [
      { question: 'Which platforms do you specialize in?', answer: 'We specialize primarily in LinkedIn, X (Twitter), Instagram, and YouTube for B2B tech, professional services, and high-growth brands.' }
    ]
  },
  {
    id: 'srv-web-dev',
    slug: 'website-development',
    title: 'Modern Website & Web App Development',
    category: 'Engineering',
    tagline: 'Ultra-fast, conversion-focused websites engineered with modern React, Next.js & TypeScript.',
    description: 'We build high-performance web experiences designed to turn visitors into pipeline. Leveraging modern JAMstack architectures, fluid motion design, seamless headless CMS backends, and perfect 100/100 Core Web Vitals scores.',
    iconName: 'Code2',
    startingPrice: '$2,800',
    popular: true,
    features: [
      'Bespoke Next.js & React Full-Stack Architecture',
      'Sub-Second Page Load Speeds & Core Web Vitals Optimization',
      'Interactive Micro-Animations with Framer Motion & GSAP',
      'Integrated Headless CMS with Real-Time Previews',
      'Fully Responsive Precision Mobile & Desktop Layouts'
    ],
    benefits: [
      'Average 42% uplift in conversion rate from legacy site migrations',
      'Zero maintenance headaches with scalable cloud infrastructure',
      'Empowered marketing team with effortless zero-code content updates'
    ],
    process: [
      { step: '01', title: 'UX & Information Architecture', desc: 'Wireframing user journeys, conversion paths, and messaging hierarchies.' },
      { step: '02', title: 'Visual Design & Motion Prototyping', desc: 'Crafting pixel-perfect Figma designs with responsive states and kinetic interactions.' },
      { step: '03', title: 'Full-Stack Engineering', desc: 'Clean TypeScript implementation with headless CMS integration and SEO schema.' },
      { step: '04', title: 'Quality Assurance & Global Deployment', desc: 'Cross-browser testing, accessibility compliance, and CDN edge deployment.' }
    ],
    faqs: [
      { question: 'Can our internal team update content after launch?', answer: 'Yes! We configure a user-friendly headless CMS dashboard so your team can edit text, publish blogs, upload case studies, and update pricing without touching any code.' }
    ]
  },
  {
    id: 'srv-ecommerce',
    slug: 'ecommerce-development',
    title: 'E-Commerce Development',
    category: 'Engineering',
    tagline: 'High-converting online storefronts engineered on Shopify Plus, WooCommerce, and headless commerce.',
    description: 'Transform your digital storefront into an unstoppable sales machine. We engineer custom e-commerce experiences featuring seamless checkout flows, personalized product recommendation engines, custom ERP integrations, and subscription billing.',
    iconName: 'ShoppingBag',
    startingPrice: '$3,500',
    features: [
      'Custom Shopify Plus & Headless Commerce Storefronts',
      'Frictionless One-Click Checkout & Mobile Optimization',
      'ERP, Inventory & Multi-Carrier Shipping Integrations',
      'Automated Abandoned Cart Recovery & Retention Flows',
      'High-Speed CDN Asset Delivery for Global Shoppers'
    ],
    benefits: [
      'Higher Average Order Value (AOV) via strategic upsells',
      'Drastically reduced cart abandonment rates',
      'Rock-solid stability during Black Friday / Cyber Monday traffic surges'
    ],
    process: [
      { step: '01', title: 'Merchandising Strategy', desc: 'Catalog modeling, SKU variations, pricing rules, and checkout flow analysis.' },
      { step: '02', title: 'Storefront UI/UX', desc: 'Designing high-converting product detail pages and quick-view shopping baskets.' },
      { step: '03', title: 'Payment & API Integration', desc: 'Connecting Stripe, PayPal, Klarna, fulfillment APIs, and CRM tools.' },
      { step: '04', title: 'Launch & Stress Testing', desc: 'Simulated load testing, order flow audits, and automated sales notifications.' }
    ],
    faqs: [
      { question: 'Can you migrate our products from another platform?', answer: 'Yes, we handle complete data migration of products, customer history, order records, and SEO URL redirects seamlessly.' }
    ]
  },
  {
    id: 'srv-brand-strategy',
    slug: 'brand-strategy',
    title: 'Brand Strategy & Identity',
    category: 'Engineering',
    tagline: 'Distinctive visual identities, tone of voice, and market positioning systems.',
    description: 'We craft iconic brand systems that command attention and justify premium pricing. From distinctive logo marks and comprehensive typography systems to brand voice guides and pitch decks.',
    iconName: 'Compass',
    startingPrice: '$1,800',
    features: [
      'Comprehensive Brand Strategy & Positioning Playbook',
      'Distinctive Logo Marks, Iconography & Asset Libraries',
      'Mathematical Typography & Color Token Systems',
      'Brand Voice, Editorial Guidelines & Value Propositions',
      'Print & Digital Collateral (Decks, Stationery, Social Assets)'
    ],
    benefits: [
      'Stand out decisively from commoditized competitors',
      'Command enterprise-level pricing power with elevated credibility',
      'Maintain visual consistency across every customer touchpoint'
    ],
    process: [
      { step: '01', title: 'Market Positioning Discovery', desc: 'Interviews, competitive whitespace mapping, and value proposition crystallization.' },
      { step: '02', title: 'Visual Explorations', desc: 'Developing mood boards, typographic pairings, and bespoke logo concepts.' },
      { step: '03', title: 'Design System Delivery', desc: 'Finalizing full identity tokens, brand guidelines, and vector design assets.' },
      { step: '04', title: 'Rollout Guidance', desc: 'Overseeing the transition across web, collateral, and marketing channels.' }
    ],
    faqs: [
      { question: 'What deliverables are included in a brand identity project?', answer: 'You receive vector logo packages (SVG, PNG, EPS), complete brand style guide PDF, color palettes, typography specifications, and social media template kits.' }
    ]
  },
  {
    id: 'srv-it-support',
    slug: 'it-support',
    title: 'Managed IT Support & Remote Helpdesk',
    category: 'IT Support',
    tagline: 'Proactive 24/7 IT operations, remote troubleshooting, and workstation reliability.',
    description: 'Reliable managed IT services for businesses that cannot afford downtime. We provide instant remote computer repair guidance, operating system troubleshooting, malware removal, email migrations, and employee onboarding hardware configurations.',
    iconName: 'ShieldCheck',
    startingPrice: '$750 / mo',
    popular: true,
    features: [
      '24/7 Rapid Response Remote Helpdesk & Ticketing',
      'Computer & Workstation Diagnostics (Windows & macOS)',
      'Enterprise Endpoint Antivirus & Security Monitoring',
      'Automated Cloud Data Backups & Disaster Recovery',
      'New Hire IT Onboarding & Device Provisioning'
    ],
    benefits: [
      'Zero employee downtime with 15-minute average ticket response times',
      'Predictable flat monthly IT costs with no surprise service bills',
      'Peace of mind knowing company workstations are audited and secure'
    ],
    process: [
      { step: '01', title: 'Infrastructure Inventory', desc: 'Auditing all team hardware, operating systems, security patches, and licenses.' },
      { step: '02', title: 'Monitoring Deployment', desc: 'Installing lightweight monitoring agents and automated secure backup routines.' },
      { step: '03', title: 'Helpdesk Portal Access', desc: 'Equipping your team with one-click support ticket logging and direct engineer chat.' },
      { step: '04', title: 'Proactive Health Audits', desc: 'Monthly system health checkups, storage cleanup, and security upgrades.' }
    ],
    faqs: [
      { question: 'How quickly do engineers respond to urgent support tickets?', answer: 'Critical priority tickets receive an immediate engineer response within 15 minutes, 24 hours a day, 7 days a week.' }
    ]
  },
  {
    id: 'srv-network-support',
    slug: 'network-support',
    title: 'Network Support & Cloud Security',
    category: 'IT Support',
    tagline: 'High-speed business WiFi, firewall configurations, VPNs, and cloud architecture.',
    description: 'We engineer high-availability business networks, secure VPN tunnels, cloud virtual networks (AWS, GCP, Azure), and resilient firewall defenses to protect your corporate communications from breaches and latency spikes.',
    iconName: 'Network',
    startingPrice: '$1,100 / mo',
    features: [
      'Enterprise Router & Managed Switch Configuration',
      'Site-to-Site & Remote Worker Secure VPN Tunnels',
      'Next-Gen Firewall Setup & Intrusion Prevention (IPS)',
      'VLAN Segmentation for IoT, Guest & Production Traffic',
      'Bandwidth Quality of Service (QoS) for VoIP & Video'
    ],
    benefits: [
      'Bulletproof network stability for crystal-clear client video meetings',
      'Strict isolation protecting sensitive accounting and customer databases',
      'Seamless remote employee access to internal company servers'
    ],
    process: [
      { step: '01', title: 'Topology Assessment', desc: 'Mapping network traffic bottlenecks, signal dead zones, and firewall rules.' },
      { step: '02', title: 'Hardware Optimization', desc: 'Upgrading enterprise gateways, access points, and structured cabling.' },
      { step: '03', title: 'Security Hardening', desc: 'Enforcing zero-trust network policies and multi-factor authentication (MFA).' },
      { step: '04', title: 'Continuous Telemetry', desc: '24/7 uptime monitoring with automated failover circuit triggers.' }
    ],
    faqs: [
      { question: 'Can you assist with remote team VPNs?', answer: 'Yes! We configure encrypted WireGuard and OpenVPN protocols ensuring remote team members access company resources with top-tier security.' }
    ]
  },
  {
    id: 'srv-tech-consulting',
    slug: 'technical-consulting',
    title: 'Business IT & CTO Consulting',
    category: 'IT Support',
    tagline: 'Strategic fractional CTO advisory, software stack audits, and digital transformation.',
    description: 'Gain executive-level technology guidance without the full-time C-suite overhead. We help business owners make informed decisions on SaaS tooling, cloud migrations, compliance, vendor negotiations, and automation pipelines.',
    iconName: 'Cpu',
    startingPrice: '$2,000 / mo',
    features: [
      'Fractional CTO & Executive Technology Advisory',
      'Enterprise Software Stack Audits & Cost Rationalization',
      'Cloud Migration Roadmaps (On-Premises to AWS/Google Cloud)',
      'Security Compliance Guidance (SOC2, HIPAA, GDPR)',
      'Custom Workflow Automation (Zapier, Make, Custom Webhooks)'
    ],
    benefits: [
      'Save tens of thousands on redundant or misconfigured SaaS tools',
      'Accelerate strategic digital transformation without costly technical missteps',
      'Direct access to senior tech leadership with over a decade of hands-on experience'
    ],
    process: [
      { step: '01', title: 'Executive Discovery', desc: 'Reviewing current business goals, tech expenditure, and operational pain points.' },
      { step: '02', title: 'Architecture Blueprint', desc: 'Delivering a concrete technology roadmap with clear ROI projections.' },
      { step: '03', title: 'Vendor & Stack Execution', desc: 'Vetting software vendors, leading contract negotiations, and overseeing integrations.' },
      { step: '04', title: 'Quarterly Strategic Reviews', desc: 'Ongoing alignment with growth targets and emerging technology developments.' }
    ],
    faqs: [
      { question: 'Is fractional CTO consulting suitable for small businesses?', answer: 'Absolutely. It provides early-stage and growing companies with high-level technical acumen during critical growth phases at a fraction of full-time hiring cost.' }
    ]
  }
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: 'pkg-starter',
    name: 'Starter',
    badge: 'Ideal for Small Businesses',
    monthlyPrice: 799,
    yearlyPrice: 649,
    description: 'Essential digital marketing and foundational IT support to build your local authority and drive steady customer inquiries.',
    popular: false,
    ctaText: 'Get Started',
    features: [
      'Comprehensive Local & On-Page SEO Management',
      'Google Ads Campaign Setup & Bid Optimization',
      '1 Custom High-Converting Landing Page',
      'Monthly Strategic Performance Report',
      'Business Hours IT Remote Helpdesk (Up to 5 Tickets)',
      'Website Speed & Security Monitoring',
      'Dedicated Account Manager'
    ],
    notIncluded: [
      'Meta Ads & Custom Video Creative Testing',
      '24/7 Emergency Priority IT Response',
      'Fractional CTO Strategic Consulting',
      'Custom Full-Stack Web App Development'
    ]
  },
  {
    id: 'pkg-growth',
    name: 'Growth',
    badge: 'Most Popular Choice',
    monthlyPrice: 1899,
    yearlyPrice: 1499,
    description: 'The complete scaling system for accelerating businesses demanding aggressive customer acquisition and robust tech infrastructure.',
    popular: true,
    ctaText: 'Accelerate Growth',
    features: [
      'Full-Funnel SEO & Tier-1 Authority Backlink Outreach',
      'Google Ads + Meta Ads Multi-Channel Funnels',
      'Conversion Rate Optimization (CRO) A/B Testing',
      'Bi-Weekly Creative Refreshes (Graphics & Video Hooks)',
      'Unlimited Managed IT Remote Support Tickets',
      'Automated Daily Cloud Backups & Endpoint Antivirus',
      'Bi-Weekly Strategy Calls with Growth Lead',
      'Real-Time HubSpot & CRM Pipeline Synchronization'
    ],
    notIncluded: [
      'Dedicated On-Demand Full-Stack Engineering Pod',
      'Fractional CTO Strategic Board Advisory'
    ]
  },
  {
    id: 'pkg-enterprise',
    name: 'Enterprise',
    badge: 'Custom Architecture',
    monthlyPrice: 4499,
    yearlyPrice: 3599,
    description: 'Bespoke end-to-end digital dominance. Tailored for established organizations requiring custom engineering, high-volume ad spend, and dedicated IT teams.',
    popular: false,
    ctaText: 'Request Custom Proposal',
    features: [
      'Enterprise Omnichannel Marketing (Search, Social, Video, PR)',
      'Full Custom Web / App Engineering (Next.js, TypeScript)',
      'Dedicated 24/7 SLA (15-Min Response Guarantee)',
      'Fractional CTO Advisory & Board Level Reporting',
      'Multi-Location Network & Firewall Administration',
      'Custom Machine Learning & Automated Workflow Pipelines',
      'Dedicated Account Director & Senior DevOps Lead',
      'Executive Quarterly Business Reviews (QBR)'
    ],
    notIncluded: []
  }
];

export const initialProjects: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Apex Financial Technologies',
    client: 'Apex FinTech Global',
    category: 'Website Development',
    year: '2024',
    description: 'Engineered a next-generation institutional fintech platform with high-security client portal, dynamic stock ticker data feeds, and sub-second page transition speeds.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Fintech', 'SOC2 Compliant'],
    results: ['+310% Organic Inbound Traffic', '0.4s Global LCP Page Speed', '99.99% Uptime During Market Volatility'],
    featured: true
  },
  {
    id: 'proj-2',
    title: 'OmniVerve Luxury Apparel',
    client: 'OmniVerve Fashion London',
    category: 'Marketing',
    year: '2024',
    description: 'Architected a multi-channel Meta & Google Ads performance engine with dynamic product catalog ads and first-party CAPI attribution tracking.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    tags: ['Meta Ads', 'Google Ads', 'Shopify Plus', 'ROAS Scaling'],
    results: ['4.82x Blended ROAS', '$2.4M Direct Attributed Revenue', '-34% Cost Per Acquisition (CAC)'],
    featured: true
  },
  {
    id: 'proj-3',
    title: 'BioGenix Health Cloud Network',
    client: 'BioGenix Diagnostics',
    category: 'Tech Support',
    year: '2023',
    description: 'Designed and deployed an encrypted HIPAA-compliant remote clinic network connecting 18 medical centers with zero packet drop and automated daily off-site snapshots.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    tags: ['HIPAA Compliance', 'Site-to-Site VPN', '24/7 IT Helpdesk', 'Network Security'],
    results: ['100% HIPAA Compliance Audit Passed', '11-Minute Average Incident Resolution', '0 Security Incidents Recorded'],
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Luminary AI Brand Ecosystem',
    client: 'Luminary Robotics & AI',
    category: 'Branding',
    year: '2024',
    description: 'Crafted a bold visual identity system, mathematical typography tokens, 3D interactive icon kit, and enterprise marketing deck that secured their $14M Series A round.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tags: ['Brand Strategy', 'Visual Identity', 'Typography', 'Investor Deck'],
    results: ['$14M Series A Capital Raised', 'Featured in TechCrunch & Forbes', '100% Brand Consistency Score']
  },
  {
    id: 'proj-5',
    title: 'TerraVibe Sustainable Goods',
    client: 'TerraVibe Living',
    category: 'Website Development',
    year: '2023',
    description: 'Complete e-commerce transformation on headless Shopify with instant search filtering, subscription replenishment boxes, and custom checkout flows.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop&q=80',
    tags: ['E-Commerce', 'Shopify', 'CRO', 'UX Design'],
    results: ['+64% Mobile Conversion Rate', '+28% Average Order Value (AOV)', '2.1x Recurring Subscription Growth']
  },
  {
    id: 'proj-6',
    title: 'Precision Legal Partners',
    client: 'Precision Law LLP',
    category: 'Marketing',
    year: '2024',
    description: 'High-intent search engine optimization and hyper-targeted Google Local Service Ads that positioned the firm as the #1 legal authority for corporate litigation.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    tags: ['Local SEO', 'Google PPC', 'Legal Tech', 'Lead Generation'],
    results: ['41 High-Value Retainers Generated', '#1 Ranking for 18 High-Intent Terms', '520% ROI in 12 Months']
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'scaling-b2b-pipeline-google-meta-ads-2026',
    title: 'How Modern Enterprises Scale B2B Pipelines with Unified Google & Meta Ads Funnels',
    category: 'Digital Marketing',
    tags: ['Google Ads', 'Meta Ads', 'PPC', 'B2B Growth'],
    excerpt: 'Discover the exact multi-touch attribution model we use to capture intent on Google Search and re-engage high-value decision-makers across Meta feeds with 4x+ ROAS.',
    content: `## The Modern B2B Buying Journey Has Changed

Relying purely on cold outreach or single-channel search ads is no longer viable in high-stakes enterprise sales. Today's commercial decision-makers interact with an average of 14 distinct digital touchpoints before submitting an inquiry.

### 1. High-Intent Search as the Acquisition Anchor
We begin by capturing active buyers at the exact moment they search for specific pain-point solutions. By pairing long-tail commercial intent keywords with server-side conversion validation, we eliminate tire-kicker traffic.

### 2. Conversions API (CAPI) and Full-Funnel Retargeting
With browser cookie deprecation, client-side tracking pixels miss up to 35% of high-value conversion signals. Implementing first-party server-to-server CAPI ensures your bidding algorithms receive 100% accurate data to scale.

### 3. Creative Hooks That Speak to C-Suite Pain
High-performing B2B Meta creatives don't look like generic corporate stock graphics. They present concrete data visualizers, ROI breakdown calculators, and authentic executive case study breakdowns that stop the scroll.`,
    author: {
      name: 'Abhishek Singh',
      role: 'Founder & CEO, RSGeeker Media',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: 'March 15, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'post-2',
    slug: 'core-web-vitals-nextjs-conversion-rate',
    title: 'Why Sub-Second Page Speeds in Next.js Directly Drive 40%+ Conversion Lift',
    category: 'Engineering',
    tags: ['Next.js', 'Core Web Vitals', 'Web Performance', 'Conversion Rate'],
    excerpt: 'A deep dive into how modern server components, edge caching, and zero layout shift transform slow enterprise websites into conversion machines.',
    content: `## Speed Is Not a Vanity Metric — It Is Revenue

Every 100 milliseconds of latency costs modern digital platforms upwards of 1% in lost transactions. When enterprise visitors encounter layout shifts or slow response times, bounce rates skyrocket.

### The Problem With Monolithic Legacy CMSs
Traditional legacy CMS platforms drag dozens of unoptimized scripts, bloated stylesheets, and database queries into the client runtime. 

### Why Next.js and Modern Edge Architecture Win
By compiling dynamic components at the CDN edge and leveraging React Server Components (RSC), we reduce the initial JavaScript payload to near zero. 

- **Largest Contentful Paint (LCP):** Under 0.8 seconds globally.
- **Cumulative Layout Shift (CLS):** Absolute zero.
- **Interaction to Next Paint (INP):** Sub-50ms instant feedback.`,
    author: {
      name: 'Abhishek Singh',
      role: 'Founder & CEO, RSGeeker Media',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: 'February 28, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
    featured: true
  },
  {
    id: 'post-3',
    slug: 'enterprise-it-remote-support-best-practices',
    title: 'The Modern Business IT Playbook: Eliminating Remote Work Downtime in 2026',
    category: 'IT & Security',
    tags: ['IT Support', 'Cybersecurity', 'Remote Work', 'Business Continuity'],
    excerpt: 'How leading organizations implement zero-trust network protocols, automated cloud backups, and proactive helpdesks to protect distributed teams.',
    content: `## Distributed Teams Demand Proactive Infrastructure

The shift to hybrid work created major attack surfaces for businesses. Unsecured home WiFi routers, phishing vulnerabilities, and unpatched laptops can bring an entire company to a halt.

### Three Non-Negotiable IT Pillars
1. **Zero-Trust Network Access (ZTNA):** Replace vulnerable legacy VPNs with identity-aware tunneling.
2. **Automated Immutable Cloud Backups:** Ensure ransomware cannot overwrite historical recovery points.
3. **15-Minute Helpdesk SLAs:** Empower employees with instant engineer access so technical glitches never delay client deliverables.`,
    author: {
      name: 'David Lee',
      role: 'Head of IT Infrastructure',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    publishedAt: 'January 18, 2026',
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Marcus Sterling',
    role: 'Chief Commercial Officer',
    company: 'Apex FinTech Global',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'RSGeeker Media redesigned our web platform and took over our search strategy. In 6 months, organic inbound pipeline jumped 310% and client onboarding friction dropped to zero. Abhishek and his team operate with true engineering precision.',
    resultsAchieved: '+310% Inbound Pipeline Growth'
  },
  {
    id: 'test-2',
    name: 'Helena Vance',
    role: 'VP of E-Commerce',
    company: 'OmniVerve Luxury',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Our ad accounts were struggling with post-cookie iOS tracking. RSGeeker Media deployed first-party CAPI and restructured our creative angles. We reached 4.8x ROAS within 90 days and reduced our CAC by 34%.',
    resultsAchieved: '4.8x Return on Ad Spend (ROAS)'
  },
  {
    id: 'test-3',
    name: 'Dr. Robert Chen',
    role: 'Managing Director',
    company: 'BioGenix Diagnostics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Their IT support is an indispensable asset for our 18 clinics. Whenever our staff has a network or hardware issue, RSGeeker Media resolves it within minutes. We passed our enterprise HIPAA security audit with flying colors.',
    resultsAchieved: '100% HIPAA Compliance & 0 Downtime'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What makes RSGeeker Media different from standard marketing agencies?',
    answer: 'Most marketing agencies only understand ads, while traditional IT firms only understand servers. Founded by Abhishek Singh, RSGeeker Media bridges both disciplines. We unite high-intent customer acquisition funnels with ultra-fast web engineering and bulletproof IT infrastructure so your digital ecosystem scales smoothly without technical bottlenecks.'
  },
  {
    id: 'faq-2',
    category: 'Services',
    question: 'Can we hire RSGeeker Media for a single service or do we need a full package?',
    answer: 'You can engage us for specialized individual scopes—such as standalone Technical SEO, a Next.js web development overhaul, or managed IT helpdesk support—or partner with us on an integrated monthly Growth retainer that covers your full digital stack.'
  },
  {
    id: 'faq-3',
    category: 'Pricing',
    question: 'Are your pricing packages rigid or can they be tailored?',
    answer: 'While our Starter, Growth, and Enterprise packages offer transparent baselines, we routinely customize scopes for enterprises with specific compliance needs, high ad budgets, or multi-location IT requirements.'
  },
  {
    id: 'faq-4',
    category: 'Tech Support',
    question: 'How does your remote IT tech support work for distributed teams?',
    answer: 'We provide an enterprise ticket portal and lightweight remote access tools. When an employee logs a ticket or calls our emergency line, our certified engineers initiate a secure remote session, diagnose the issue, and provide resolution within our 15-minute response SLA.'
  },
  {
    id: 'faq-5',
    category: 'General',
    question: 'Where is RSGeeker Media based and do you serve international clients?',
    answer: 'We are headquartered in San Francisco, California, and support client operations across North America, the United Kingdom, Europe, and the Asia-Pacific region.'
  }
];

export const initialSEOSettings: SEOSettings = {
  metaTitle: 'RSGeeker Media – Enterprise Digital Marketing, Web Development & IT Tech Support',
  metaDescription: 'Accelerate enterprise business growth with data-driven SEO, Google & Meta Ads, modern Next.js web development, and 24/7 managed IT support. Founded by Abhishek Singh.',
  keywords: 'digital marketing agency, enterprise SEO, Google Ads management, Meta Ads agency, Next.js web development, e-commerce development, business IT support, computer troubleshooting, remote tech support, Abhishek Singh',
  canonicalUrl: 'https://rsgeekermedia.com',
  ogTitle: 'RSGeeker Media – Digital Marketing & IT Solutions Platform',
  ogDescription: 'Accelerate business growth with data-driven marketing, bespoke web platforms, and 24/7 technical support.',
  ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://rsgeekermedia.com/sitemap.xml`,
  sitemapXml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rsgeekermedia.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/about</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/services</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/pricing</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/tech-support</loc><priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/portfolio</loc><priority>0.8</priority><changefreq>weekly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/blog</loc><priority>0.8</priority><changefreq>daily</changefreq></url>
  <url><loc>https://rsgeekermedia.com/contact</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/book-consultation</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/privacy-policy</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
  <url><loc>https://rsgeekermedia.com/terms</loc><priority>0.3</priority><changefreq>yearly</changefreq></url>
</urlset>`
};

export const initialLeads: Lead[] = [
  {
    id: 'lead-101',
    name: 'Jonathan Miller',
    email: 'j.miller@vortexlogistics.io',
    phone: '+1 (415) 882-9901',
    company: 'Vortex Logistics Group',
    serviceInterested: 'Website Development',
    budget: '$10,000 - $25,000',
    message: 'We need to migrate our legacy logistics tracking portal into a high-speed Next.js app with customer dashboard and automated freight quotes.',
    source: 'Website Form',
    status: 'Qualified',
    createdAt: '2026-09-20 14:32',
    assignedTo: 'Sarah Jenkins',
    followUpDate: '2026-09-23',
    notes: [
      { id: 'n1', author: 'Sarah Jenkins', text: 'Had initial discovery call. High budget, looking to kick off within 3 weeks.', timestamp: '2026-09-21 10:15' }
    ]
  },
  {
    id: 'lead-102',
    name: 'Cassandra Wong',
    email: 'cwong@solarglowbeverage.com',
    phone: '+1 (310) 745-1234',
    company: 'SolarGlow Beverages',
    serviceInterested: 'Google Ads',
    budget: '$5,000 - $10,000 / mo',
    message: 'Launching our direct-to-consumer beverage line nationwide. Need an aggressive Google Ads & Performance Max campaign targeting health-conscious shoppers.',
    source: 'Book Consultation',
    status: 'Proposal Sent',
    createdAt: '2026-09-19 11:20',
    assignedTo: 'Abhishek Singh',
    followUpDate: '2026-09-24',
    notes: [
      { id: 'n2', author: 'Abhishek Singh', text: 'Sent formal Growth tier proposal with 90-day ROAS target of 4.2x.', timestamp: '2026-09-20 16:45' }
    ]
  },
  {
    id: 'lead-103',
    name: 'Marcus Brody',
    email: 'brody@brodyandcolegal.com',
    phone: '+1 (212) 650-8877',
    company: 'Brody & Co. Legal LLP',
    serviceInterested: 'Search Engine Optimization (SEO)',
    budget: '$2,500 - $5,000 / mo',
    message: 'Seeking top organic ranking in Manhattan for commercial arbitration and corporate mergers.',
    source: 'Services Page',
    status: 'Contacted',
    createdAt: '2026-09-21 09:12',
    assignedTo: 'Sarah Jenkins',
    followUpDate: '2026-09-23',
    notes: []
  },
  {
    id: 'lead-104',
    name: 'Emily Thornton',
    email: 'emily@thorntondentalcare.org',
    phone: '+1 (512) 340-9922',
    company: 'Thornton Dental Centers',
    serviceInterested: 'Managed IT Support & Remote Helpdesk',
    budget: '$1,500 - $3,000 / mo',
    message: 'Need 24/7 IT helpdesk for 4 clinic locations, secure cloud patient backups, and email security hardening.',
    source: 'Tech Support',
    status: 'New Lead',
    createdAt: '2026-09-22 06:14',
    assignedTo: 'David Lee',
    notes: []
  },
  {
    id: 'lead-105',
    name: 'Alexander Cruz',
    email: 'alex@cruzaerospace.tech',
    phone: '+1 (206) 911-4455',
    company: 'Cruz Aerospace Technologies',
    serviceInterested: 'Brand Strategy & Identity',
    budget: '$25,000+',
    message: 'Complete corporate brand re-architecture ahead of public government contractor procurement bidding.',
    source: 'Website Form',
    status: 'Won',
    createdAt: '2026-09-14 16:00',
    assignedTo: 'Abhishek Singh',
    notes: [
      { id: 'n3', author: 'Abhishek Singh', text: 'Contract executed. Onboarding initiated in Customer Mini-CRM.', timestamp: '2026-09-17 11:00' }
    ]
  }
];

export const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Marcus Sterling',
    company: 'Apex FinTech Global',
    phone: '+1 (415) 300-8800',
    email: 'msterling@apexfintech.com',
    status: 'Enterprise Retainer',
    joinedDate: '2024-01-15',
    supportRequestsCount: 14,
    meetingHistory: ['Q3 Strategy Review (2026-08-12)', 'Quarterly Business Review (2026-06-04)'],
    notes: ['Key client on full Growth marketing + high availability web retainer. CEO is very responsive on Slack.'],
    projects: [
      { id: 'cp1', title: 'Institutional Trading Portal v2', status: 'Completed', value: '$38,000', deliveryDate: '2024-06-30' },
      { id: 'cp2', title: 'Global Omnichannel SEO Retainer', status: 'In Progress', value: '$3,500/mo', deliveryDate: 'Ongoing' }
    ],
    invoices: [
      { id: 'inv-101', invoiceNumber: 'RSG-2026-091', amount: '$3,500', date: '2026-09-01', status: 'Paid' },
      { id: 'inv-102', invoiceNumber: 'RSG-2026-081', amount: '$3,500', date: '2026-08-01', status: 'Paid' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Helena Vance',
    company: 'OmniVerve Luxury Fashion',
    phone: '+44 20 7946 0912',
    email: 'hvance@omniverve.co.uk',
    status: 'Active Client',
    joinedDate: '2024-05-10',
    supportRequestsCount: 8,
    meetingHistory: ['Black Friday Creative Planning (2026-09-15)'],
    notes: ['Scales ad budget to $100k/mo in Q4. Direct access to creative team.'],
    projects: [
      { id: 'cp3', title: 'Meta & Google Ads Performance Scaling', status: 'In Progress', value: '$4,200/mo', deliveryDate: 'Ongoing' }
    ],
    invoices: [
      { id: 'inv-201', invoiceNumber: 'RSG-2026-094', amount: '$4,200', date: '2026-09-01', status: 'Paid' }
    ]
  },
  {
    id: 'cust-3',
    name: 'Dr. Robert Chen',
    company: 'BioGenix Diagnostics',
    phone: '+1 (650) 412-7711',
    email: 'rchen@biogenixdx.org',
    status: 'Enterprise Retainer',
    joinedDate: '2023-11-20',
    supportRequestsCount: 32,
    meetingHistory: ['Annual HIPAA Security Recertification (2026-07-22)'],
    notes: ['18 medical clinic endpoints on 24/7 SLA. David Lee is primary engineer.'],
    projects: [
      { id: 'cp4', title: '24/7 Managed IT Network & Helpdesk', status: 'In Progress', value: '$2,800/mo', deliveryDate: 'Ongoing' }
    ],
    invoices: [
      { id: 'inv-301', invoiceNumber: 'RSG-2026-092', amount: '$2,800', date: '2026-09-01', status: 'Paid' }
    ]
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TICK-1042',
    clientName: 'Dr. Robert Chen',
    clientEmail: 'rchen@biogenixdx.org',
    clientPhone: '+1 (650) 412-7711',
    company: 'BioGenix Diagnostics',
    category: 'Network Troubleshooting',
    subject: 'Intermittent VPN packet latency between Palo Alto and San Jose clinic',
    description: 'Our radiologists reported a 400ms delay when loading high-resolution DICOM MRI scans through the secure WireGuard tunnel.',
    priority: 'High',
    status: 'In Progress',
    assignedEngineer: 'David Lee',
    createdAt: '2026-09-22 04:10',
    updatedAt: '2026-09-22 05:45',
    messages: [
      {
        id: 'tm-1',
        sender: 'client',
        senderName: 'Dr. Robert Chen',
        message: 'Hello RSGeeker team, seeing noticeable lag on the San Jose WireGuard node since 3:30 AM.',
        timestamp: '2026-09-22 04:10'
      },
      {
        id: 'tm-2',
        sender: 'staff',
        senderName: 'David Lee (Support Manager)',
        message: 'Investigating right now. Checking upstream ISP transit route on the Silicon Valley gateway. We have routed traffic through our secondary redundant fiber circuit.',
        timestamp: '2026-09-22 04:22'
      }
    ]
  },
  {
    id: 'TICK-1043',
    clientName: 'Marcus Brody',
    clientEmail: 'brody@brodyandcolegal.com',
    clientPhone: '+1 (212) 650-8877',
    company: 'Brody & Co. Legal LLP',
    category: 'Email Configuration',
    subject: 'DKIM and SPF verification failing on new partner email domain',
    description: 'Added 3 new partner mailboxes on Microsoft 365, but outbound emails to clients are landing in junk due to missing DNS TXT records.',
    priority: 'Medium',
    status: 'Open',
    assignedEngineer: 'David Lee',
    createdAt: '2026-09-22 05:30',
    updatedAt: '2026-09-22 05:30',
    messages: [
      {
        id: 'tm-3',
        sender: 'client',
        senderName: 'Marcus Brody',
        message: 'Urgent assistance needed with our domain DNS records on Cloudflare.',
        timestamp: '2026-09-22 05:30'
      }
    ]
  },
  {
    id: 'TICK-1039',
    clientName: 'Helena Vance',
    clientEmail: 'hvance@omniverve.co.uk',
    clientPhone: '+44 20 7946 0912',
    company: 'OmniVerve Luxury',
    category: 'Website Issues',
    subject: 'Currency selector dropdown missing on European checkout mirror',
    description: 'French and German shoppers reporting currency defaulted to USD instead of EUR on mobile devices.',
    priority: 'Critical',
    status: 'Resolved',
    assignedEngineer: 'Abhishek Singh',
    createdAt: '2026-09-21 13:00',
    updatedAt: '2026-09-21 14:15',
    messages: [
      {
        id: 'tm-4',
        sender: 'client',
        senderName: 'Helena Vance',
        message: 'Currency switcher seems stuck on USD for mobile users in Paris.',
        timestamp: '2026-09-21 13:00'
      },
      {
        id: 'tm-5',
        sender: 'staff',
        senderName: 'Abhishek Singh',
        message: 'Resolved! Geolocation header cache rule in Cloudflare was caching the US edge variant. Purged edge cache and deployed IP country detection fix.',
        timestamp: '2026-09-21 14:15'
      }
    ]
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-1',
    clientName: 'Jonathan Miller',
    clientEmail: 'j.miller@vortexlogistics.io',
    clientPhone: '+1 (415) 882-9901',
    company: 'Vortex Logistics Group',
    service: 'Website Development Strategy',
    date: '2026-09-23',
    timeSlot: '10:00 AM PST',
    platform: 'Google Meet',
    status: 'Approved',
    notes: 'Focus on enterprise portal architecture and timeline.',
    createdAt: '2026-09-20 14:35'
  },
  {
    id: 'apt-2',
    clientName: 'Cassandra Wong',
    clientEmail: 'cwong@solarglowbeverage.com',
    clientPhone: '+1 (310) 745-1234',
    company: 'SolarGlow Beverages',
    service: 'Google & Meta Ads Growth Audit',
    date: '2026-09-24',
    timeSlot: '02:00 PM PST',
    platform: 'Microsoft Teams',
    status: 'Approved',
    notes: 'Review ad creative deck and Q4 budget allocation.',
    createdAt: '2026-09-19 11:25'
  },
  {
    id: 'apt-3',
    clientName: 'Emily Thornton',
    clientEmail: 'emily@thorntondentalcare.org',
    clientPhone: '+1 (512) 340-9922',
    company: 'Thornton Dental Centers',
    service: 'Managed IT Infrastructure Audit',
    date: '2026-09-25',
    timeSlot: '11:30 AM PST',
    platform: 'Google Meet',
    status: 'Scheduled',
    notes: 'Requested review of backup systems across 4 dental clinics.',
    createdAt: '2026-09-22 06:16'
  }
];

export const initialAnalyticsData: AnalyticsData = {
  visitors: {
    total: 124850,
    today: 1840,
    weekly: 12940,
    monthly: 48620,
    unique: 89400,
    pageViews: 312890,
    bounceRate: 34.8,
    avgSessionDuration: '3m 42s',
    conversionRate: 4.62,
    returningVisitorsPercent: 41.5
  },
  trafficDaily: [
    { date: 'Sep 16', visitors: 1580, pageViews: 4120, leads: 8 },
    { date: 'Sep 17', visitors: 1720, pageViews: 4490, leads: 11 },
    { date: 'Sep 18', visitors: 1890, pageViews: 4910, leads: 14 },
    { date: 'Sep 19', visitors: 1650, pageViews: 4200, leads: 9 },
    { date: 'Sep 20', visitors: 1980, pageViews: 5200, leads: 16 },
    { date: 'Sep 21', visitors: 2110, pageViews: 5640, leads: 18 },
    { date: 'Sep 22', visitors: 1840, pageViews: 4850, leads: 13 }
  ],
  trafficSources: [
    { name: 'Organic Search (Google)', value: 48, color: '#06b6d4' },
    { name: 'Social Media (Meta & LinkedIn)', value: 26, color: '#3b82f6' },
    { name: 'Direct Traffic', value: 16, color: '#10b981' },
    { name: 'Referral & Partner Sites', value: 10, color: '#8b5cf6' }
  ],
  deviceBreakdown: [
    { device: 'Desktop (macOS/Windows)', percentage: 62 },
    { device: 'Mobile (iOS/Android)', percentage: 33 },
    { device: 'Tablet & Others', percentage: 5 }
  ],
  browserBreakdown: [
    { browser: 'Google Chrome', percentage: 64 },
    { browser: 'Apple Safari', percentage: 22 },
    { browser: 'Mozilla Firefox', percentage: 8 },
    { browser: 'Microsoft Edge', percentage: 6 }
  ],
  geoBreakdown: [
    { country: 'United States', visitors: 58400, flag: '🇺🇸' },
    { country: 'United Kingdom', visitors: 18200, flag: '🇬🇧' },
    { country: 'Canada', visitors: 14600, flag: '🇨🇦' },
    { country: 'India', visitors: 12800, flag: '🇮🇳' },
    { country: 'Germany', visitors: 8900, flag: '🇩🇪' },
    { country: 'Australia', visitors: 7400, flag: '🇦🇺' }
  ],
  topPages: [
    { path: '/', views: 89400, uniqueVisitors: 54100, bounceRate: '31.2%' },
    { path: '/services', views: 42100, uniqueVisitors: 28900, bounceRate: '28.4%' },
    { path: '/services/seo', views: 24800, uniqueVisitors: 16200, bounceRate: '34.1%' },
    { path: '/pricing', views: 21600, uniqueVisitors: 17400, bounceRate: '24.8%' },
    { path: '/tech-support', views: 18900, uniqueVisitors: 12100, bounceRate: '26.2%' },
    { path: '/portfolio', views: 15400, uniqueVisitors: 11200, bounceRate: '32.6%' },
    { path: '/blog', views: 14200, uniqueVisitors: 9800, bounceRate: '41.5%' },
    { path: '/book-consultation', views: 11800, uniqueVisitors: 9400, bounceRate: '19.4%' }
  ]
};
