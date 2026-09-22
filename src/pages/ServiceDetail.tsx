import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  ChevronDown,
  Layers,
  HelpCircle,
  Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceDetail: React.FC = () => {
  const { selectedServiceSlug, services, navigateTo, addLead, showToast } = useApp();

  const service = services.find(s => s.slug === selectedServiceSlug) || services[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Lead form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('$5,000 - $10,000');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Missing Info', 'Please enter your name and contact email.', 'warning');
      return;
    }

    addLead({
      name,
      email,
      phone: phone || 'N/A',
      company: company || 'Self-Employed / Stealth',
      serviceInterested: service.title,
      budget,
      message: notes || `Direct inquiry regarding ${service.title}`,
      source: `Service Page (${service.slug})`,
      status: 'New Lead',
      initialNote: `Inquiry submitted directly on ${service.title} dedicated landing page.`
    });

    setSubmitted(true);
    showToast('Lead Registered in CRM', `Thank you ${name}. Our lead architect has received your details.`, 'success');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Breadcrumb / Back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <button
          onClick={() => navigateTo('services')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Practice Areas</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.category} Practice</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-cyan-300 font-medium text-base sm:text-lg">
              {service.tagline}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              {service.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 30-Min Strategy Call</span>
              </button>
              <div className="text-xs text-slate-400">
                Baseline starting at <span className="text-white font-bold">{service.startingPrice}</span>
              </div>
            </div>
          </div>

          {/* Key Deliverables Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                <span>Scope & Deliverables</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every {service.title} engagement includes dedicated technical leads and closed-loop reporting:
              </p>
              <ul className="space-y-2.5 pt-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits & Measurable Impact */}
      <section className="py-16 bg-[#080b12] border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Why Invest In {service.title}?
            </h2>
            <p className="text-slate-400 text-xs">
              Clear financial and operational outcomes engineered into every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((benefit, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex items-start gap-4 cursor-default group"
              >
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 shrink-0 group-hover:scale-110 group-hover:bg-cyan-900/60 transition-all duration-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">Measurable KPI #{idx + 1}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{benefit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Phase Delivery Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Execution Methodology</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Our 4-Phase Delivery Framework
          </h2>
          <p className="text-slate-400 text-xs">
            From initial telemetry audit to sustainable, predictable scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((step, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="p-6 rounded-2xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 relative group cursor-default"
            >
              <span className="font-display text-2xl font-black text-cyan-500/40 group-hover:text-cyan-300 transition-colors">
                {step.step}
              </span>
              <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-2 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dedicated FAQs & Lead Form Grid */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQs column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice FAQs</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">
              Common Questions About {service.title}
            </h3>

            <div className="space-y-3 pt-2">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="rounded-xl border border-slate-800 bg-[#0b0f17] overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-4 text-xs font-bold text-white flex items-center justify-between gap-4 hover:text-cyan-300 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Direct Lead Form column */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl">
              <h3 className="font-display text-xl font-bold text-white mb-1">
                Inquire Directly Regarding {service.title}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below. It will automatically register a priority lead in our CRM for direct evaluation.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-display text-base font-bold text-white">Inquiry Received</h4>
                  <p className="text-xs text-slate-300">
                    We will review your inquiry for {service.title} and reach out with strategic next steps.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Submit another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitLead} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Michael Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. michael@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Vance Logistics"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Budget Allocation</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="$1,500 - $3,000 / mo">$1,500 - $3,000 / mo</option>
                      <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo</option>
                      <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                      <option value="$10,000+ / mo">$10,000+ / mo (Enterprise Growth)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Challenges or Goals</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Outline target milestones, timelines, or existing roadblocks..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry to Lead Practice Director</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
