import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { addLead, showToast, websiteContent, navigateTo } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Search Engine Optimization (SEO)');
  const [budget, setBudget] = useState('$5,000 - $10,000 / mo');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Missing Details', 'Please provide your name, email, and a brief message.', 'warning');
      return;
    }

    addLead({
      name,
      email,
      phone: phone || 'N/A',
      company: company || 'Individual Client',
      serviceInterested: service,
      budget,
      message,
      source: 'Contact Us Page',
      status: 'New Lead',
      initialNote: 'Direct inquiry submitted via Contact Us general form.'
    });

    setSubmitted(true);
    showToast('Inquiry Received', 'Thank you! Our operations director will contact you within 2 hours.', 'success');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Let’s Discuss Your Next <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Growth & Technical Milestone
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Whether you need an immediate IT disaster recovery assessment, full-funnel search marketing, or modern web engineering, our leadership team is ready.
        </p>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl space-y-6">
              <h3 className="font-display text-xl font-bold text-white">
                Direct Corporate Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Commercial & Inquiries</span>
                    <a href={`mailto:${websiteContent.email}`} className="font-bold text-white hover:text-cyan-400 transition-colors">
                      {websiteContent.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">24/7 Telephone & Emergency IT SLA</span>
                    <a href={`tel:${websiteContent.phone}`} className="font-bold text-white hover:text-emerald-400 transition-colors">
                      {websiteContent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Global Operations Headquarters</span>
                    <p className="font-medium text-slate-300">
                      {websiteContent.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Operating Hours</span>
                    <p className="font-medium text-slate-300">
                      Mon – Fri: 8:00 AM – 7:00 PM EST<br />
                      Managed IT Incident Desk: 24/7/365 On-Call
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation banner */}
              <div className="pt-4 border-t border-slate-800">
                <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Prefer an Immediate Meeting?</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Skip email back-and-forth and lock in a 30-minute discovery call directly on Abhishek Singh's calendar.
                  </p>
                  <button
                    onClick={() => navigateTo('book-consultation')}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 pt-1"
                  >
                    <span>Open Calendar Booker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                All submissions are logged into our centralized CRM and assigned to a practice lead within 15 minutes.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-display text-xl font-bold text-white">Thank You, {name}!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been successfully transmitted to RSGeeker Media's client solutions team. We will review your brief and follow up promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-white hover:bg-slate-700 transition-colors mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Jason Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Business Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jason@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Direct Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Miller Logistics"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Area of Interest</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                        <option value="Google Ads / Paid Search">Google Ads / Paid Search</option>
                        <option value="Meta Ads & Creative Scaling">Meta Ads & Creative Scaling</option>
                        <option value="Next.js Headless Web Engineering">Next.js Headless Web Engineering</option>
                        <option value="24/7 Managed IT & Helpdesk Support">24/7 Managed IT & Helpdesk Support</option>
                        <option value="Network & VPN Infrastructure">Network & VPN Infrastructure</option>
                        <option value="Technical CTO Advisory">Technical CTO Advisory</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Budget Range</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      >
                        <option value="$1,500 - $3,000 / mo">$1,500 - $3,000 / mo</option>
                        <option value="$3,000 - $5,000 / mo">$3,000 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                        <option value="$10,000+ / mo (Enterprise)">$10,000+ / mo (Enterprise Growth)</option>
                        <option value="One-Time Infrastructure Build">One-Time Infrastructure Build</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details or Inquiry *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Outline current roadblocks, desired milestones, or upcoming launch deadlines..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message to RSGeeker Media</span>
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
