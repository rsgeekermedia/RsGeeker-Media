import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Check, 
  Bookmark, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditableElement } from '../components/inline-editor/EditableElement';

export const BlogPost: React.FC = () => {
  const { selectedBlogSlug, blogPosts, navigateTo, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find(p => p.slug === selectedBlogSlug) || blogPosts[0];
  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Link Copied', 'Article link copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <button
          onClick={() => navigateTo('blog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full font-bold bg-cyan-950/80 border border-cyan-800/60 text-cyan-300">
              {post.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedAt}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <EditableElement
            target={{
              id: `detail-blog-title-${post.id}`,
              label: `Article Title (${post.title})`,
              type: 'text',
              currentValue: post.title,
              options: { blogId: post.id, property: 'title' }
            }}
          >
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </EditableElement>

          <EditableElement
            target={{
              id: `detail-blog-excerpt-${post.id}`,
              label: `Article Excerpt (${post.title})`,
              type: 'textarea',
              currentValue: post.excerpt,
              options: { blogId: post.id, property: 'excerpt' }
            }}
          >
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {post.excerpt}
            </p>
          </EditableElement>

          {/* Author Strip & Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-cyan-500/50"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{post.author.name}</h4>
                <p className="text-xs text-slate-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URL' : 'Share Article'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="my-8 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl aspect-video max-h-[450px] w-full">
          <EditableElement
            target={{
              id: `detail-blog-img-${post.id}`,
              label: `Article Cover Image (${post.title})`,
              type: 'image',
              currentValue: post.coverImage,
              options: { blogId: post.id, property: 'coverImage' }
            }}
            className="w-full h-full block"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </EditableElement>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6 pt-4">
          <p className="text-slate-200 text-lg leading-relaxed font-normal">
            Modern high-growth enterprises often stumble not from lack of ambition, but from fragmentation across their technological and marketing stacks.
          </p>

          <p>
            When an organization scales its marketing campaigns to drive millions of visitors, legacy monoliths choke. Slow load times trigger Google's Core Web Vitals penalties, increasing ad acquisition costs by up to 40%. At the same time, fragmented IT configurations leave remote employees vulnerable to security breaches.
          </p>

          <div className="p-6 rounded-2xl bg-slate-900 border-l-4 border-cyan-400 my-8 space-y-2">
            <h4 className="font-display text-base font-bold text-white">The RSGeeker Media Core Principle:</h4>
            <p className="text-xs sm:text-sm text-slate-300 italic">
              "Never treat marketing acquisition and cloud infrastructure as separate entities. If your infrastructure cannot handle 10x traffic surges with sub-second latency, your ad spend is fundamentally inefficient."
            </p>
          </div>

          <h2 className="font-display text-2xl font-bold text-white tracking-tight mt-8 mb-4">
            Key Architectural Shifts To Adopt
          </h2>

          <p>
            To build a resilient enterprise platform, leaders must execute three foundational upgrades:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
            <li>
              <strong className="text-white">Implement First-Party Server-Side CAPI:</strong> Browser cookie deprecation makes client-side pixels unreliable. First-party Conversions API (CAPI) bridges this gap with 95%+ attribution accuracy.
            </li>
            <li>
              <strong className="text-white">Adopt Next.js React Server Components:</strong> Decouple heavyweight frontend interactions from static marketing pages to guarantee sub-800ms Time to First Byte (TTFB).
            </li>
            <li>
              <strong className="text-white">Enforce Zero-Trust Remote Workstation Profiles:</strong> Prevent credential stuffing and session hijacking with hardware-backed WebAuthn keys and WireGuard tunnel policies.
            </li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-white tracking-tight mt-8 mb-4">
            Summary & Strategic Takeaways
          </h2>

          <p>
            By consolidating technical speed, verifiable search intent, and managed IT uptime into a single unified discipline, high-growth organizations capture superior market share while minimizing total operational overhead.
          </p>
        </div>

        {/* In-Article Conversion Card */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/40 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between shadow-2xl">
          <div className="max-w-md space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Implementation Advisory</span>
            <h3 className="font-display text-xl font-bold text-white">
              Want RSGeeker Media to Audit Your Stack?
            </h3>
            <p className="text-xs text-slate-400">
              Schedule a 30-minute discovery call directly with Abhishek Singh and our practice architects.
            </p>
          </div>
          <button
            onClick={() => navigateTo('book-consultation')}
            className="mt-4 sm:mt-0 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Author Bio Box */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-2xl object-cover border border-cyan-500/40 shrink-0"
          />
          <div className="text-center sm:text-left">
            <h4 className="font-display text-sm font-bold text-white">About {post.author.name}</h4>
            <p className="text-xs text-cyan-400 font-medium mb-1">{post.author.role}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Abhishek founded RSGeeker Media to eliminate the barrier between enterprise digital acquisition and technical cloud engineering. He advises fast-scaling brands across fintech, healthcare, and e-commerce.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <h3 className="font-display text-xl font-bold text-white mb-6">
            Related Architectural Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  navigateTo('blog-post', rel.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer group p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="text-[10px] text-cyan-400 font-bold mb-1">{rel.category}</div>
                <h4 className="font-display text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <div className="text-[10px] text-slate-500 mt-2">{rel.readTime}</div>
              </div>
            ))}
          </div>
        </div>

      </article>

    </div>
  );
};
