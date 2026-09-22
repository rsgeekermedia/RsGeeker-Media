import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PrivacyPolicy: React.FC = () => {
  const { websiteContent } = useApp();

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-10 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal & Compliance</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: January 1, 2026 • Last Updated: March 2026
        </p>

        <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6 pt-8 border-t border-slate-800 mt-8">
          <p>
            At <strong>RSGeeker Media</strong> (founded by Abhishek Singh), we are committed to safeguarding the data privacy of our clients, website visitors, and enterprise partners. This Privacy Policy details how we collect, process, store, and protect personal and corporate information.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect information provided directly through inquiry forms, consultation bookings, tech support tickets, and service agreements. This includes names, corporate email addresses, telephone numbers, company domains, and technical system specifications.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            2. First-Party Telemetry & Analytics
          </h2>
          <p>
            We adhere to privacy-first analytics principles. Any tracking technologies implemented across our digital properties prioritize server-side Meta Conversions API (CAPI) and Google Tag Manager Server-Side containers, preventing third-party snooping and unauthorized cross-domain tracking.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            3. HIPAA & SOC2 Compliant Data Handling
          </h2>
          <p>
            For clients in healthcare, clinical diagnostics, and financial services, any support tickets, credentials, or network logs submitted are handled in accordance with strict access controls, encryption at rest (AES-256), and encryption in transit (TLS 1.3).
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            4. Data Retention & Erasure
          </h2>
          <p>
            Client project data and lead submissions are retained only as long as necessary to fulfill operational scopes or comply with statutory requirements. Clients may request an immutable erasure of their records at any time by contacting our Data Protection Officer at <a href={`mailto:${websiteContent.email}`} className="text-cyan-400 hover:underline">{websiteContent.email}</a>.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            5. Contact Information
          </h2>
          <p>
            If you have inquiries concerning this policy or our data safeguarding practices, please contact:<br />
            <strong>RSGeeker Media Legal & Compliance</strong><br />
            Email: {websiteContent.email}<br />
            Phone: {websiteContent.phone}<br />
            Address: {websiteContent.address}
          </p>
        </div>
      </section>
    </div>
  );
};
