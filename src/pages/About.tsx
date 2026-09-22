import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Code2, 
  TrendingUp, 
  Award, 
  Globe2, 
  Terminal, 
  Users,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditableElement } from '../components/inline-editor/EditableElement';

export const About: React.FC = () => {
  const { navigateTo, websiteContent, faqs } = useApp();
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  const timelineMilestones = [
    {
      year: 'Phase 1',
      title: 'Foundation by Abhishek Singh',
      desc: 'Abhishek Singh founded RSGeeker Media with the goal of providing businesses with genuine technical competence in digital growth and IT advisory, cutting through superficial marketing jargon.'
    },
    {
      year: 'Phase 2',
      title: 'Performance Marketing Scaling',
      desc: 'Expanded into full-funnel paid search and performance social advertising, managing over $3M in annual ad spend with consistent 4x+ ROAS benchmarks.'
    },
    {
      year: '2021',
      title: 'Modern Web Engineering Migration',
      desc: 'Pioneered early enterprise adoption of Next.js, React Server Components, and headless e-commerce, replacing slow legacy WordPress monoliths with sub-second web platforms.'
    },
    {
      year: '2023',
      title: '24/7 Managed IT Infrastructure Launch',
      desc: 'Instituted 24/7 remote IT helpdesk operations, enterprise network deployments, and HIPAA/SOC2 compliance auditing for high-security healthcare and fintech firms.'
    },
    {
      year: '2026',
      title: 'Integrated Enterprise Platform',
      desc: 'Operating globally across North America, Europe, and Asia-Pacific as a unified digital marketing and technology infrastructure partner for ambitious organizations.'
    }
  ];

  const coreValues = [
    {
      title: 'Engineering Rigor',
      desc: 'We do not build flimsy shortcuts. Every marketing campaign is tracked to the penny, and every web application is built with type-safe modern standards.'
    },
    {
      title: 'Radical Accountability',
      desc: 'We report real business outcomes: pipeline generated, closed-won deals, verified ROAS, and zero-downtime IT reliability. Never vanity impressions.'
    },
    {
      title: 'Integrated Unity',
      desc: 'Marketing without technical speed fails. Tech without customer acquisition is a cost center. We unify both into a cohesive growth engine.'
    },
    {
      title: 'Enterprise Security by Default',
      desc: 'From zero-trust remote networks to first-party cookie privacy compliance, we protect your intellectual property and customer records aggressively.'
    }
  ];

  const techStack = [
    { category: 'Frontend & Web', tools: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'] },
    { category: 'Cloud & Infrastructure', tools: ['AWS', 'Google Cloud Platform (GCP)', 'Cloudflare Edge CDN', 'Docker', 'Vercel'] },
    { category: 'Marketing & Attribution', tools: ['Google Marketing Platform', 'Meta Conversions API (CAPI)', 'Google Tag Manager Server-Side', 'HubSpot CRM'] },
    { category: 'IT & Security Systems', tools: ['WireGuard VPN', 'Zero-Trust Networks', 'Microsoft 365 Admin', 'Sentinel Endpoint Antivirus', 'SOC2 / HIPAA Auditing'] }
  ];

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Globe2 className="w-3.5 h-3.5" />
          <span>About RSGeeker Media</span>
        </div>
        <EditableElement
          target={{
            id: 'aboutTitle',
            label: 'About Page Headline',
            type: 'text',
            currentValue: websiteContent.aboutTitle || 'Built to Unify Marketing Strategy & Deep IT Engineering',
            options: { fieldPath: 'aboutTitle' }
          }}
        >
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            {websiteContent.aboutTitle || (
              <>
                Built to Unify <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">
                  Marketing Strategy & Deep IT Engineering
                </span>
              </>
            )}
          </h1>
        </EditableElement>

        <EditableElement
          target={{
            id: 'aboutSubtitle',
            label: 'About Page Subtitle',
            type: 'textarea',
            currentValue: websiteContent.aboutSubtitle || 'We are a full-service enterprise partner engineered to solve the disconnect between modern customer acquisition funnels and mission-critical cloud infrastructure.',
            options: { fieldPath: 'aboutSubtitle' }
          }}
        >
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            {websiteContent.aboutSubtitle || 'We are a full-service enterprise partner engineered to solve the disconnect between modern customer acquisition funnels and mission-critical cloud infrastructure.'}
          </p>
        </EditableElement>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0c101a]">
              <EditableElement
                target={{
                  id: 'aboutShowcaseImage',
                  label: 'About Team Showcase Image',
                  type: 'image',
                  currentValue: websiteContent.aboutShowcaseImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80",
                  options: { fieldPath: 'aboutShowcaseImage' }
                }}
                className="w-full block"
              >
                <img
                  src={websiteContent.aboutShowcaseImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"}
                  alt="RSGeeker Media Strategy Team"
                  className="w-full h-[450px] object-cover opacity-85"
                />
              </EditableElement>
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <EditableElement
                    target={{
                      id: 'aboutFounderImage',
                      label: 'Founder Avatar Image',
                      type: 'image',
                      currentValue: websiteContent.founderImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
                      options: { fieldPath: 'founderImage' }
                    }}
                    className="shrink-0"
                  >
                    <img
                      src={websiteContent.founderImage || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80"}
                      alt={websiteContent.founderName || "Abhishek Singh"}
                      className="w-12 h-12 rounded-xl object-cover border border-cyan-500/50"
                    />
                  </EditableElement>
                  <div>
                    <EditableElement
                      target={{
                        id: 'aboutFounderName',
                        label: 'Founder Name',
                        type: 'text',
                        currentValue: websiteContent.founderName || "Abhishek Singh",
                        options: { fieldPath: 'founderName' }
                      }}
                    >
                      <h4 className="text-sm font-bold text-white">{websiteContent.founderName || "Abhishek Singh"}</h4>
                    </EditableElement>

                    <EditableElement
                      target={{
                        id: 'aboutFounderRole',
                        label: 'Founder Role Title',
                        type: 'text',
                        currentValue: websiteContent.founderRole || "Founder & CEO, RSGeeker Media",
                        options: { fieldPath: 'founderRole' }
                      }}
                    >
                      <p className="text-xs text-cyan-400">{websiteContent.founderRole || "Founder & CEO, RSGeeker Media"}</p>
                    </EditableElement>
                    <p className="text-[11px] text-slate-400">Enterprise Engineering & Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>The Founder's Journey</span>
            </div>

            <EditableElement
              target={{
                id: 'aboutStoryTitle',
                label: 'Founder Journey Title',
                type: 'text',
                currentValue: websiteContent.aboutStoryTitle || "Company Story & Evolution",
                options: { fieldPath: 'aboutStoryTitle' }
              }}
            >
              <h2 className="font-display text-3xl font-bold text-white tracking-tight">
                {websiteContent.aboutStoryTitle || "Company Story & Evolution"}
              </h2>
            </EditableElement>

            <EditableElement
              target={{
                id: 'aboutStoryContent',
                label: 'Company Story Narrative',
                type: 'textarea',
                currentValue: websiteContent.aboutStoryContent || "Abhishek Singh recognized an acute inefficiency in the corporate landscape: businesses frequently hired separate marketing agencies, separate web developers, and separate IT support providers.\n\nWhen paid ads drove sudden traffic, unoptimized web servers crashed. When web developers added heavy scripts, search engine rankings dropped. And when remote staff faced technical roadblocks, customer support halted.\n\nRSGeeker Media was created to deliver an integrated answer. By merging disciplined data marketing, clean modern Next.js web development, and 24/7 managed IT network support under one roof, we give growing organizations an institutional advantage.",
                options: { fieldPath: 'aboutStoryContent' }
              }}
            >
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line space-y-4">
                {websiteContent.aboutStoryContent ? (
                  <p>{websiteContent.aboutStoryContent}</p>
                ) : (
                  <>
                    <p>
                      Abhishek Singh recognized an acute inefficiency in the corporate landscape: businesses frequently hired separate marketing agencies, separate web developers, and separate IT support providers.
                    </p>
                    <p className="text-slate-400">
                      When paid ads drove sudden traffic, unoptimized web servers crashed. When web developers added heavy scripts, search engine rankings dropped. And when remote staff faced technical roadblocks, customer support halted.
                    </p>
                    <p className="text-slate-400">
                      RSGeeker Media was created to deliver an integrated answer. By merging disciplined data marketing, clean modern Next.js web development, and 24/7 managed IT network support under one roof, we give growing organizations an institutional advantage.
                    </p>
                  </>
                )}
              </div>
            </EditableElement>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="font-display text-2xl font-bold text-cyan-400">{websiteContent.statsUptime || "99.98%"}</div>
                <div className="text-xs text-slate-400 mt-1">{websiteContent.statsUptimeLabel || "SLA Infrastructure Uptime"}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="font-display text-2xl font-bold text-blue-400">{websiteContent.statsClientsCount || "350+"}</div>
                <div className="text-xs text-slate-400 mt-1">{websiteContent.statsClientsLabel || "Global Deployments"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#0b0f17] border border-slate-800 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {websiteContent.missionTitle || "Our Mission"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {websiteContent.missionContent || "To empower modern businesses with resilient digital infrastructure and high-intent customer acquisition systems, eliminating technical downtime and maximizing enterprise value."}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0b0f17] border border-slate-800 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">
              {websiteContent.visionTitle || "Our Vision"}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {websiteContent.visionContent || "To be the premier global technology and digital growth partner for ambitious institutions, recognized for engineering rigor, transparent attribution, and relentless customer dedication."}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Our Core Values
          </h2>
          <p className="text-slate-400 text-sm">
            The ethical and technical standards that govern every engagement we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((v, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400">0{idx + 1}.</span>
              <h3 className="font-display text-base font-bold text-white mt-2 mb-2">{v.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-20 bg-[#080b12] border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Milestones & Evolution</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Growth Milestones & Strategic Evolution
            </h2>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-10">
            {timelineMilestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Year tag for larger screens */}
                <div className="hidden sm:block absolute -left-36 top-0 text-sm font-display font-bold text-cyan-400">
                  {m.year}
                </div>

                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0b0f17] border-2 border-cyan-500 group-hover:scale-125 transition-transform"></div>

                <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <span className="sm:hidden text-xs font-bold text-cyan-400 mb-1 block">{m.year}</span>
                  <h4 className="font-display text-base font-bold text-white">{m.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Tooling</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">
            Enterprise Technology Stack
          </h2>
          <p className="text-slate-400 text-sm">
            We build exclusively on industry-standard, production-proven modern architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((group, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-display text-sm font-bold text-cyan-300 pb-3 border-b border-slate-800 mb-4">
                {group.category}
              </h4>
              <ul className="space-y-2">
                {group.tools.map((tool, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm">
              Answers to common questions regarding our agency model and technical delivery.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => {
              const isOpen = openFaq === f.id;
              return (
                <div
                  key={f.id}
                  className="rounded-xl border border-slate-800 bg-[#0b0f17] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : f.id)}
                    className="w-full text-left p-4 text-sm font-semibold text-white flex items-center justify-between gap-4 hover:text-cyan-300 transition-colors"
                  >
                    <span>{f.question}</span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Partner with RSGeeker Media Today
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Experience the peace of mind that comes with engineering-grade marketing and 24/7 IT reliability.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('book-consultation')}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
            >
              <span>Schedule Initial Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
