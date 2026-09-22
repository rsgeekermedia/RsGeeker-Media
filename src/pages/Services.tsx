import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Target, 
  Share2, 
  Code2, 
  ShoppingBag, 
  Compass, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditableElement } from '../components/inline-editor/EditableElement';

export const Services: React.FC = () => {
  const { navigateTo, services, addLead, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Digital Marketing' | 'Engineering' | 'IT Support'>('all');

  // Quick inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryService, setInquiryService] = useState('Search Engine Optimization (SEO)');
  const [inquiryBudget, setInquiryBudget] = useState('$5,000 - $10,000');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filtered = services.filter(s => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5 text-cyan-400" />;
      case 'Target': return <Target className="w-5 h-5 text-blue-400" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-indigo-400" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Network': return <Network className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail) {
      showToast('Missing Fields', 'Please provide your name and email address.', 'warning');
      return;
    }

    addLead({
      name: inquiryName,
      email: inquiryEmail,
      phone: 'Direct Web Inquiry',
      company: 'Website Inquirer',
      serviceInterested: inquiryService,
      budget: inquiryBudget,
      message: inquiryMessage || `General inquiry regarding ${inquiryService}`,
      source: 'Services Page Lead Form',
      status: 'New Lead',
      initialNote: `Inquiry submitted from Services overview page for ${inquiryService}.`
    });

    setSubmitted(true);
    showToast('Inquiry Received', 'Our practice lead will connect with you within 2 hours.', 'success');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Full-Spectrum Solutions</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Enterprise Services & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Dedicated Practice Areas
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          From full-funnel search and social marketing to custom Next.js web platforms and 24/7 managed IT support. Click any service to view dedicated roadmaps and FAQs.
        </p>

        {/* Category switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {(['all', 'Digital Marketing', 'Engineering', 'IT Support'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Practice Areas' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => (
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
                className="rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/60 p-6 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-cyan-500/15"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 group-hover:scale-110 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/40 transition-all duration-300">
                      {getServiceIcon(service.iconName)}
                    </div>
                    {service.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-400 mb-1">
                    {service.category}
                  </div>
                  
                  <EditableElement
                    target={{
                      id: `services-list-title-${service.id}`,
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
                      id: `services-list-desc-${service.id}`,
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
                  <div>
                    <span className="text-[11px] text-slate-400 block">Baseline starting at</span>
                    <span className="text-xs font-bold text-white">{service.startingPrice}</span>
                  </div>

                  <button
                    onClick={() => navigateTo('service-detail', service.slug)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group/btn"
                  >
                    <span>Explore Page</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Direct Scope Consultation & Lead Form */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Request a Custom Scope or Preliminary Audit
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Tell us which service you are evaluating. Our practice leads will review your current presence and provide a preliminary feasibility brief.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="font-display text-lg font-bold text-white">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, {inquiryName}. We have logged your request into our CRM and assigned it to our senior practice director.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-cyan-400 hover:underline pt-2 inline-block font-semibold"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="e.g. sarah@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Interested In</label>
                  <select
                    value={inquiryService}
                    onChange={(e) => setInquiryService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Budget Range</label>
                  <select
                    value={inquiryBudget}
                    onChange={(e) => setInquiryBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                  >
                    <option value="$1,000 - $3,000 / mo">$1,000 - $3,000 / mo</option>
                    <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo</option>
                    <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                    <option value="$10,000+ / mo">$10,000+ / mo (Enterprise)</option>
                    <option value="One-Time Web Build ($5k - $25k)">One-Time Web Build ($5k - $25k)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Objectives or Pain Points</label>
                <textarea
                  rows={3}
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Tell us about current hurdles, target launch dates, or growth goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit Service Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
