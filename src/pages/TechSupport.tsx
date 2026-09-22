import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Phone, 
  Send, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Wifi, 
  Laptop, 
  Mail, 
  Globe, 
  Cpu, 
  HelpCircle,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TicketPriority, SupportTicket } from '../types';

export const TechSupport: React.FC = () => {
  const { createTicket, tickets, addTicketMessage, showToast, websiteContent } = useApp();

  // Active tab: Create Ticket vs Track Ticket
  const [activeTab, setActiveTab] = useState<'create' | 'track'>('create');

  // Ticket Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('Remote Support');
  const [priority, setPriority] = useState<TicketPriority>('High');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [createdTicketResult, setCreatedTicketResult] = useState<SupportTicket | null>(null);

  // Ticket Tracking state
  const [searchTicketId, setSearchTicketId] = useState('TICK-1042');
  const [trackedTicket, setTrackedTicket] = useState<SupportTicket | null>(() => {
    return tickets.find(t => t.id === 'TICK-1042') || tickets[0] || null;
  });
  const [replyMessage, setReplyMessage] = useState('');

  const itServices = [
    { title: 'Remote Support', icon: Laptop, desc: 'Instant remote desktop assistance to diagnose and repair software anomalies, driver bugs, and workstation hangs.' },
    { title: 'Computer Repair Guidance', icon: Cpu, desc: 'Hardware diagnosis, SSD upgrades, thermal profiling, and component failure troubleshooting.' },
    { title: 'Network Troubleshooting', icon: Wifi, desc: 'WiFi dead-zone elimination, VPN tunnel latency audits, router QoS setup, and packet drop fixes.' },
    { title: 'Software Issues', icon: AlertTriangle, desc: 'Application crashes, OS patch rollback, license key recoveries, and enterprise SaaS conflicts.' },
    { title: 'Email Configuration', icon: Mail, desc: 'Microsoft 365, Google Workspace, DKIM/DMARC/SPF DNS validation, and mailbox migrations.' },
    { title: 'Website Issues', icon: Globe, desc: 'DNS outages, SSL certificate renewals, database timeout recovery, and Cloudflare CDN fixes.' },
    { title: 'Business IT Consulting', icon: ShieldCheck, desc: 'Security audits, disaster recovery backups, remote employee device provisioning, and SOC2 prep.' }
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !description) {
      showToast('Missing Fields', 'Please complete all required ticket fields.', 'warning');
      return;
    }

    const newTicket = createTicket({
      clientName: name,
      clientEmail: email,
      clientPhone: phone || 'N/A',
      company: company || 'Private Client',
      category,
      priority,
      subject,
      description
    });

    setCreatedTicketResult(newTicket);
    setSearchTicketId(newTicket.id);
    setTrackedTicket(newTicket);
    showToast('Support Ticket Created', `Ticket ${newTicket.id} logged with ${priority} priority.`, 'success');
  };

  const handleSearchTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchTicketId.trim().toUpperCase();
    const match = tickets.find(t => t.id.toUpperCase() === cleanId);
    if (match) {
      setTrackedTicket(match);
      showToast('Ticket Found', `Loaded record for ${match.id}`, 'info');
    } else {
      showToast('Not Found', `No ticket found with ID ${searchTicketId}. Check the reference number.`, 'error');
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !trackedTicket) return;

    addTicketMessage(
      trackedTicket.id,
      replyMessage,
      'client',
      trackedTicket.clientName
    );

    // Refresh tracked ticket view
    const updated = tickets.find(t => t.id === trackedTicket.id);
    if (updated) {
      setTrackedTicket(updated);
    }

    setReplyMessage('');
    showToast('Message Sent', 'Reply appended to support ticket thread.', 'success');
  };

  const priorityColors = {
    Low: 'bg-slate-800 text-slate-300 border-slate-700',
    Medium: 'bg-blue-950 text-blue-300 border-blue-800',
    High: 'bg-amber-950 text-amber-300 border-amber-800',
    Critical: 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse'
  };

  const statusColors = {
    Open: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
    'In Progress': 'bg-cyan-950/80 text-cyan-400 border-cyan-800/80',
    Pending: 'bg-purple-950/80 text-purple-400 border-purple-800/80',
    Resolved: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
    Closed: 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <div className="pt-24 lg:pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-semibold mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>24/7 Managed IT Helpdesk Operations</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Rapid Technical Support & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            Enterprise Helpdesk Services
          </span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Submit support tickets, track resolution status in real-time, or request urgent remote troubleshooting from certified systems engineers.
        </p>

        {/* Emergency Info Bar */}
        <div className="mt-8 max-w-xl mx-auto p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs px-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Emergency IT Hotline:</span>
            <span className="font-bold text-white">{websiteContent.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>15-Min Response SLA</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
        <h2 className="font-display text-xl font-bold text-white mb-6">
          Practice Capabilities & Support Scope
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {itServices.map((srv, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="p-5 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group cursor-default"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-800 group-hover:bg-cyan-950/60 group-hover:border group-hover:border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 mb-3 transition-all duration-300">
                <srv.icon className="w-4 h-4" />
              </div>
              <h3 className="font-display text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">{srv.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Interactive Ticket Section */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        
        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Create New Support Ticket
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Track Existing Ticket Status
          </button>
        </div>

        {activeTab === 'create' ? (
          /* CREATE TICKET FORM */
          <div className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl">
            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold text-white">
                Submit an IT Support Request
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Our support engineers will triage your issue immediately based on the selected priority level.
              </p>
            </div>

            {createdTicketResult ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">
                      Ticket {createdTicketResult.id} Created!
                    </h4>
                    <p className="text-xs text-slate-300">
                      Assigned to {createdTicketResult.assignedEngineer}. Our team has been notified.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subject:</span>
                    <span className="text-white font-medium">{createdTicketResult.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Priority:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityColors[createdTicketResult.priority]}`}>
                      {createdTicketResult.priority}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-amber-400 font-bold">{createdTicketResult.status}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setSearchTicketId(createdTicketResult.id);
                      setTrackedTicket(createdTicketResult);
                    }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
                  >
                    View Live Tracking Thread →
                  </button>
                  <button
                    onClick={() => {
                      setCreatedTicketResult(null);
                      setSubject('');
                      setDescription('');
                    }}
                    className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                  >
                    Create Another Ticket
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Hassel"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="david@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Callback Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Hassel Medical Systems"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Issue Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Remote Support">Remote Support</option>
                      <option value="Computer Repair Guidance">Computer Repair Guidance</option>
                      <option value="Network Troubleshooting">Network Troubleshooting</option>
                      <option value="Software Issues">Software Issues</option>
                      <option value="Email Configuration">Email Configuration (M365 / Workspace)</option>
                      <option value="Website Issues">Website Issues & Outages</option>
                      <option value="Business IT Consulting">Business IT Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Priority Level *</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['Low', 'Medium', 'High', 'Critical'] as TicketPriority[]).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`py-2 px-1 text-center rounded-lg text-[11px] font-bold border transition-all ${
                            priority === p
                              ? priorityColors[p]
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject / Summary *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of the issue (e.g. WiFi connection drops in conference room)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description of Problem *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide error codes, affected devices, operating system (Windows/macOS), and steps to reproduce..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:opacity-90 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket to 24/7 Operations</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* TICKET TRACKER & CHAT */
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Search Bar */}
            <div className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl">
              <form onSubmit={handleSearchTicket} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchTicketId}
                    onChange={(e) => setSearchTicketId(e.target.value)}
                    placeholder="Enter Ticket ID (e.g. TICK-1042)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white uppercase font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
                >
                  Lookup Ticket
                </button>
              </form>

              {/* Quick sample chips */}
              <div className="flex items-center gap-2 pt-3 text-[11px] text-slate-400">
                <span>Recent active sample tickets:</span>
                {tickets.slice(0, 3).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSearchTicketId(t.id);
                      setTrackedTicket(t);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono hover:bg-slate-700"
                  >
                    {t.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Ticket Details Card */}
            {trackedTicket ? (
              <div className="p-8 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {trackedTicket.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[trackedTicket.status]}`}>
                        {trackedTicket.status}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityColors[trackedTicket.priority]}`}>
                        {trackedTicket.priority} Priority
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {trackedTicket.subject}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-400">
                    <div>Opened: <span className="text-slate-300">{trackedTicket.createdAt}</span></div>
                    <div>Engineer: <span className="text-cyan-300 font-medium">{trackedTicket.assignedEngineer || 'Unassigned'}</span></div>
                  </div>
                </div>

                {/* Initial Description */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="font-semibold text-slate-400 block mb-1">Initial Problem Statement:</span>
                  <p className="text-slate-200 leading-relaxed">{trackedTicket.description}</p>
                </div>

                {/* Message Thread */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Engineer Communication History ({trackedTicket.messages.length})
                  </h4>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                    {trackedTicket.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl text-xs space-y-1 ${
                          msg.sender === 'staff'
                            ? 'bg-cyan-950/40 border border-cyan-800/50 text-cyan-100 ml-4'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span className={msg.sender === 'staff' ? 'text-cyan-300' : 'text-slate-300'}>
                            {msg.senderName}
                          </span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="leading-relaxed">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type an update or follow-up note for the engineer..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </form>

              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Please search for a ticket ID above.
              </div>
            )}

          </div>
        )}

      </section>

    </div>
  );
};
