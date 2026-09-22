import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Phone, 
  Calendar,
  Layers,
  ArrowRight,
  Code2,
  Search,
  Cpu,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

export const Header: React.FC = () => {
  const { currentPage, navigateTo, isAdminLoggedIn, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; route: PageRoute; badge?: string }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Tech Support', route: 'tech-support', badge: '24/7' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Blog', route: 'blog' },
    { label: 'Contact', route: 'contact' },
  ];

  const serviceCategories = [
    {
      title: 'Digital Marketing',
      icon: Search,
      items: [
        { name: 'Search Engine Optimization (SEO)', slug: 'seo' },
        { name: 'Google Ads & Performance Max', slug: 'google-ads' },
        { name: 'Meta Ads (Facebook & Instagram)', slug: 'meta-ads' },
        { name: 'Social Media Management', slug: 'social-media-marketing' }
      ]
    },
    {
      title: 'Web Engineering',
      icon: Code2,
      items: [
        { name: 'Modern Website & Web App Dev', slug: 'website-development' },
        { name: 'E-Commerce Storefronts', slug: 'ecommerce-development' },
        { name: 'Brand Strategy & Identity', slug: 'brand-strategy' }
      ]
    },
    {
      title: 'IT Support & Systems',
      icon: Cpu,
      items: [
        { name: '24/7 Managed Remote IT Helpdesk', slug: 'it-support' },
        { name: 'Network Support & Cloud Security', slug: 'network-support' },
        { name: 'Business IT & CTO Consulting', slug: 'technical-consulting' }
      ]
    }
  ];

  const handleNavClick = (route: PageRoute) => {
    navigateTo(route);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleServiceSelect = (slug: string) => {
    navigateTo('service-detail', slug);
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#06080e]/90 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-xl shadow-black/60' 
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-cyan-500/25">
              <div className="w-full h-full bg-[#06080e] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 text-lg">
                  RS
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  RSGeeker <span className="text-cyan-400">Media</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide">
                Digital Engineering & Managed IT
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.route || (item.route === 'services' && currentPage === 'service-detail');

              if (item.route === 'services') {
                return (
                  <div 
                    key={item.route}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick('services')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 cursor-pointer ${
                        isActive
                          ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 shadow-xs shadow-cyan-500/10'
                          : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} />
                    </button>

                    {/* Services Mega Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[700px] animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-[#0b0f17] border border-cyan-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl grid grid-cols-3 gap-5">
                          {serviceCategories.map((cat, idx) => (
                            <div key={idx} className="space-y-3">
                              <div className="flex items-center gap-2 pb-2 border-b border-cyan-500/20">
                                <cat.icon className="w-4 h-4 text-cyan-400" />
                                <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-200">{cat.title}</h5>
                              </div>
                              <ul className="space-y-1.5">
                                {cat.items.map((sub, sIdx) => (
                                  <li key={sIdx}>
                                    <button
                                      onClick={() => handleServiceSelect(sub.slug)}
                                      className="text-left w-full text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/30 px-2 py-1.5 rounded-md transition-all flex items-center justify-between group/link cursor-pointer"
                                    >
                                      <span>{sub.name}</span>
                                      <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all text-cyan-400" />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="bg-[#070911] border-t border-cyan-500/20 p-3 rounded-b-2xl flex items-center justify-between text-xs px-5">
                          <span className="text-slate-400">Looking for a bespoke enterprise growth retainer?</span>
                          <button
                            onClick={() => handleNavClick('services')}
                            className="font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                          >
                            Explore All Services <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 shadow-xs shadow-cyan-500/10'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Switcher Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                theme === 'dark'
                  ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30 hover:bg-cyan-950/60 hover:border-cyan-400 shadow-xs shadow-cyan-500/10'
                  : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100 shadow-xs'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-cyan-300 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Book Consultation CTA */}
            <button
              onClick={() => handleNavClick('book-consultation')}
              className="relative group px-4 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              title={`Toggle to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                theme === 'dark'
                  ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40'
                  : 'border-blue-200 text-blue-700 bg-blue-50'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-cyan-300" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#06080e]/95 backdrop-blur-2xl border-b border-cyan-500/20 z-50 overflow-y-auto px-6 py-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left flex items-center justify-between border cursor-pointer ${
                    currentPage === item.route
                      ? 'border-cyan-500/40 text-cyan-300 bg-cyan-950/30'
                      : 'border-slate-800/80 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Services List */}
            <div className="pt-2 border-t border-cyan-500/20">
              <h5 className="text-xs uppercase font-bold tracking-wider text-cyan-400/80 mb-2">Bespoke Services</h5>
              <div className="space-y-1">
                <button
                  onClick={() => handleServiceSelect('seo')}
                  className="w-full text-left py-2 px-3 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Search Engine Optimization (SEO)</span>
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" />
                </button>
                <button
                  onClick={() => handleServiceSelect('website-development')}
                  className="w-full text-left py-2 px-3 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>Modern Website & Web App Dev</span>
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" />
                </button>
                <button
                  onClick={() => handleServiceSelect('it-support')}
                  className="w-full text-left py-2 px-3 text-xs text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>24/7 Managed Remote IT Support</span>
                  <ArrowRight className="w-3 h-3 text-cyan-500/60" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-cyan-500/20 space-y-3">
            {/* Theme Toggle in Mobile Drawer */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <div className="flex items-center gap-2">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Sun className="w-4 h-4 text-blue-600" />
                )}
                <span className="text-xs font-semibold text-slate-200">
                  {theme === 'dark' ? 'Navy Dark' : 'Clean Light'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400/30 transition-colors"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" /> Switch to Light
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" /> Switch to Dark
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => handleNavClick('book-consultation')}
              className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white" />
              Book Strategy Consultation
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" /> +1 (800) 555-0199
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
