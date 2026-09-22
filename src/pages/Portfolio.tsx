import React, { useState } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Calendar,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types';

export const Portfolio: React.FC = () => {
  const { projects, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || '');

  const categories = ['All', 'Website Development', 'Marketing', 'Branding', 'Tech Support'];

  const filtered = projects.filter((c: PortfolioProject) => {
    if (selectedCategory === 'All') return true;
    return c.category === selectedCategory;
  });

  const activeProject = projects.find((c: PortfolioProject) => c.id === activeProjectId) || projects[0];

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Proven Track Record</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Enterprise Case Studies & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300">
            Engineered Transformations
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Explore measurable commercial outcomes, revenue multipliers, and zero-downtime infrastructure overhauls engineered by RSGeeker Media.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Projects */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((study: PortfolioProject) => (
            <div
              key={study.id}
              onClick={() => setActiveProjectId(study.id)}
              className={`cursor-pointer rounded-2xl bg-slate-900/60 border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                activeProjectId === study.id
                  ? 'border-cyan-500/60 bg-slate-900 ring-2 ring-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 backdrop-blur-md text-cyan-300 border border-slate-700">
                    {study.category}
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-slate-400 mb-1">
                  {study.client} • {study.year}
                </div>
                <h3 className="font-display text-base font-bold text-white mb-2 leading-snug">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {study.description}
                </p>

                {/* Key stats pill */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {study.results.slice(0, 2).map((res: string, rIdx: number) => (
                    <span key={rIdx} className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-950/70 border border-cyan-800/50 text-cyan-300">
                      {res}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-bold flex items-center gap-1">
                  <span>View Breakdown Below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-slate-500 font-mono text-[10px]">#{study.id}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Deep-Dive Selected Project */}
      {activeProject && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0b0f17] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Detailed Case Breakdown
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{activeProject.client} ({activeProject.year})</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                  {activeProject.title}
                </h2>
              </div>

              <button
                onClick={() => navigateTo('book-consultation')}
                className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 self-start lg:self-auto shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Replicate These Results</span>
              </button>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Strategic Scope & Implementation</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
                
                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-semibold">Technologies & Capabilities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((t: string, idx: number) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Quantified Commercial Impact</span>
                </h4>
                <ul className="space-y-3">
                  {activeProject.results.map((res: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-semibold text-white">{res}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* CTA Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-display text-2xl font-bold text-white">
            Have a Complex Challenge in Your Industry?
          </h3>
          <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed">
            Our directors will prepare a complimentary 15-page architectural & acquisition roadmap based on our past delivery experience.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('book-consultation')}
              className="px-8 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
