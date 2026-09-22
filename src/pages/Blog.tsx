import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EditableElement } from '../components/inline-editor/EditableElement';

export const Blog: React.FC = () => {
  const { blogPosts, navigateTo, addLead, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categories = ['All', 'Digital Marketing', 'SEO', 'Web Development', 'Tech Support', 'IT Strategy'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    addLead({
      name: 'Newsletter Subscriber',
      email: newsletterEmail,
      phone: 'N/A',
      company: 'Newsletter Readership',
      serviceInterested: 'Newsletter & Tech Strategy Briefings',
      budget: 'N/A',
      message: 'Subscribed to RSGeeker Media Engineering Insights Newsletter.',
      source: 'Blog Newsletter Capture',
      status: 'New Lead',
      initialNote: 'Subscribed via blog archive newsletter banner.'
    });

    setSubscribed(true);
    showToast('Subscribed', 'You will receive our bi-weekly architectural briefs.', 'success');
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineering & Strategy CMS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Insights on Digital Growth, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Web Architecture & Enterprise IT
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Deep dives, technical frameworks, and operational lessons authored by Abhishek Singh and the RSGeeker Media team.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across topics (e.g. Next.js, SEO, HIPAA, CAPI)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 shadow-xl"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post Spotlight (if on All and no search) */}
      {selectedCategory === 'All' && searchQuery === '' && featuredPost && (
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
          <div
            onClick={() => navigateTo('blog-post', featuredPost.slug)}
            className="cursor-pointer group rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 shadow-2xl"
          >
            <div className="lg:col-span-7 aspect-video sm:h-80 w-full rounded-2xl overflow-hidden relative">
              <EditableElement
                target={{
                  id: `feat-blog-img-${featuredPost.id}`,
                  label: `Featured Article Cover (${featuredPost.title})`,
                  type: 'image',
                  currentValue: featuredPost.coverImage,
                  options: { blogId: featuredPost.id, property: 'coverImage' }
                }}
                className="w-full h-full block"
              >
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </EditableElement>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-cyan-300 border border-slate-700 pointer-events-none">
                Featured Insight
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
                <span>•</span>
                <span>{featuredPost.publishedAt}</span>
              </div>

              <EditableElement
                target={{
                  id: `feat-blog-title-${featuredPost.id}`,
                  label: `Featured Article Title (${featuredPost.title})`,
                  type: 'text',
                  currentValue: featuredPost.title,
                  options: { blogId: featuredPost.id, property: 'title' }
                }}
              >
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                  {featuredPost.title}
                </h2>
              </EditableElement>

              <EditableElement
                target={{
                  id: `feat-blog-excerpt-${featuredPost.id}`,
                  label: `Featured Article Excerpt (${featuredPost.title})`,
                  type: 'textarea',
                  currentValue: featuredPost.excerpt,
                  options: { blogId: featuredPost.id, property: 'excerpt' }
                }}
              >
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </EditableElement>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{featuredPost.author.name}</div>
                    <div className="text-[10px] text-slate-400">{featuredPost.author.role}</div>
                  </div>
                </div>

                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Articles */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog-post', post.slug)}
              className="cursor-pointer group rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <EditableElement
                  target={{
                    id: `post-img-${post.id}`,
                    label: `Article Cover Image (${post.title})`,
                    type: 'image',
                    currentValue: post.coverImage,
                    options: { blogId: post.id, property: 'coverImage' }
                  }}
                  className="aspect-video w-full overflow-hidden relative block"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-slate-700 pointer-events-none">
                    {post.category}
                  </div>
                </EditableElement>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span>{post.publishedAt}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <EditableElement
                    target={{
                      id: `post-title-${post.id}`,
                      label: `Article Title (${post.title})`,
                      type: 'text',
                      currentValue: post.title,
                      options: { blogId: post.id, property: 'title' }
                    }}
                  >
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </EditableElement>

                  <EditableElement
                    target={{
                      id: `post-excerpt-${post.id}`,
                      label: `Article Excerpt (${post.title})`,
                      type: 'textarea',
                      currentValue: post.excerpt,
                      options: { blogId: post.id, property: 'excerpt' }
                    }}
                  >
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </EditableElement>

                  <div className="flex flex-wrap gap-1 mt-4">
                    {post.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">By {post.author.name}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Subscription Box */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0b0f17] to-cyan-950/40 border border-slate-800 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 flex items-center justify-center mx-auto">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            Get Technical Briefings from Abhishek Singh
          </h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
            Join 3,400+ founders, CMOs, and CTOs receiving our bi-weekly breakdowns on organic search algorithms, server performance, and IT resilience.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs font-semibold max-w-sm mx-auto">
              ✓ Subscribed! You will receive our next briefing on Tuesday.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2 pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter work email..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all shrink-0"
              >
                Join Newsletter
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};
