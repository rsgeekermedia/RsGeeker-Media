import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Calendar,
  Layers,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Pricing: React.FC = () => {
  const { pricingPlans, navigateTo, addLead, showToast } = useApp();
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  // Quick proposal request modal state
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalCompany, setModalCompany] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlanModal(planName);
    setSubmitted(false);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalEmail) {
      showToast('Required Information', 'Please provide your name and work email.', 'warning');
      return;
    }

    addLead({
      name: modalName,
      email: modalEmail,
      phone: modalPhone || 'N/A',
      company: modalCompany || 'Direct Pricing Inquirer',
      serviceInterested: `Pricing Plan: ${selectedPlanModal} (${isYearly ? 'Annual Billing' : 'Monthly Billing'})`,
      budget: selectedPlanModal === 'Starter' ? '$799/mo' : selectedPlanModal === 'Growth' ? '$1,899/mo' : '$4,499+/mo',
      message: modalNotes || `Client requested proposal for ${selectedPlanModal} plan.`,
      source: 'Pricing Page',
      status: 'Qualified',
      initialNote: `Requested formal onboarding proposal for ${selectedPlanModal} plan with ${isYearly ? 'annual' : 'monthly'} billing.`
    });

    setSubmitted(true);
    showToast('Proposal Request Logged', 'Our commercial director will send contract terms shortly.', 'success');
  };

  const comparisonFeatures = [
    { name: 'Technical & On-Page SEO', starter: 'Local + Basic', growth: 'Full-Funnel + PR', enterprise: 'Global Omnichannel' },
    { name: 'Google Ads & Performance Max', starter: 'Search Ads Only', growth: 'Multi-Channel + PMax', enterprise: 'Full Funnel + YouTube' },
    { name: 'Meta Ads (FB & IG) Creative', starter: false, growth: 'Bi-Weekly Refreshes', enterprise: 'Dedicated Creative Pod' },
    { name: 'Web Engineering Support', starter: '1 Landing Page', growth: 'CRO Testing', enterprise: 'Full-Stack Next.js Pod' },
    { name: 'Managed IT Helpdesk Tickets', starter: 'Up to 5 Tickets/mo', growth: 'Unlimited Tickets', enterprise: 'Unlimited + Dedicated SLA' },
    { name: 'IT Response Time Guarantee', starter: '24 Business Hours', growth: '2 Hours (Business)', enterprise: '15-Minute 24/7 SLA' },
    { name: 'Automated Cloud Backups & Antivirus', starter: 'Basic', growth: 'Daily Immutable', enterprise: 'Multi-Region Failover' },
    { name: 'Dedicated Account Director', starter: false, growth: 'Bi-Weekly Calls', enterprise: 'Weekly Direct + Slack Pod' },
    { name: 'Fractional CTO Advisory', starter: false, growth: false, enterprise: 'Monthly Board Review' }
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Transparent Enterprise Retainers</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Predictable Investments, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Uncapped Enterprise Growth
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          No hidden agency markup. Flexible monthly or discounted annual retainers designed to unite high-performance marketing and 24/7 IT reliability.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="flex items-center justify-center gap-4 pt-10">
          <span className={`text-xs font-semibold ${!isYearly ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 rounded-full bg-slate-900 border border-slate-700 p-1 transition-colors relative"
            aria-label="Toggle annual pricing"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform ${
                isYearly ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-slate-400'}`}>
            <span>Annual Billing</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-[#0e1726] border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 lg:-translate-y-2 hover:shadow-cyan-500/20 hover:scale-[1.015]'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1.5 hover:scale-[1.015]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-[11px] uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
                    {plan.badge && (
                      <span className="text-[11px] font-medium text-cyan-400 px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/60">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 min-h-[36px] leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-6 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-white">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      {isYearly ? 'Billed annually (20% discount applied)' : 'Billed month-to-month, cancel anytime'}
                    </span>
                  </div>

                  {/* Included features */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Included In Plan:</h4>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not included items */}
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <div className="space-y-2 pt-4 mt-4 border-t border-slate-800/80">
                      <h4 className="text-[11px] font-semibold text-slate-500">Not Included:</h4>
                      <ul className="space-y-1.5 opacity-60">
                        {plan.notIncluded.map((nInc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                            <X className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                            <span>{nInc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => navigateTo('book-consultation')}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-cyan-400 font-medium transition-colors"
                  >
                    Or discuss custom SLA on a call →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Detailed Package Comparison
          </h2>
          <p className="text-xs text-slate-400">
            Compare granular capabilities across Starter, Growth, and Enterprise tiers.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#0b0f17] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <th className="p-4 font-bold text-slate-300 w-1/3">Core Capability</th>
                  <th className="p-4 font-bold text-slate-300 w-1/5 text-center">Starter</th>
                  <th className="p-4 font-bold text-cyan-400 w-1/5 text-center bg-cyan-950/20">Growth (Popular)</th>
                  <th className="p-4 font-bold text-blue-400 w-1/5 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-4 font-medium text-white">{row.name}</td>
                    <td className="p-4 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="p-4 text-center bg-cyan-950/10 font-semibold text-cyan-200">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.growth
                      )}
                    </td>
                    <td className="p-4 text-center font-semibold text-blue-200">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" /> : <X className="w-4 h-4 text-slate-600 mx-auto" />
                      ) : (
                        row.enterprise
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Plan Proposal Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPlanModal(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800/50"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                Selected Plan
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                Request {selectedPlanModal} Proposal
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Provide your details below to receive a formal statement of work and kickoff timeline.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-display text-lg font-bold text-white">Proposal Request Submitted!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, {modalName}. Our enterprise commercial director will review your requirements and follow up shortly.
                </p>
                <button
                  onClick={() => setSelectedPlanModal(null)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 text-white hover:bg-slate-700 transition-colors mt-2"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      placeholder="e.g. Rachel Adams"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={modalEmail}
                      onChange={(e) => setModalEmail(e.target.value)}
                      placeholder="rachel@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={modalCompany}
                      onChange={(e) => setModalCompany(e.target.value)}
                      placeholder="e.g. Adams Tech"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Requirements or Kickoff Goals</label>
                  <textarea
                    rows={2}
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    placeholder="Tell us about expected launch dates or unique compliance needs..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Proposal Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
