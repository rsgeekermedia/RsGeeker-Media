import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserPlus, 
  Key, 
  UserCheck, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  AlertCircle, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  Sparkles,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminUser, AdminPermissions } from '../../types';

const defaultPermissions: AdminPermissions = {
  canAccessOverview: false,
  canAccessLeads: true,
  canAccessCustomers: false,
  canAccessTickets: false,
  canAccessAppointments: false,
  canAccessBlog: false,
  canAccessWebsiteContent: false,
  canAccessServices: false,
  canManageUsers: false
};

const permissionLabels: { key: keyof AdminPermissions; label: string; desc: string }[] = [
  { key: 'canAccessOverview', label: 'Executive Analytics & Telemetry', desc: 'View revenue benchmarks, lead traffic, and performance graphs' },
  { key: 'canAccessLeads', label: 'Leads & Inquiries CRM', desc: 'Review, update stages, add client notes, and manage incoming leads' },
  { key: 'canAccessCustomers', label: 'Client Accounts & Invoices', desc: 'Inspect enterprise accounts, contract value, and billing statuses' },
  { key: 'canAccessTickets', label: 'IT Helpdesk & Tickets', desc: 'Respond to support tickets, adjust priority, and assign engineers' },
  { key: 'canAccessAppointments', label: 'Consultation Calendar', desc: 'Manage strategy bookings and meeting confirmations' },
  { key: 'canAccessBlog', label: 'Blog & Editorial Studio', desc: 'Draft, publish, edit, and remove technical blog articles' },
  { key: 'canAccessWebsiteContent', label: 'Website Content, Text & Images', desc: 'Edit hero copy, statistics, founder story, images, and contact info' },
  { key: 'canAccessServices', label: 'Services & Pricing Plans', desc: 'Update service offerings, hourly rates, and retainer packages' },
  { key: 'canManageUsers', label: 'User Management & Permissions', desc: 'Create additional staff accounts and modify permission access' },
];

