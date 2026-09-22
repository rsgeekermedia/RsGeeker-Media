import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  Type, 
  ExternalLink,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const InlineEditModal: React.FC = () => {
  const { activeInlineField, closeInlineEditor, saveInlineFieldValue } = useApp();

  const [value, setValue] = useState('');
  const [imagePreviewError, setImagePreviewError] = useState(false);

  useEffect(() => {
    if (activeInlineField) {
      setValue(activeInlineField.currentValue || '');
      setImagePreviewError(false);
    }
  }, [activeInlineField]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeInlineEditor();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeInlineEditor]);

  if (!activeInlineField) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveInlineFieldValue(activeInlineField, value.trim());
  };

  const isImage = activeInlineField.type === 'image';
  const isLongText = activeInlineField.type === 'textarea' || (value && value.length > 90);

  // Suggested enterprise stock images for quick replacement
  const imagePresets = [
    { label: 'Executive Founder', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80' },
    { label: 'Cloud Architecture & IT', url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80' },
    { label: 'Growth Metrics & Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80' },
    { label: 'Engineering Command Center', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80' },
    { label: 'Modern Digital Agency Office', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80' },
    { label: 'Cybersecurity Network Grid', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0b0f17] border border-cyan-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl shadow-cyan-500/20 text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inline-editor-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              {isImage ? <ImageIcon className="w-4 h-4" /> : <Type className="w-4 h-4" />}
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider block">
                Inline Visual Editor
              </span>
              <h3 id="inline-editor-title" className="font-display text-base font-bold text-white">
                Edit {activeInlineField.label}
              </h3>
            </div>
          </div>

          <button
            onClick={closeInlineEditor}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close editor (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* IMAGE EDITING UI */}
          {isImage ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Image Source URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setImagePreviewError(false);
                    }}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Image Preview Box */}
              <div>
                <span className="block text-xs font-semibold text-slate-300 mb-1.5">Live Preview</span>
                <div className="w-full h-44 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden flex items-center justify-center relative group">
                  {value && !imagePreviewError ? (
                    <img 
                      src={value} 
                      alt="Preview" 
                      onError={() => setImagePreviewError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 text-xs text-slate-500">
                      <ImageIcon className="w-8 h-8 mx-auto text-slate-600 mb-1" />
                      <span>{imagePreviewError ? 'Image failed to load. Please verify URL.' : 'Enter an image URL above to preview'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Image Suggestions */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">
                  Quick High-Resolution Presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {imagePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setValue(preset.url);
                        setImagePreviewError(false);
                      }}
                      className="text-left p-2 rounded-lg bg-slate-900 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/30 text-[11px] text-slate-300 hover:text-cyan-300 transition-all truncate"
                      title={preset.url}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* TEXT / TEXTAREA EDITING UI */
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-300">
                  Content Field
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {value.length} characters
                </span>
              </div>

              {isLongText ? (
                <textarea
                  rows={5}
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Enter ${activeInlineField.label.toLowerCase()}...`}
                  className="w-full px-3.5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400 resize-none"
                  autoFocus
                />
              ) : (
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={`Enter ${activeInlineField.label.toLowerCase()}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
              )}

              {/* Target info notice */}
              <p className="text-[11px] text-slate-500 italic">
                Changes will persist directly to the site state and be reflected across all visitors immediately.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeInlineEditor}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply Live</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
