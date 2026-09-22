import React, { useState } from 'react';
import { 
  Image, 
  Type, 
  FileText, 
  Building2, 
  Phone, 
  Check, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  Save, 
  Eye, 
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlogPost, ServiceItem, WebsiteContent } from '../../types';

export const WebsiteCmsEditor: React.FC = () => {
  const { 
    websiteContent, 
    updateWebsiteContent, 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost,
    services,
    updateService,
    navigateTo,
    showToast,
    setInlineEditorActive
  } = useApp();

  type CmsSubTab = 'images' | 'text' | 'founder' | 'about' | 'contact' | 'blog' | 'services';
  const [subTab, setSubTab] = useState<CmsSubTab>('images');

  // Form state for website content
  const [formData, setFormData] = useState<WebsiteContent>(websiteContent);
  const [isSaving, setIsSaving] = useState(false);

  // Blog Management State
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Web Development');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCoverImage, setBlogCoverImage] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceTitle, setServiceTitle] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');

  const handleSaveContent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updateWebsiteContent(formData);
      setIsSaving(false);
      showToast('CMS Updated', 'Website content and images saved successfully. Live site updated.', 'success');
    }, 200);
  };

  const handleOpenBlogCreate = () => {
    setEditingBlog(null);
    setBlogTitle('');
    setBlogCategory('Web Development');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogCoverImage('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80');
    setBlogReadTime('5 min read');
    setShowBlogModal(true);
  };

  const handleOpenBlogEdit = (post: BlogPost) => {
    setEditingBlog(post);
    setBlogTitle(post.title);
    setBlogCategory(post.category);
    setBlogExcerpt(post.excerpt);
    setBlogContent(post.content);
    setBlogCoverImage(post.coverImage);
    setBlogReadTime(post.readTime);
    setShowBlogModal(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogExcerpt.trim()) {
      showToast('Validation Error', 'Title and summary excerpt are required.', 'error');
      return;
    }

    if (editingBlog) {
      updateBlogPost(editingBlog.id, {
        title: blogTitle.trim(),
        category: blogCategory,
        excerpt: blogExcerpt.trim(),
        content: blogContent.trim() || editingBlog.content,
        coverImage: blogCoverImage.trim() || editingBlog.coverImage,
        readTime: blogReadTime.trim() || editingBlog.readTime
      });
      showToast('Article Updated', `"${blogTitle}" has been updated.`, 'success');
    } else {
      const slug = blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      addBlogPost({
        id: `post-${Date.now()}`,
        title: blogTitle.trim(),
        slug: slug || `article-${Date.now()}`,
        category: blogCategory,
        tags: [blogCategory, 'Enterprise', 'Growth'],
        excerpt: blogExcerpt.trim(),
        content: blogContent.trim() || `## ${blogTitle}\n\nComprehensive analysis by RSGeeker Media team on digital scale and performance engineering.`,
        coverImage: blogCoverImage.trim() || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
        publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: blogReadTime.trim() || '5 min read',
        author: {
          name: formData.founderName || 'Abhishek Singh',
          role: formData.founderRole || 'Founder & CEO',
          avatar: formData.founderImage || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
        }
      });
      showToast('Article Published', `"${blogTitle}" published to live blog.`, 'success');
    }

    setShowBlogModal(false);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      title: serviceTitle.trim(),
      startingPrice: servicePrice.trim(),
      description: serviceDesc.trim()
    });

    setEditingService(null);
    showToast('Service Updated', `"${serviceTitle}" service package updated.`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0b0f17] border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-white">Full CMS & Website Control Studio</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              Live Real-Time Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instantly customize all images, headlines, founder bio, statistics, blog posts, and service packages across RSGeeker Media.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSaveContent()}
          disabled={isSaving}
          className="self-start sm:self-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        >
          {isSaving ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Publishing Updates...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Publish All Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Inline Editor Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-cyan-950/40 to-blue-950/40 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
              <span>Interactive Front-End Inline Visual Editor</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Super Admin Feature
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Prefer clicking directly on the live website? Launch Inline Editor mode to click any text, blog title, or image on the site to edit and persist changes live.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setInlineEditorActive(true);
            navigateTo('home');
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch Front-End Inline Editor</span>
        </button>
      </div>

      {/* Sub-Navigation Switcher */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <button
          type="button"
          onClick={() => setSubTab('images')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'images'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Image className="w-3.5 h-3.5" />
          <span>Website Images</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('text')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'text'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Headlines & Stats</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('founder')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'founder'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Founder Abhishek Singh</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('about')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'about'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>About, Story & Mission</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('contact')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'contact'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Contact & Operations</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('blog')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'blog'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Blog Articles ({blogPosts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('services')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            subTab === 'services'
              ? 'bg-cyan-500 text-white shadow-sm shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Service Packages</span>
        </button>
      </div>

      {/* 1. WEBSITE IMAGES SUB-TAB */}
      {subTab === 'images' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-6">
            <h4 className="font-display text-base font-bold text-white">Visual Assets & Image Control</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Founder Photo */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">Founder Abhishek Singh Photo</label>
                  <span className="text-[10px] text-cyan-400">Home & About</span>
                </div>
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={formData.founderImage}
                    alt="Founder Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.founderImage}
                    onChange={(e) => setFormData({ ...formData, founderImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Direct image URL for Abhishek Singh's spotlight portrait.
                </p>
              </div>

              {/* About Showcase Image */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">About Page Team Showcase</label>
                  <span className="text-[10px] text-cyan-400">About Page</span>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={formData.aboutShowcaseImage}
                    alt="About Showcase Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.aboutShowcaseImage}
                    onChange={(e) => setFormData({ ...formData, aboutShowcaseImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Banner photograph showcased in the "Company Story & Evolution" section.
                </p>
              </div>

              {/* Hero Image */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">Global Hero & OG Share Image</label>
                  <span className="text-[10px] text-cyan-400">Social Cards</span>
                </div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={formData.heroImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.heroImage}
                    onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Banner featured for social sharing and open graph cards.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveContent()}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Images</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADLINES & STATS SUB-TAB */}
      {subTab === 'text' && (
        <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-6">
          <h4 className="font-display text-base font-bold text-white">Home Page Headlines & Metric Counters</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Title *</label>
              <textarea
                rows={2}
                value={formData.heroTitle}
                onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle *</label>
              <textarea
                rows={3}
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Pill Badge</label>
                <input
                  type="text"
                  value={formData.heroBadge}
                  onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Hero CTA Button Text</label>
                <input
                  type="text"
                  value={formData.heroCtaText}
                  onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
                Key Performance Metrics & Live Counters:
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">Deployments Value</label>
                  <input
                    type="text"
                    value={formData.statsClientsCount}
                    onChange={(e) => setFormData({ ...formData, statsClientsCount: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.statsClientsLabel}
                    onChange={(e) => setFormData({ ...formData, statsClientsLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">ROAS / Ad Spend</label>
                  <input
                    type="text"
                    value={formData.statsAdSpend}
                    onChange={(e) => setFormData({ ...formData, statsAdSpend: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.statsAdSpendLabel}
                    onChange={(e) => setFormData({ ...formData, statsAdSpendLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">Client Retention %</label>
                  <input
                    type="text"
                    value={formData.statsRetention}
                    onChange={(e) => setFormData({ ...formData, statsRetention: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.statsRetentionLabel}
                    onChange={(e) => setFormData({ ...formData, statsRetentionLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">IT Response SLA</label>
                  <input
                    type="text"
                    value={formData.statsUptime}
                    onChange={(e) => setFormData({ ...formData, statsUptime: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-bold text-sm"
                  />
                  <input
                    type="text"
                    value={formData.statsUptimeLabel}
                    onChange={(e) => setFormData({ ...formData, statsUptimeLabel: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveContent()}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Headlines & Stats</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FOUNDER ABHISHEK SINGH SUB-TAB */}
      {subTab === 'founder' && (
        <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={formData.founderImage}
              alt="Abhishek Singh"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-500/40"
            />
            <div>
              <h4 className="font-display text-base font-bold text-white">Founder Leadership Profile</h4>
              <p className="text-xs text-slate-400">Configure Abhishek Singh's executive story, biography, and credentials</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Founder Full Name</label>
              <input
                type="text"
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Title / Role</label>
              <input
                type="text"
                value={formData.founderRole}
                onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year Founded</label>
              <input
                type="text"
                value={formData.foundedYear}
                onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Founder Executive Quote (Home Page)</label>
            <textarea
              rows={3}
              value={formData.founderQuote}
              onChange={(e) => setFormData({ ...formData, founderQuote: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 italic"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Founder Detailed Biography</label>
            <textarea
              rows={4}
              value={formData.founderBio}
              onChange={(e) => setFormData({ ...formData, founderBio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => handleSaveContent()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Founder Information</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. ABOUT, STORY & MISSION SUB-TAB */}
      {subTab === 'about' && (
        <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-6">
          <h4 className="font-display text-base font-bold text-white">About Page Story, Mission & Vision</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">About Page Headline</label>
              <input
                type="text"
                value={formData.aboutTitle}
                onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Story Section Title</label>
              <input
                type="text"
                value={formData.aboutStoryTitle}
                onChange={(e) => setFormData({ ...formData, aboutStoryTitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">About Page Subtitle</label>
            <textarea
              rows={2}
              value={formData.aboutSubtitle}
              onChange={(e) => setFormData({ ...formData, aboutSubtitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Genesis & Evolution Story</label>
            <textarea
              rows={5}
              value={formData.aboutStoryContent}
              onChange={(e) => setFormData({ ...formData, aboutStoryContent: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">Our Mission</label>
              <input
                type="text"
                value={formData.missionTitle}
                onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
                placeholder="Mission Title..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-bold"
              />
              <textarea
                rows={3}
                value={formData.missionContent}
                onChange={(e) => setFormData({ ...formData, missionContent: e.target.value })}
                placeholder="Mission statement..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">Our Vision</label>
              <input
                type="text"
                value={formData.visionTitle}
                onChange={(e) => setFormData({ ...formData, visionTitle: e.target.value })}
                placeholder="Vision Title..."
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-bold"
              />
              <textarea
                rows={3}
                value={formData.visionContent}
                onChange={(e) => setFormData({ ...formData, visionContent: e.target.value })}
                placeholder="Vision statement..."
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => handleSaveContent()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save About & Mission</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. CONTACT & OPERATIONS SUB-TAB */}
      {subTab === 'contact' && (
        <div className="p-6 rounded-2xl bg-[#0b0f17] border border-slate-800 space-y-6">
          <h4 className="font-display text-base font-bold text-white">Contact Gateways, SLA & Footer</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Business</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Office Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Support Phone</label>
              <input
                type="text"
                value={formData.emergencySupport}
                onChange={(e) => setFormData({ ...formData, emergencySupport: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Operating Hours</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Tagline</label>
              <input
                type="text"
                value={formData.footerTagline}
                onChange={(e) => setFormData({ ...formData, footerTagline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Description Paragraph</label>
            <textarea
              rows={2}
              value={formData.footerDescription}
              onChange={(e) => setFormData({ ...formData, footerDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="button"
              onClick={() => handleSaveContent()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Contact & Footer</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. BLOG ARTICLES SUB-TAB */}
      {subTab === 'blog' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display text-base font-bold text-white">Technical Blog & Editorial Studio</h4>
              <p className="text-xs text-slate-400">Publish, modify, or remove articles from the RSGeeker Media blog</p>
            </div>
            <button
              type="button"
              onClick={handleOpenBlogCreate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Write New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-4 rounded-2xl bg-[#0b0f17] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-slate-950">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{post.readTime}</span>
                  </div>
                  <h5 className="font-display text-sm font-bold text-white mt-2 mb-1 line-clamp-2">{post.title}</h5>
                  <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">{post.publishedAt}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenBlogEdit(post)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                      title="Edit article"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete article "${post.title}"?`)) {
                          deleteBlogPost(post.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 transition-colors cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('blog-post', post.slug)}
                      className="text-cyan-400 hover:underline font-semibold ml-1"
                    >
                      View Live →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SERVICES SUB-TAB */}
      {subTab === 'services' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-display text-base font-bold text-white">Service Packages & Offering Details</h4>
            <p className="text-xs text-slate-400">Modify starting rates, titles, and descriptions of core services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div key={svc.id} className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      {svc.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {svc.startingPrice}
                    </span>
                  </div>
                  <h5 className="font-display text-base font-bold text-white mt-2 mb-1">{svc.title}</h5>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{svc.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {svc.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingService(svc);
                      setServiceTitle(svc.title);
                      setServicePrice(svc.startingPrice);
                      setServiceDesc(svc.description);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit Service</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOG CREATE / EDIT MODAL */}
      {showBlogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0f17] border border-cyan-500/30 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white">
              {editingBlog ? 'Edit Technical Article' : 'Create New Technical Article'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Headline *</label>
                <input
                  type="text"
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. Scaling Next.js to 10M Pageviews with Cloudflare"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="SEO">SEO</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="IT Strategy">IT Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={blogCoverImage}
                  onChange={(e) => setBlogCoverImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Concise overview for preview cards..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Article Markdown Content</label>
                <textarea
                  rows={6}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="## Section Heading\n\nDeep technical insights..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowBlogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {editingBlog ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE EDIT MODAL */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0f17] border border-cyan-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white">
              Edit Service: {editingService.title}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price Tag</label>
                <input
                  type="text"
                  required
                  value={servicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                  placeholder="e.g. From $3,500"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Description</label>
                <textarea
                  rows={3}
                  required
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
