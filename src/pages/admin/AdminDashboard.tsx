import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  TicketCheck, 
  Calendar, 
  FileText, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Send,
  Sparkles,
  DollarSign,
  ShieldCheck,
  Eye,
  EyeOff,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Lock,
  Unlock,
  KeyRound,
  Shield,
  LogOut,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  LeadStage, 
  TicketPriority, 
  TicketStatus, 
  Lead, 
  SupportTicket, 
  Customer, 
  Appointment, 
  BlogPost,
  AdminRole,
  AdminUser,
  AdminPermissions
} from '../../types';
import { initialAdminUsers } from '../../data/initialData';
import { UserManagementTab } from './UserManagementTab';
import { WebsiteCmsEditor } from './WebsiteCmsEditor';

export const AdminDashboard: React.FC = () => {
  const { 
    leads, 
    updateLeadStatus, 
    addLeadNote, 
    customers, 
    tickets, 
    updateTicketStatus, 
    addTicketMessage, 
    appointments, 
    updateAppointmentStatus, 
    blogPosts, 
    addBlogPost, 
    pricingPlans, 
    updatePricingPlan, 
    websiteContent, 
    updateWebsiteContent, 
    navigateTo, 
    showToast,
    isAdminLoggedIn,
    adminUsers,
    currentAdminUser,
    crmPassword,
    loginWithPassword,
    loginWithCredentials,
    logoutAdmin,
    updateCrmPassword,
    switchRole,
    theme,
    toggleTheme,
    isInlineEditorActive,
    setInlineEditorActive
  } = useApp();

  type AdminTabType = 'analytics' | 'leads' | 'customers' | 'tickets' | 'appointments' | 'cms' | 'pricing' | 'users' | 'settings';
  const [activeTab, setActiveTab] = useState<AdminTabType>('analytics');

  const isSuperAdmin = currentAdminUser.isSuperAdmin || currentAdminUser.username?.toLowerCase() === 'admingeeker';

  const canAccess = (permKey: keyof AdminPermissions): boolean => {
    if (isSuperAdmin) return true;
    return !!currentAdminUser.permissions?.[permKey];
  };

  const navTabs: { id: AdminTabType; label: string; icon: any; allowed: boolean }[] = [
    { id: 'analytics', label: 'Telemetry & Analytics', icon: TrendingUp, allowed: canAccess('canAccessOverview') },
    { id: 'leads', label: `CRM Leads (${leads.length})`, icon: Users, allowed: canAccess('canAccessLeads') },
    { id: 'customers', label: `Clients (${customers.length})`, icon: UserCheck, allowed: canAccess('canAccessCustomers') },
    { id: 'tickets', label: `Support Desk (${tickets.length})`, icon: TicketCheck, allowed: canAccess('canAccessTickets') },
    { id: 'appointments', label: `Appointments (${appointments.length})`, icon: Calendar, allowed: canAccess('canAccessAppointments') },
    { id: 'cms', label: 'Website CMS & Studio', icon: FileText, allowed: canAccess('canAccessWebsiteContent') || canAccess('canAccessBlog') },
    { id: 'pricing', label: 'Retainer Pricing', icon: DollarSign, allowed: canAccess('canAccessServices') },
    { id: 'users', label: `Staff & Roles (${adminUsers.length})`, icon: ShieldCheck, allowed: isSuperAdmin || canAccess('canManageUsers') },
    { id: 'settings', label: 'Security & Site Settings', icon: Settings, allowed: isSuperAdmin }
  ];

  const visibleTabs = navTabs.filter(t => t.allowed);

  useEffect(() => {
    if (visibleTabs.length > 0 && !visibleTabs.some(t => t.id === activeTab)) {
      setActiveTab(visibleTabs[0].id);
    }
  }, [currentAdminUser.id, activeTab]);

  // Authentication states
  const [usernameInput, setUsernameInput] = useState('AdminGeeker');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Settings: Change Passcode State
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);

  // Leads filter & search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState('');

  // Ticket reply & manager
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [ticketReply, setTicketReply] = useState('');

  // Site Settings Form
  const [settingsForm, setSettingsForm] = useState(websiteContent);

  // Analytics Data
  const trafficData = [
    { month: 'Oct', visits: 42000, leads: 180, revenue: 94000 },
    { month: 'Nov', visits: 49000, leads: 220, revenue: 112000 },
    { month: 'Dec', visits: 54000, leads: 260, revenue: 135000 },
    { month: 'Jan', visits: 68000, leads: 310, revenue: 168000 },
    { month: 'Feb', visits: 82000, leads: 390, revenue: 195000 },
    { month: 'Mar', visits: 98000, leads: 470, revenue: 234000 },
  ];

  const serviceDistribution = [
    { name: 'SEO & Search', value: 38, color: '#06b6d4' },
    { name: 'Paid Ads (Meta/Google)', value: 28, color: '#3b82f6' },
    { name: 'Next.js Web Dev', value: 20, color: '#6366f1' },
    { name: 'Managed IT & Security', value: 14, color: '#10b981' }
  ];

  const leadPipelineSummary = [
    { status: 'New Lead', count: leads.filter(l => l.status === 'New Lead').length, color: '#38bdf8' },
    { status: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: '#818cf8' },
    { status: 'Proposal Sent', count: leads.filter(l => l.status === 'Proposal Sent').length, color: '#c084fc' },
    { status: 'Qualified', count: leads.filter(l => l.status === 'Qualified').length, color: '#34d399' },
    { status: 'Won', count: leads.filter(l => l.status === 'Won').length, color: '#10b981' },
    { status: 'Lost', count: leads.filter(l => l.status === 'Lost').length, color: '#94a3b8' }
  ];

  // Lead handling
  const filteredLeads = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.company.toLowerCase().includes(leadSearch.toLowerCase());
    const matchStatus = leadStatusFilter === 'All' || l.status === leadStatusFilter;
    return matchSearch && matchStatus;
  });

  const handleAddNoteToLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !leadNoteInput.trim()) return;
    addLeadNote(selectedLead.id, leadNoteInput.trim());
    setLeadNoteInput('');
    const updated = leads.find(l => l.id === selectedLead.id);
    if (updated) setSelectedLead(updated);
    showToast('Note Added', 'Internal CRM note logged successfully.', 'info');
  };

  const handleExportLeads = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Date'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.company}"`,
      `"${l.serviceInterested}"`,
      `"${l.budget}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rsgeeker_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported', 'Leads exported to CSV format.', 'success');
  };

  const handleTicketStaffReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !ticketReply.trim()) return;

    addTicketMessage(
      selectedTicket.id,
      ticketReply.trim(),
      'staff',
      'Senior Systems Engineer (Staff)'
    );

    setTicketReply('');
    const updated = tickets.find(t => t.id === selectedTicket.id);
    if (updated) setSelectedTicket(updated);
    showToast('Response Logged', 'Staff reply dispatched to client portal.', 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteContent(settingsForm);
    showToast('Settings Saved', 'Global site metadata and contact channels updated.', 'success');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      setLoginError('Please enter your username.');
      return;
    }
    if (!passwordInput.trim()) {
      setLoginError('Please enter your executive password.');
      return;
    }
    setLoginError('');
    setIsAuthenticating(true);
    setTimeout(() => {
      const ok = loginWithCredentials(usernameInput.trim(), passwordInput.trim());
      if (!ok) {
        setLoginError('Access denied: Invalid username or password.');
      } else {
        setPasswordInput('');
        setLoginError('');
      }
      setIsAuthenticating(false);
    }, 250);
  };

  const handlePasscodeChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      showToast('Validation Error', 'New passcode cannot be empty.', 'warning');
      return;
    }
    if (newPasscode.trim().length < 4) {
      showToast('Validation Error', 'Passcode must be at least 4 characters.', 'warning');
      return;
    }
    if (newPasscode !== confirmPasscode) {
      showToast('Mismatch', 'New passcode and confirmation do not match.', 'error');
      return;
    }
    updateCrmPassword(newPasscode.trim());
    setNewPasscode('');
    setConfirmPasscode('');
  };

  // ----------------------------------------------------
  // 1. PASSWORD AUTHENTICATION GATE (IF NOT LOGGED IN)
  // ----------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#06080e] text-slate-200 flex flex-col justify-center items-center px-4 py-16 relative overflow-hidden">
        {/* Ambient background light circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Top-Right Theme & Back Action */}
        <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              theme === 'dark'
                ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/60'
                : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-cyan-300" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>

        <div className="w-full max-w-md relative z-10 space-y-6">
          
          {/* Top Logo & Status */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-xl shadow-cyan-500/20 mb-2">
              <div className="w-full h-full bg-[#06080e] rounded-[14px] flex items-center justify-center">
                <Lock className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider text-cyan-300 bg-blue-950/60 border border-cyan-500/30">
              EXECUTIVE PORTAL
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              RSGeeker <span className="text-cyan-400">Media</span> CRM
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Restricted management console for customer pipeline, telemetry, and site CMS.
            </p>
          </div>

          {/* Login Card */}
          <div className="p-8 rounded-3xl bg-[#0b0e17]/90 backdrop-blur-2xl border border-blue-500/25 shadow-2xl shadow-black/80 space-y-5">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Sign In Username</span>
                  <span className="text-[10px] text-cyan-400 font-mono">Super Admin / Staff</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <UserCheck className="w-4 h-4 text-cyan-400/80" />
                  </div>
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => {
                      setUsernameInput(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Username (e.g. AdminGeeker)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>Executive Password</span>
                  <span className="text-[10px] text-slate-500">Encrypted Access</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4 text-cyan-400/80" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError('');
                    }}
                    placeholder="Enter CRM password..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Access Rights...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Authorize & Access Executive Suite</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800/80 text-center">
              <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>RSGeeker Media Executive Protection</span>
              </p>
            </div>
          </div>

          {/* Footer Back Link */}
          <div className="text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>← Return to Public RSGeeker Media Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. AUTHENTICATED EXECUTIVE DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-200 pt-20 pb-20">
      
      {/* Top Admin Nav Header with Blue & Cyan Accents */}
      <div className="bg-[#0b0e17] border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#06080e] rounded-[10px] flex items-center justify-center font-display font-black text-cyan-300 text-sm">
                RS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold text-white tracking-tight">
                  RSGeeker Media <span className="text-cyan-400">Executive Console</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-cyan-500/30">
                  v2.8 Enterprise CRM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Logged in as <strong className="text-cyan-300">{currentAdminUser.name}</strong> ({currentAdminUser.role}) • Telemetry, CRM & CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Front-End Inline Editor Mode Button (Super Admin Only) */}
            {isSuperAdmin && (
              <button
                onClick={() => {
                  setInlineEditorActive(true);
                  navigateTo('home');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 cursor-pointer"
                title="Launch Front-End Inline Visual Editor to click and edit any element live"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span className="hidden sm:inline">Launch</span> Inline Editor
              </button>
            )}

            {/* Live website link */}
            <button
              onClick={() => navigateTo('home')}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 border border-slate-800 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Public Site</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                theme === 'dark'
                  ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/30 hover:bg-cyan-950/60 hover:border-cyan-400'
                  : 'border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100'
              }`}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-cyan-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-blue-600" />
              )}
            </button>

            {/* Executive Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className={`w-2 h-2 rounded-full ${isSuperAdmin ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></span>
              <span className="font-semibold text-slate-300">
                {isSuperAdmin ? 'Super Administrator' : currentAdminUser.role}
              </span>
            </div>

            {/* Logout / Lock Button */}
            <button
              onClick={logoutAdmin}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer"
              title="Lock CRM and end administrative session"
            >
              <LogOut className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lock CRM</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-cyan-200 hover:bg-slate-900/60'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* 1. ANALYTICS & GROWTH TELEMETRY */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Contracted Monthly Pipeline</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                  $234,000
                </div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <span>+18.4% vs last quarter</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Active Pipeline Inquiries</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-cyan-400">
                  {leads.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {leads.filter(l => l.status === 'New Lead').length} requiring immediate triage
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Active IT Support Tickets</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-blue-400">
                  {tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length}
                </div>
                <div className="text-[11px] text-emerald-400 mt-1">
                  100% within 15-min SLA
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0b0f17] border border-slate-800">
                <span className="text-xs text-slate-400 font-semibold block mb-1">Client Retention Rate</span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
                  98.4%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Across 350+ enterprise accounts
                </div>
              </div>
            </div>

            {/* Growth Revenue & Lead Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-base font-bold text-white">Monthly Revenue & Traffic Growth</h3>
                    <p className="text-xs text-slate-400">Integrated marketing pipeline & managed IT billing volume</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">Live GA4 / Stripe Feed</span>
                </div>

                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="month" stroke="#64748b" textAnchor="end" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} 
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="visits" name="Website Visitors" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Service Distribution Pie */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white mb-1">Revenue by Practice Area</h3>
                  <p className="text-xs text-slate-400 mb-4">Contracted billing split</p>
                  
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={serviceDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {serviceDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-1.5 pt-4 border-t border-slate-800 text-xs">
                  {serviceDistribution.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                        <span className="text-slate-300">{s.name}</span>
                      </div>
                      <span className="font-bold text-white">{s.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pipeline Stage Bar */}
            <div className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl">
              <h3 className="font-display text-base font-bold text-white mb-1">CRM Pipeline Velocity</h3>
              <p className="text-xs text-slate-400 mb-6">Current distribution of customer inquiries in active funnel</p>

              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={leadPipelineSummary}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="status" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                    <Bar dataKey="count" name="Leads" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* 2. CRM LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0f17] border border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    placeholder="Search leads by name, email, company..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="All">All Statuses ({leads.length})</option>
                    <option value="New Lead">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleExportLeads}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors border border-slate-700 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads CSV</span>
              </button>
            </div>

            {/* Leads Table */}
            <div className="rounded-3xl border border-slate-800 bg-[#0b0f17] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Lead / Contact</th>
                      <th className="p-4">Service & Budget</th>
                      <th className="p-4">Source & Date</th>
                      <th className="p-4">Status & Progression</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{lead.name}</div>
                          <div className="text-slate-400 text-[11px]">{lead.email} • {lead.phone}</div>
                          <div className="text-cyan-400 font-medium text-[11px] mt-0.5">{lead.company}</div>
                        </td>

                        <td className="p-4">
                          <div className="font-semibold text-slate-200">{lead.serviceInterested}</div>
                          <div className="text-emerald-400 font-mono text-[11px] mt-0.5">{lead.budget}</div>
                        </td>

                        <td className="p-4 text-[11px] text-slate-400">
                          <div>{lead.source}</div>
                          <div>{lead.createdAt}</div>
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStage)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Proposal Sent">Proposal Sent</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Won">Won</option>
                            <option value="Lost">Lost</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 font-semibold text-[11px] transition-colors"
                          >
                            CRM Notes ({lead.notes.length})
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Lead Detail & Notes Modal */}
            {selectedLead && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        Lead Reference: {selectedLead.id}
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        {selectedLead.name} ({selectedLead.company})
                      </h3>
                      <p className="text-xs text-slate-400">{selectedLead.email} • {selectedLead.phone}</p>
                    </div>

                    <button
                      onClick={() => setSelectedLead(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="text-slate-400">Target Capability: <span className="text-white font-medium">{selectedLead.serviceInterested}</span></div>
                    <div className="text-slate-400">Declared Budget: <span className="text-emerald-400 font-mono font-medium">{selectedLead.budget}</span></div>
                    <div className="text-slate-400">Initial Request: <span className="text-slate-200">{selectedLead.message}</span></div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Internal Activity Notes</h4>
                    <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                      {selectedLead.notes.map((note) => (
                        <div key={note.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>{note.author}</span>
                            <span>{note.timestamp}</span>
                          </div>
                          <p>{note.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNoteToLead} className="flex gap-2">
                    <input
                      type="text"
                      value={leadNoteInput}
                      onChange={(e) => setLeadNoteInput(e.target.value)}
                      placeholder="Add an internal note or meeting outcome..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                    >
                      Add Note
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. CLIENT ACCOUNTS */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customers.map((cust) => (
                <div key={cust.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-white">{cust.company}</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {cust.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400">
                    <div>Primary Contact: <span className="text-white font-medium">{cust.name}</span></div>
                    <div>Email: <span className="text-cyan-400">{cust.email}</span></div>
                    <div>Joined: <span className="text-slate-300">{cust.joinedDate}</span></div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Active Workstreams:</span>
                    <span className="font-display font-bold text-emerald-400 text-sm">
                      {cust.projects.length} Ongoing Projects
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Contract Deliverables:</span>
                    <div className="space-y-1">
                      {cust.projects.map((proj) => (
                        <div key={proj.id} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-slate-300 truncate max-w-[160px]">{proj.title}</span>
                          <span className="text-emerald-400 font-mono font-bold">{proj.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. IT SUPPORT TICKET SYSTEM */}
        {activeTab === 'tickets' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-slate-800 bg-[#0b0f17] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Ticket ID & Subject</th>
                      <th className="p-4">Client / Company</th>
                      <th className="p-4">Priority & SLA</th>
                      <th className="p-4">Status & Assignment</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4">
                          <span className="font-mono text-xs font-bold text-cyan-400 block mb-0.5">{t.id}</span>
                          <span className="font-bold text-white text-sm">{t.subject}</span>
                          <span className="text-[11px] text-slate-400 block mt-0.5">{t.category}</span>
                        </td>

                        <td className="p-4">
                          <div className="font-medium text-white">{t.clientName}</div>
                          <div className="text-slate-400 text-[11px]">{t.company}</div>
                          <div className="text-slate-400 text-[11px]">{t.clientEmail}</div>
                        </td>

                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            t.priority === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                            t.priority === 'High' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {t.priority}
                          </span>
                        </td>

                        <td className="p-4">
                          <select
                            value={t.status}
                            onChange={(e) => updateTicketStatus(t.id, e.target.value as TicketStatus)}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[11px] font-bold text-white focus:outline-none"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                          <span className="text-[10px] text-cyan-400 block mt-1">
                            Eng: {t.assignedEngineer || 'Unassigned'}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedTicket(t)}
                            className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition-colors"
                          >
                            Manage ({t.messages.length})
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ticket Management Modal */}
            {selectedTicket && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="bg-[#0b0f17] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {selectedTicket.id} • {selectedTicket.priority} Priority
                      </span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        {selectedTicket.subject}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Client: {selectedTicket.clientName} ({selectedTicket.company})
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs"
                    >
                      Close
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="font-bold text-slate-400 block mb-1">Issue Details:</span>
                    <p className="text-slate-200 leading-relaxed">{selectedTicket.description}</p>
                  </div>

                  {/* Messages Stream */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Support Thread</h4>
                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                      {selectedTicket.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`p-3 rounded-xl text-xs space-y-1 ${
                            m.sender === 'staff'
                              ? 'bg-cyan-950/40 border border-cyan-800/60 text-cyan-200 ml-4'
                              : 'bg-slate-900 border border-slate-800 text-slate-300 mr-4'
                          }`}
                        >
                          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                            <span>{m.senderName} ({m.sender})</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p>{m.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reply Composer */}
                  <form onSubmit={handleTicketStaffReply} className="flex gap-2">
                    <input
                      type="text"
                      value={ticketReply}
                      onChange={(e) => setTicketReply(e.target.value)}
                      placeholder="Type response to client as Systems Engineer..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Response</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. CONSULTATIONS & APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appointments.map((c: Appointment) => (
                <div key={c.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-cyan-400">{c.id}</span>
                    <select
                      value={c.status}
                      onChange={(e) => updateAppointmentStatus(c.id, e.target.value as any)}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-emerald-400"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
                      <option value="Rescheduled">Rescheduled</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <h4 className="font-display text-base font-bold text-white">{c.clientName}</h4>
                    <p className="text-xs text-slate-400">{c.company} • {c.clientEmail}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{c.date} @ {c.timeSlot}</span>
                    </div>
                    <div className="text-slate-400">Platform: <span className="text-white">{c.platform}</span></div>
                    <div className="text-slate-400">Focus: <span className="text-white">{c.service}</span></div>
                  </div>

                  {c.notes && (
                    <p className="text-xs text-slate-400 italic">"{c.notes}"</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. COMPREHENSIVE WEBSITE CMS & LIVE STUDIO */}
        {activeTab === 'cms' && (
          <WebsiteCmsEditor />
        )}

        {/* 7. STAFF USERS & RBAC PERMISSION MANAGEMENT */}
        {activeTab === 'users' && (
          <UserManagementTab />
        )}

        {/* 7. PRICING & SERVICES LIVE EDITOR */}
        {activeTab === 'pricing' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="mb-4">
              <h3 className="font-display text-lg font-bold text-white">Live Retainer Pricing Plans</h3>
              <p className="text-xs text-slate-400">Modifications made here immediately update the live public pricing page.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <div key={plan.id} className="p-6 rounded-3xl bg-[#0b0f17] border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display text-xl font-bold text-white">{plan.name}</h4>
                    {plan.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Monthly Retainer Price ($)</label>
                      <input
                        type="number"
                        value={plan.monthlyPrice}
                        onChange={(e) => updatePricingPlan(plan.id, { monthlyPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Discounted Annual Monthly Equivalent ($)</label>
                      <input
                        type="number"
                        value={plan.yearlyPrice}
                        onChange={(e) => updatePricingPlan(plan.id, { yearlyPrice: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Button CTA Text</label>
                      <input
                        type="text"
                        value={plan.ctaText}
                        onChange={(e) => updatePricingPlan(plan.id, { ctaText: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-400 font-semibold pt-2">
                    ✓ Syncs automatically to `/pricing`
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. GLOBAL SITE SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* Executive CRM Security & Passcode Card */}
            <div className="p-8 rounded-3xl bg-[#0b0f17] border border-cyan-500/30 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">Executive CRM Security & Access Control</h3>
                    <p className="text-xs text-slate-400">Password protection for customer intelligence, pipeline, and telemetry.</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-950 text-cyan-300 border border-cyan-500/30">
                  AES-256 ACTIVE
                </span>
              </div>

              {/* Current Passcode Inspection */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-300 block">Current Active Passcode</span>
                  <span className="text-[11px] text-slate-400">Configured in encrypted local persistence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-950 font-mono text-xs font-bold text-cyan-300 border border-slate-700/80 min-w-[120px] text-center">
                    {showCurrentPasscode ? crmPassword : '••••••••••••'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCurrentPasscode(!showCurrentPasscode)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                    title={showCurrentPasscode ? "Mask passcode" : "Reveal passcode"}
                  >
                    {showCurrentPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Change Passcode Form */}
              <form onSubmit={handlePasscodeChange} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300/90">Update Executive Passcode</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">New Passcode</label>
                    <input
                      type="password"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      placeholder="Minimum 4 characters..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm New Passcode</label>
                    <input
                      type="password"
                      value={confirmPasscode}
                      onChange={(e) => setConfirmPasscode(e.target.value)}
                      placeholder="Re-enter new passcode..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[11px] text-slate-500">
                    Changes take effect immediately across all active browser windows.
                  </p>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    Update CRM Passcode
                  </button>
                </div>
              </form>
            </div>

            {/* Global Website Configuration */}
            <div className="p-8 rounded-3xl bg-[#0b0f17] border border-slate-800 shadow-2xl">
              <h3 className="font-display text-xl font-bold text-white mb-1">Global Website Configuration</h3>
              <p className="text-xs text-slate-400 mb-6">
                Update brand identity, founder messaging, and primary contact gateways across the public site.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Pill Badge</label>
                  <input
                    type="text"
                    value={settingsForm.heroBadge}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={settingsForm.heroSubtitle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Founder Abhishek Singh Quote</label>
                  <textarea
                    rows={3}
                    value={settingsForm.founderQuote}
                    onChange={(e) => setSettingsForm({ ...settingsForm, founderQuote: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Direct Email</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">24/7 Telephone Hotline</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Headquarters Address</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Save Global Site Settings
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
