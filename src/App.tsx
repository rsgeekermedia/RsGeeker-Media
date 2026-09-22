/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SEOHead } from './components/common/SEOHead';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { InlineEditorToolbar } from './components/inline-editor/InlineEditorToolbar';
import { InlineEditModal } from './components/inline-editor/InlineEditModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Pricing } from './pages/Pricing';
import { TechSupport } from './pages/TechSupport';
import { Portfolio } from './pages/Portfolio';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { BookConsultation } from './pages/BookConsultation';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage, theme, navigateTo } = useApp();

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Executive hotkey to navigate to Admin Portal (Ctrl+Shift+A or Cmd+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'service-detail':
        return <ServiceDetail />;
      case 'pricing':
        return <Pricing />;
      case 'tech-support':
        return <TechSupport />;
      case 'portfolio':
        return <Portfolio />;
      case 'blog':
        return <Blog />;
      case 'blog-post':
        return <BlogPost />;
      case 'contact':
        return <Contact />;
      case 'book-consultation':
        return <BookConsultation />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'terms':
        return <Terms />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Home />;
    }
  };

  return (
    <div 
      id="app-root-container"
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-white ${
        theme === 'light' 
          ? 'theme-light bg-[#f8fafc] text-slate-900' 
          : 'theme-dark bg-[#06080e] text-slate-100'
      }`}
    >
      <SEOHead />
      <Toast />
      <InlineEditorToolbar />
      <InlineEditModal />
      
      {/* Show Public Header on all pages except full Admin Console */}
      <Header />

      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Show Public Footer on all pages except Admin Console */}
      {currentPage !== 'admin' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