export const UserManagementTab: React.FC = () => {
  const { currentAdminUser, adminUsers, addAdminUser, updateAdminUser, deleteAdminUser, showToast } = useApp();

  const isSuperAdmin = currentAdminUser.isSuperAdmin || currentAdminUser.role === 'Super Admin';

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);

  // New user form state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Marketing & Content Associate');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80');
  const [permissions, setPermissions] = useState<AdminPermissions>({ ...defaultPermissions });
  const [showPasswordText, setShowPasswordText] = useState(false);

  // Edit user form state
  const [editPermissions, setEditPermissions] = useState<AdminPermissions>({ ...defaultPermissions });
  const [editRole, setEditRole] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const resetCreateForm = () => {
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setRole('Marketing & Content Associate');
    setPermissions({ ...defaultPermissions });
    setShowCreateModal(false);
  };

  const applyPreset = (preset: 'editor' | 'sales' | 'support' | 'all') => {
    if (preset === 'all') {
      setPermissions({
        canAccessOverview: true,
        canAccessLeads: true,
        canAccessCustomers: true,
        canAccessTickets: true,
        canAccessAppointments: true,
        canAccessBlog: true,
        canAccessWebsiteContent: true,
        canAccessServices: true,
        canManageUsers: false
      });
    } else if (preset === 'editor') {
      setPermissions({
        canAccessOverview: false,
        canAccessLeads: false,
        canAccessCustomers: false,
        canAccessTickets: false,
        canAccessAppointments: false,
        canAccessBlog: true,
        canAccessWebsiteContent: true,
        canAccessServices: false,
        canManageUsers: false
      });
    } else if (preset === 'sales') {
      setPermissions({
        canAccessOverview: true,
        canAccessLeads: true,
        canAccessCustomers: true,
        canAccessTickets: false,
        canAccessAppointments: true,
        canAccessBlog: false,
        canAccessWebsiteContent: false,
        canAccessServices: true,
        canManageUsers: false
      });
    } else if (preset === 'support') {
      setPermissions({
        canAccessOverview: false,
        canAccessLeads: false,
        canAccessCustomers: true,
        canAccessTickets: true,
        canAccessAppointments: false,
        canAccessBlog: false,
        canAccessWebsiteContent: false,
        canAccessServices: false,
        canManageUsers: false
      });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim() || !password.trim()) {
      showToast('Validation Error', 'Full Name, Username, and Password are required.', 'error');
      return;
    }

    const cleanUsername = username.trim();
    if (cleanUsername.toLowerCase() === 'admingeeker') {
      showToast('Username Reserved', 'AdminGeeker is reserved for the Super Admin.', 'error');
      return;
    }

    const exists = adminUsers.some(u => u.username?.toLowerCase() === cleanUsername.toLowerCase());
    if (exists) {
      showToast('Username Taken', `The username "${cleanUsername}" is already in use.`, 'error');
      return;
    }

    addAdminUser({
      name: fullName.trim(),
      username: cleanUsername,
      email: email.trim() || `${cleanUsername.toLowerCase()}@rsgeekermedia.com`,
      password: password.trim(),
      role: role.trim(),
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      isSuperAdmin: false,
      permissions
    });

    resetCreateForm();
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setEditPermissions(user.permissions || { ...defaultPermissions });
    setEditRole(user.role);
    setEditPassword(user.password || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    updateAdminUser(editingUser.id, {
      role: editRole,
      password: editPassword.trim() || editingUser.password,
      permissions: editPermissions
    });

    setEditingUser(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-lg font-bold text-white">Staff Management & Access Control (RBAC)</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                Super Admin Protected
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Only the Super Admin (<strong className="text-cyan-300">AdminGeeker</strong>) can provision new user logins and restrict what modules each staff member can view or modify.
            </p>
          </div>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        )}
      </div>

      {/* Users Grid / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active System Accounts ({adminUsers.length})
          </h4>
          <span className="text-[11px] text-slate-500">
            Role-Based Access Enforcement Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {adminUsers.map((user) => {
            const isSuper = user.isSuperAdmin || user.username?.toLowerCase() === 'admingeeker';
            const userPermissions = user.permissions || defaultPermissions;
            
            // Count granted permissions
            const grantedCount = isSuper 
              ? permissionLabels.length 
              : Object.values(userPermissions).filter(Boolean).length;

            return (
              <div 
                key={user.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSuper
                    ? 'bg-gradient-to-r from-[#0c101a] to-blue-950/20 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#0b0f17] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Avatar & Info */}
                  <div className="flex items-start sm:items-center gap-3.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-cyan-500/30 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-white">{user.name}</h4>
                        {isSuper ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                            Super Admin (Permanent)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                            {user.role}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="font-mono text-cyan-400/90 font-medium">
                          Username: <strong className="text-white">{user.username}</strong>
                        </span>
                        <span>•</span>
                        <span>{user.email}</span>
                        {user.password && !isSuper && isSuperAdmin && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-500">
                              Pass: <strong className="text-slate-300">{user.password}</strong>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-auto">
                    <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                      {isSuper ? 'Full 9/9 Access' : `${grantedCount}/9 Modules Allowed`}
                    </span>

                    {isSuperAdmin && !isSuper && (
                      <>
                        <button
                          onClick={() => openEditModal(user)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Restrict Access</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to remove user "${user.name}"?`)) {
                              deleteAdminUser(user.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 transition-colors cursor-pointer"
                          title="Delete user"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Permissions Breakdown Badges */}
                <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                  {permissionLabels.map((perm) => {
                    const isGranted = isSuper || !!userPermissions[perm.key];
                    return (
                      <span
                        key={perm.key}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
                          isGranted
                            ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300'
                            : 'bg-slate-900 border border-slate-800 text-slate-600 line-through opacity-60'
                        }`}
                        title={perm.desc}
                      >
                        {isGranted ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <X className="w-2.5 h-2.5" />}
                        <span>{perm.label.split(' ')[0]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE NEW USER MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0f17] border border-cyan-500/30 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">Create New Sub-User</h3>
                  <p className="text-[11px] text-slate-400">Define login credentials and assign restricted permissions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Unique Username *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. johndoe"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. john@rsgeekermedia.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswordText ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="User sign-in password..."
                      className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordText(!showPasswordText)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPasswordText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Job Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Sales Specialist, IT Lead, Content Manager"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Presets */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 block mb-1.5">Quick Role Presets:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => applyPreset('editor')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
                  >
                    Content Editor (CMS & Blog)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('sales')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
                  >
                    Sales Rep (Leads & Clients)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('support')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
                  >
                    IT Support (Tickets & Helpdesk)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('all')}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer"
                  >
                    All Modules
                  </button>
                </div>
              </div>

              {/* Granular Permission Checkboxes */}
              <div className="pt-3 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Granular Permissions Checklist:
                </label>
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 max-h-56 overflow-y-auto">
                  {permissionLabels.map((item) => (
                    <label 
                      key={item.key} 
                      className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white p-1 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={permissions[item.key]}
                        onChange={(e) => setPermissions({ ...permissions, [item.key]: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                      />
                      <div>
                        <span className="font-semibold text-white block">{item.label}</span>
                        <span className="text-[11px] text-slate-400 block">{item.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER PERMISSIONS MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0b0f17] border border-cyan-500/30 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-display text-base font-bold text-white">
                  Restrict Access: {editingUser.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Username: @{editingUser.username}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Reset Password</label>
                  <input
                    type="text"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                    placeholder="New password..."
                  />
                </div>
              </div>

              {/* Granular Permission Checkboxes */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Allowed Module Access:
                </label>
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 max-h-64 overflow-y-auto">
                  {permissionLabels.map((item) => (
                    <label 
                      key={item.key} 
                      className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer hover:text-white p-1 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={editPermissions[item.key]}
                        onChange={(e) => setEditPermissions({ ...editPermissions, [item.key]: e.target.checked })}
                        className="mt-0.5 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                      />
                      <div>
                        <span className="font-semibold text-white block">{item.label}</span>
                        <span className="text-[11px] text-slate-400 block">{item.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Save Access Rules
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
