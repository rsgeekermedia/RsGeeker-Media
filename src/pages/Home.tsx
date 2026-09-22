import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Variants } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  Search, 
  Target, 
  Share2, 
  Code2, 
  Cpu, 
  ChevronRight,
  ExternalLink,
  Laptop,
  Calendar,
  Building2,
  Stethoscope,
  Briefcase,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditableElement } from '../components/inline-editor/EditableElement';

// Smooth animation variants with typed configurations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const Home: React.FC = () => {
  const { navigateTo, services, blogPosts, testimonials, websiteContent } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'marketing' | 'engineering' | 'it'>('all');

  const filteredServices = services.filter(s => {
    if (activeTab === 'all') return true;
    if (activeTab === 'marketing') return s.category === 'Digital Marketing';
    if (activeTab === 'engineering') return s.category === 'Engineering';
    if (activeTab === 'it') return s.category === 'IT Support';
    return true;
  });

  const industries = [
    { title: 'FinTech & Banking', icon: TrendingUp, desc: 'High-security client portals, SOC2 compliance, and institutional acquisition funnels.' },
    { title: 'Healthcare & Diagnostics', icon: Stethoscope, desc: 'HIPAA-compliant networks, clinic helpdesk support, and high-trust organic positioning.' },
    { title: 'E-Commerce & Retail', icon: Layers, desc: 'Shopify Plus headless storefronts, first-party CAPI tracking, and scaling to 4x+ ROAS.' },
    { title: 'B2B SaaS & Tech', icon: Code2, desc: 'Product-led content, Google Search intent capture, and Next.js performance speed.' },
    { title: 'Legal & Professional', icon: Briefcase, desc: 'High-margin client lead generation and partner email DNS hardening.' },
    { title: 'Modern Enterprises', icon: Building2, desc: 'Custom CTO consulting, cloud migrations, and distributed workforce IT.' }
  ];

  const metrics = [
    { value: websiteContent.statsClientsCount || '350+', label: websiteContent.statsClientsLabel || 'Projects Delivered', sub: 'Across 12 global sectors' },
    { value: websiteContent.statsAdSpend || '4.8x', label: websiteContent.statsAdSpendLabel || 'Average Client ROAS', sub: 'Verified across paid channels' },
    { value: websiteContent.statsRetention || '98.4%', label: websiteContent.statsRetentionLabel || 'Retention Rate', sub: 'Consistent long-term partners' },
    { value: websiteContent.statsUptime || '99.98%', label: websiteContent.statsUptimeLabel || 'IT Response SLA', sub: '24/7 emergency readiness' }
  ];

  return (
    <div className="pt-24 lg:pt-28 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-20 lg:pt-16 lg:pb-32">
        {/* Ambient lighting with gentle breathing animation */}
        <motion.div 
          animate={{ 
            scale: [1, 1.08, 1],
            opacity: [0.15, 0.22, 0.15]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10"
        />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
          >
            <EditableElement
              target={{
                id: 'heroTitle',
                label: 'Hero Headline',
                type: 'text',
                currentValue: websiteContent.heroTitle,
                options: { fieldPath: 'heroTitle' }
              }}
            >
              {websiteContent.heroTitle}
            </EditableElement>
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            <EditableElement
              target={{
                id: 'heroSubtitle',
                label: 'Hero Subtitle',
                type: 'textarea',
                currentValue: websiteContent.heroSubtitle,
                options: { fieldPath: 'heroSubtitle' }
              }}
            >
              <p>{websiteContent.heroSubtitle}</p>
            </EditableElement>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('book-consultation')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>{websiteContent.heroCtaText || 'Book Strategy Consultation'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('services')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Capabilities</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </motion.button>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Attribution Transparency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>24/7 Managed IT Incident SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Founded by Abhishek Singh</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SUCCESS METRICS COUNTERS */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {metrics.map((m, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="text-center p-4 rounded-xl transition-colors duration-200 hover:bg-slate-800/40"
            >
              <div className="font-display text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {m.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-white mt-2">
                {m.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {m.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* WHY CHOOSE RSGEEKER MEDIA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Agency & IT Architecture</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Why High-Growth Companies Choose RSGeeker Media
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Founded by Abhishek Singh, RSGeeker Media eliminated the friction between creative marketing agencies and traditional IT contractors.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              When marketing campaigns drive millions of visitors, weak hosting crashes. When IT teams lack marketing acumen, conversion rates suffer. We architect the entire stack harmoniously so your business scales with zero technical ceiling.
            </p>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3 pt-2"
            >
              <motion.div variants={fadeInUp} className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Full-Funnel Accountability</h4>
                  <p className="text-xs text-slate-400">We tie creative ad copy, keyword targeting, and server infrastructure directly to pipeline and revenue.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Continuous Zero-Downtime Reliability</h4>
                  <p className="text-xs text-slate-400">24/7 dedicated IT helpdesk support, automated multi-region backups, and rapid incident response.</p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="flex items-start gap-3">
                <div className="p-1 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Senior Hands-On Leadership</h4>
                  <p className="text-xs text-slate-400">Direct strategic oversight from founder Abhishek Singh and seasoned enterprise architects.</p>
                </div>
              </motion.div>
            </motion.div>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo('about')}
                className="px-6 py-3 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Read Our Full Story & Evolution</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <motion.div 
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl border border-slate-800 bg-[#0d121d] p-6 lg:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

              {/* Founder Spotlight Card */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
                <EditableElement
                  target={{
                    id: 'founderImage',
                    label: 'Founder Portrait Image',
                    type: 'image',
                    currentValue: websiteContent.founderImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
                    options: { fieldPath: 'founderImage' }
                  }}
                  className="shrink-0"
                >
                  <img
                    src={websiteContent.founderImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"}
                    alt={`${websiteContent.founderName || 'Abhishek Singh'} - Founder`}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-lg"
                  />
                </EditableElement>
                <div>
                  <EditableElement
                    target={{
                      id: 'founderName',
                      label: 'Founder Name',
                      type: 'text',
                      currentValue: websiteContent.founderName || 'Abhishek Singh',
                      options: { fieldPath: 'founderName' }
                    }}
                  >
                    <h3 className="font-display text-lg font-bold text-white">{websiteContent.founderName || 'Abhishek Singh'}</h3>
                  </EditableElement>

                  <EditableElement
                    target={{
                      id: 'founderRole',
                      label: 'Founder Title / Role',
                      type: 'text',
                      currentValue: websiteContent.founderRole || 'Founder & Managing Director',
                      options: { fieldPath: 'founderRole' }
                    }}
                  >
                    <p className="text-xs text-cyan-400 font-medium">{websiteContent.founderRole || 'Founder & Managing Director'}</p>
                  </EditableElement>
                  <p className="text-[11px] text-slate-400 mt-0.5">Leading digital strategy & enterprise engineering</p>
                </div>
              </div>

              <div className="py-6">
                <EditableElement
                  target={{
                    id: 'founderQuote',
                    label: 'Founder Statement Quote',
                    type: 'textarea',
                    currentValue: websiteContent.founderQuote,
                    options: { fieldPath: 'founderQuote' }
                  }}
                >
                  <blockquote className="text-sm text-slate-300 italic leading-relaxed">
                    "{websiteContent.founderQuote}"
                  </blockquote>
                </EditableElement>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-cyan-400 font-bold text-lg">9+ Years</div>
                  <div className="text-slate-400 mt-0.5">Consistent Enterprise Track Record</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-emerald-400 font-bold text-lg">100%</div>
                  <div className="text-slate-400 mt-0.5">In-House Engineering & Strategy</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CORE SERVICES OVERVIEW */}
      <section className="py-20 bg-[#080b12] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>End-To-End Capabilities</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Core Services & Practice Areas
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Select any capability to explore in-depth methodology, delivered results, and dedicated practice overviews.
              </p>
            </div>

            {/* Filter Pills with animated layout */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
              {(
                [
                  { id: 'all', label: 'All Services' },
                  { id: 'marketing', label: 'Digital Marketing' },
                  { id: 'engineering', label: 'Web Engineering' },
                  { id: 'it', label: 'IT Support' }
                ] as const
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      isActive ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterPill"
                        className="absolute inset-0 bg-cyan-500 rounded-lg shadow-md -z-0"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Service Cards Grid with AnimatePresence */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileHover={{ y: -7, scale: 1.02 }}
                  transition={{ 
                    duration: 0.25, 
                    ease: [0.25, 1, 0.5, 1],
                    layout: { duration: 0.3 } 
                  }}
                  className="group relative rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/60 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                        {service.category}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Starts at {service.startingPrice}
                      </span>
                    </div>

                    <EditableElement
                      target={{
                        id: `srv-title-${service.id}`,
                        label: `Service Title (${service.title})`,
                        type: 'text',
                        currentValue: service.title,
                        options: { serviceId: service.id, property: 'title' }
                      }}
                    >
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {service.title}
                      </h3>
                    </EditableElement>

                    <EditableElement
                      target={{
                        id: `srv-desc-${service.id}`,
                        label: `Service Description (${service.title})`,
                        type: 'textarea',
                        currentValue: service.description,
                        options: { serviceId: service.id, property: 'description' }
                      }}
                    >
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    </EditableElement>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-1.5">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => navigateTo('service-detail', service.slug)}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group/btn cursor-pointer"
                    >
                      <span>View Dedicated Page</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => navigateTo('book-consultation')}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      Quick Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              <span>Explore All 10 Services with Interactive Lead Forms</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES WE SERVE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Vertical Expertise</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Industries We Scale & Secure
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Tailored growth playbooks and compliance-ready technical infrastructure built specifically for your sector.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30 transition-colors duration-200 hover:bg-slate-900/70"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4 transition-transform group-hover:scale-105">
                <ind.icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-2">{ind.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Verified Client Impact</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Endorsed by Fast-Growing Brands
            </h2>
            <p className="text-slate-400 text-sm">
              Discover how our integrated marketing and IT solutions deliver verified bottom-line growth.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 hover:border-slate-700/80 transition-colors duration-200 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="inline-block px-2 py-0.5 mb-3 rounded text-[11px] font-bold bg-emerald-950/70 border border-emerald-800/60 text-emerald-300">
                    {t.resultsAchieved}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <p className="text-[11px] text-slate-400">{t.role} • {t.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RECENT BLOG ARTICLES */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thought Leadership</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Recent Engineering & Growth Articles
            </h2>
          </div>
          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => navigateTo('blog')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {blogPosts.slice(0, 3).map((post) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              onClick={() => navigateTo('blog-post', post.slug)}
              className="cursor-pointer group rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 overflow-hidden transition-colors flex flex-col justify-between"
            >
              <div>
                <EditableElement
                  target={{
                    id: `blog-img-${post.id}`,
                    label: `Blog Cover Image (${post.title})`,
                    type: 'image',
                    currentValue: post.coverImage,
                    options: { blogId: post.id, property: 'coverImage' }
                  }}
                  className="aspect-video w-full overflow-hidden relative block"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-slate-700">
                    {post.category}
                  </div>
                </EditableElement>

                <div className="p-5">
                  <div className="text-[11px] text-slate-400 mb-2">
                    {post.publishedAt} • {post.readTime}
                  </div>
                  <EditableElement
                    target={{
                      id: `blog-title-${post.id}`,
                      label: `Blog Title (${post.title})`,
                      type: 'text',
                      currentValue: post.title,
                      options: { blogId: post.id, property: 'title' }
                    }}
                  >
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </EditableElement>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-slate-400">
                <span className="text-slate-300 font-medium">By {post.author.name}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative rounded-3xl bg-gradient-to-br from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-800/50 p-8 sm:p-14 text-center overflow-hidden shadow-2xl"
        >
          {/* Subtle breathing glow */}
          <motion.div 
            animate={{ 
              opacity: [0.12, 0.22, 0.12],
              scale: [1, 1.05, 1] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 right-1/2 translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Turn Your Digital Channel Into An Unstoppable Machine?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Schedule a 1-on-1 discovery consultation with Abhishek Singh and our practice leads to audit your current search rankings, paid ads, or IT infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo('book-consultation')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 30-Minute Consultation</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo('contact')}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
              >
                <span>Direct Contact Details</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

