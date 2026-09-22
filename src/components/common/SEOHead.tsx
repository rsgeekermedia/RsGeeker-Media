import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';

export const SEOHead: React.FC = () => {
  const { currentPage, selectedServiceSlug, selectedBlogSlug, services, blogPosts, seoSettings } = useApp();

  useEffect(() => {
    let title = seoSettings.metaTitle;
    let description = seoSettings.metaDescription;

    if (currentPage === 'about') {
      title = 'About Us – Founded by Abhishek Singh | RSGeeker Media';
      description = 'Discover how RSGeeker Media evolved from an elite technology consultancy founded by Abhishek Singh into a global digital growth and IT powerhouse.';
    } else if (currentPage === 'services') {
      title = 'Services – Digital Marketing, Web Development & IT Support | RSGeeker Media';
      description = 'Explore our enterprise capabilities: SEO, Google & Meta Ads, Next.js web development, e-commerce, and 24/7 managed IT tech support.';
    } else if (currentPage === 'service-detail' && selectedServiceSlug) {
      const s = services.find(item => item.slug === selectedServiceSlug);
      if (s) {
        title = `${s.title} – Enterprise Solutions | RSGeeker Media`;
        description = s.description.slice(0, 155);
      }
    } else if (currentPage === 'pricing') {
      title = 'Pricing & Retainers – Transparent Growth Packages | RSGeeker Media';
      description = 'View transparent Starter, Growth, and Enterprise marketing and tech support packages with monthly and annual discounts.';
    } else if (currentPage === 'tech-support') {
      title = '24/7 Tech Support & Helpdesk Portal | RSGeeker Media';
      description = 'Submit support tickets, track active IT queries, and get remote computer repair, network troubleshooting, and cloud IT assistance.';
    } else if (currentPage === 'portfolio') {
      title = 'Portfolio & Case Studies – Verified Client ROI | RSGeeker Media';
      description = 'Explore verified case studies showcasing +310% traffic increases, 4.8x ROAS advertising funnels, and enterprise web platform launches.';
    } else if (currentPage === 'blog') {
      title = 'Engineering & Growth Insights Blog | RSGeeker Media';
      description = 'Actionable insights on B2B performance marketing, Google & Meta ads optimization, Next.js architectures, and remote IT best practices.';
    } else if (currentPage === 'blog-post' && selectedBlogSlug) {
      const p = blogPosts.find(item => item.slug === selectedBlogSlug);
      if (p) {
        title = `${p.title} | RSGeeker Media`;
        description = p.excerpt.slice(0, 155);
      }
    } else if (currentPage === 'contact') {
      title = 'Contact Us – San Francisco & Global Delivery | RSGeeker Media';
      description = 'Get in touch with RSGeeker Media via Phone, WhatsApp, Email or form. Headquartered in San Francisco with 24/7 IT emergency lines.';
    } else if (currentPage === 'book-consultation') {
      title = 'Book a Strategic Consultation | RSGeeker Media';
      description = 'Schedule a 1-on-1 strategy call with Abhishek Singh or a senior technical lead via Google Meet or Microsoft Teams.';
    } else if (currentPage === 'privacy-policy') {
      title = 'Privacy Policy | RSGeeker Media';
      description = 'Our commitment to data privacy, GDPR compliance, cookie policies, and transparent client information management.';
    } else if (currentPage === 'terms') {
      title = 'Terms & Conditions | RSGeeker Media';
      description = 'Enterprise service agreements, delivery terms, confidentiality, and support SLAs of RSGeeker Media.';
    } else if (currentPage === 'admin') {
      title = 'Enterprise CRM & Admin Dashboard | RSGeeker Media';
      description = 'Restricted administrative console for pipeline management, analytics, customer mini-CRM, and CMS control.';
    }

    document.title = title;

    // Update Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', description);
    }

    // Update Open Graph tags
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', title);
    }
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', description);
    }
  }, [currentPage, selectedServiceSlug, selectedBlogSlug, services, blogPosts, seoSettings]);

  return null;
};
