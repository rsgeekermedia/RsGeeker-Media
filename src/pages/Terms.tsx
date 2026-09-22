import React from 'react';
import { FileText, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Terms: React.FC = () => {
  const { websiteContent } = useApp();

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-10 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold mb-4">
          <FileText className="w-3.5 h-3.5" />
          <span>Operational Governance</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: January 1, 2026 • Governed by RSGeeker Media Master Services Agreement
        </p>

        <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-6 pt-8 border-t border-slate-800 mt-8">
          <p>
            These Terms & Conditions constitute a legally binding agreement between you (or the legal entity you represent) and <strong>RSGeeker Media</strong>, founded by Abhishek Singh. By accessing our platform, booking consultations, submitting support tickets, or engaging our digital marketing or IT services, you agree to comply with these terms.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            1. Scope of Digital & IT Services
          </h2>
          <p>
            RSGeeker Media delivers professional services encompassing search engine optimization (SEO), paid performance marketing, custom headless website engineering, and 24/7 managed IT support. All deliverables, timelines, and payment structures are defined either in approved online scopes or individual Statements of Work (SOW).
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            2. Service Level Agreements (SLAs) for Managed IT
          </h2>
          <p>
            Emergency IT support tickets marked with "Critical" priority are subject to our 15-minute acknowledgment and initial response commitment. While we employ certified systems engineers to resolve hardware, network, and cloud software anomalies rapidly, resolution timelines may vary depending on upstream cloud provider outages (e.g., AWS, Microsoft 365, Cloudflare).
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            3. Client Intellectual Property & Source Code Ownership
          </h2>
          <p>
            Upon settlement of all contracted engineering invoices, all proprietary source code, Next.js repositories, bespoke designs, and custom digital marketing assets developed exclusively for the client shall transfer to the client's sole ownership.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            4. Retainer Terms & Cancellation
          </h2>
          <p>
            Monthly retainer plans (Starter, Growth, Enterprise) operate on 30-day recurring terms with a 30-day written cancellation notice required prior to the next billing cycle. Annual retainer commitments benefit from agreed discounts and are non-refundable once engineering allocations are provisioned.
          </p>

          <h2 className="font-display text-lg font-bold text-white mt-6 mb-2">
            5. Governing Law & Dispute Resolution
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable enterprise commercial jurisdiction. Any unresolved dispute arising out of or in connection with this agreement shall first undergo executive conciliation with Founder Abhishek Singh before formal mediation.
          </p>
        </div>
      </section>
    </div>
  );
};
