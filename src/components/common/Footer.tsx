import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  Lock,
  ExternalLink,
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo, websiteContent, addLead, showToast, theme, toggleTheme } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid business email address.', 'warning');
      return;
    }

    addLead({
      name: 'Newsletter Subscriber',
      email: newsletterEmail,
      phone: 'N/A',
      company: 'Newsletter Subscriber',
      serviceInterested: 'Newsletter & Market Insights',
      budget: 'N/A',
      message: 'Subscribed to RSGeeker Media digital marketing and technology briefing.',
      source: 'Footer Newsletter',
      status: 'New Lead',
      initialNote: 'Subscribed to digital marketing and enterprise tech briefings from footer.'
    });

    setSubscribed(true);
    setNewsletterEmail('');
    showToast('Subscribed Successfully', 'You have been enrolled in the RSGeeker executive briefing.', 'success');
  };

  return (
    <footer className="bg-[#06080d] border-t border-slate-800/80 text-slate-400 text-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Banner / Lead Catch */}
      <div className="border-b border-slate-800/60 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-[#0e1626] border border-slate-800 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enterprise Growth Retainers</span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Ready to scale your pipeline and stabilize IT infrastructure?
            </h3>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">
              Consult with Abhishek Singh and our senior technical leads to map your digital marketing, web platform, or remote helpdesk roadmap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('book-consultation')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Book Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('tech-support')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>24/7 IT Helpdesk</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-cyan-300 text-lg">
                  RS
                </span>
              </div>
            </div>
            <div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                RSGeeker <span className="text-cyan-400">Media</span>
              </span>
              <p className="text-[11px] text-slate-400">Digital Marketing & Enterprise IT</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Founded by Abhishek Singh, RSGeeker Media builds resilient digital growth engines. We harmonize full-funnel digital marketing, custom Next.js web applications, and round-the-clock enterprise IT support.
          </p>

          <div className="pt-2 space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{websiteContent.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`tel:${websiteContent.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-cyan-300 transition-colors">
                {websiteContent.phone}
              </a>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium">24/7 IT Line Active</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`mailto:${websiteContent.email}`} className="hover:text-cyan-300 transition-colors">
                {websiteContent.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{websiteContent.workingHours}</span>
            </div>
          </div>

          {/* Quick WhatsApp Action */}
          <div className="pt-2">
            <a
              href={`https://wa.me/${websiteContent.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20RSGeeker%20Media,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:text-emerald-200 text-xs font-semibold transition-all hover:bg-emerald-900/60"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Services Directory */}
        <div className="space-y-3">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
            Core Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('service-detail', 'seo')} className="hover:text-cyan-400 transition-colors text-left">
                Technical SEO & Authority
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'google-ads')} className="hover:text-cyan-400 transition-colors text-left">
                Google Ads & Performance Max
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'meta-ads')} className="hover:text-cyan-400 transition-colors text-left">
                Meta Ads (Facebook & Instagram)
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'website-development')} className="hover:text-cyan-400 transition-colors text-left">
                Next.js & React Web Apps
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'ecommerce-development')} className="hover:text-cyan-400 transition-colors text-left">
                Shopify & E-Commerce
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'it-support')} className="hover:text-cyan-400 transition-colors text-left text-emerald-400">
                24/7 Managed Remote Helpdesk
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('service-detail', 'network-support')} className="hover:text-cyan-400 transition-colors text-left">
                Cloud & Network Security
              </button>
            </li>
          </ul>
        </div>

        {/* Company & Solutions */}
        <div className="space-y-3">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
            Company & Solutions
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition-colors">
                About RSGeeker Media
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('pricing')} className="hover:text-cyan-400 transition-colors">
                Transparent Pricing Plans
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('portfolio')} className="hover:text-cyan-400 transition-colors">
                Portfolio & Case Studies
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('blog')} className="hover:text-cyan-400 transition-colors">
                Growth & Tech Blog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('tech-support')} className="hover:text-cyan-400 transition-colors">
                Support Ticket Tracker
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('book-consultation')} className="hover:text-cyan-400 transition-colors font-semibold text-cyan-400">
                Book Consultation
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('admin')} className="hover:text-indigo-400 transition-colors inline-flex items-center gap-1 text-slate-400">
                <Lock className="w-3 h-3 text-indigo-400" />
                <span>Admin CRM & CMS</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter & Insights */}
        <div className="space-y-3">
          <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
            Executive Briefing
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Bi-weekly tactical teardowns on Google search algorithms, paid media scaling, and IT security.
          </p>

          {subscribed ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex items-center gap-2 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Thank you! Briefing sent to your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter business email..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Subscribe to Briefing</span>
                <ArrowRight className="w-3 h-3 text-cyan-400" />
              </button>
            </form>
          )}

          <div className="pt-2 text-[11px] text-slate-500">
            Strictly zero spam. Unsubscribe anytime.
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Compliance & Theme Switch */}
      <div className="border-t border-slate-800/60 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} RSGeeker Media. Founded by Abhishek Singh. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
          <button onClick={() => navigateTo('privacy-policy')} className="hover:text-slate-300 transition-colors cursor-pointer">
            Privacy Policy
          </button>
          <button onClick={() => navigateTo('terms')} className="hover:text-slate-300 transition-colors cursor-pointer">
            Terms & Conditions
          </button>
          <button onClick={() => navigateTo('tech-support')} className="hover:text-slate-300 transition-colors cursor-pointer">
            Support SLA
          </button>
          <button 
            onClick={() => navigateTo('admin')} 
            className="hover:text-cyan-400 text-slate-500 transition-colors flex items-center gap-1 cursor-pointer"
            title="Authorized Staff Portal"
          >
            <Lock className="w-3 h-3 text-slate-500" />
            <span>Staff Portal</span>
          </button>

          {/* Quick Theme Switcher Pill in Footer */}
          <button
            onClick={toggleTheme}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              theme === 'dark'
                ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30 hover:bg-cyan-950/60 hover:border-cyan-400'
                : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-cyan-300" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </footer>
  );
};
