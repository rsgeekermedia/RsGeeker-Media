import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  ArrowRight, 
  LayoutDashboard, 
  LogOut, 
  Compass, 
  HelpCircle,
  CheckCircle2,
  MousePointerClick
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

export const InlineEditorToolbar: React.FC = () => {
  const { 
    isInlineEditorActive, 
    setInlineEditorActive, 
    currentAdminUser, 
    currentPage, 
    navigateTo,
    showToast 
  } = useApp();

  const [showHelp, setShowHelp] = useState(false);

  const isSuperAdmin = currentAdminUser?.isSuperAdmin || currentAdminUser?.username?.toLowerCase() === 'admingeeker';

  // Only render if Inline Editor is active and user is Super Admin
  if (!isInlineEditorActive || !isSuperAdmin) return null;

  const pages: { label: string; route: PageRoute }[] = [
    { label: 'Home Page', route: 'home' },
    { label: 'About Us', route: 'about' },
    { label: 'Services Catalog', route: 'services' },
    { label: 'Retainer Pricing', route: 'pricing' },
    { label: 'Tech Support', route: 'tech-support' },
    { label: 'Portfolio', route: 'portfolio' },
    { label: 'Blog & Articles', route: 'blog' },
    { label: 'Contact Details', route: 'contact' }
  ];

  const handleExit = () => {
    setInlineEditorActive(false);
    navigateTo('admin');
    showToast('Inline Editor Closed', 'Returned to Executive CRM Console.', 'info');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center p-3 animate-in slide-in-from-top duration-300">
      <aside 
        aria-label="Inline visual editor controls"
        className="pointer-events-auto bg-[#0a0e17]/95 backdrop-blur-md border-2 border-cyan-400/80 shadow-2xl shadow-cyan-500/30 rounded-2xl px-4 py-2.5 flex flex-wrap items-center gap-3 sm:gap-4 max-w-5xl text-white"
      >
        {/* Status Indicator */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-800">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
                Inline Visual Editor
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Live
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Super Admin: <strong className="text-white">{currentAdminUser.name}</strong>
            </p>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <label htmlFor="inline-editor-page-select" className="text-xs text-slate-300 font-medium hidden md:inline">Page:</label>
          <select
            id="inline-editor-page-select"
            aria-label="Select page to edit"
            value={currentPage}
            onChange={(e) => navigateTo(e.target.value as PageRoute)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-semibold focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {pages.map((p) => (
              <option key={p.route} value={p.route} className="bg-slate-900 text-white">
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Visual Tip */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] text-cyan-300">
          <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click any outlined text, title, or image to edit live</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Help toggle */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            title="Editor Help & Tips"
            aria-label="Editor help"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Jump to Admin Dashboard */}
          <button
            onClick={() => navigateTo('admin')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Open Admin CRM Console"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">CRM</span>
          </button>

          {/* Exit Inline Editor */}
          <button
            onClick={handleExit}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            title="Finish editing and return to Admin CRM"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Done Editing</span>
          </button>
        </div>
      </aside>

      {/* Help Popover */}
      {showHelp && (
        <div className="fixed top-16 right-4 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#0b0f17] border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-xs space-y-2 pointer-events-auto">
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Inline Editor Guide
            </span>
            <button onClick={() => setShowHelp(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <p className="text-slate-300 leading-relaxed">
            • <strong>Editable Texts:</strong> Hover over any headline, tagline, quote, or blog title. A dashed cyan ring and an "Edit" badge will appear.
          </p>
          <p className="text-slate-300 leading-relaxed">
            • <strong>Editable Images:</strong> Click any banner, founder portrait, or preview image to change its URL or choose from high-res presets.
          </p>
          <p className="text-slate-300 leading-relaxed">
            • <strong>Instant Persistence:</strong> Changes are immediately written to the website content state and saved in your local session.
          </p>
        </div>
      )}
    </div>
  );
};
