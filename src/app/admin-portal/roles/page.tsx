'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import { UserRole, User } from '@/types';
import {
  Shield,
  Check,
  Lock,
  Users,
  Key,
  Plus,
  Edit,
  Trash2,
  Search,
  UserCheck,
  Briefcase,
  GraduationCap,
  DollarSign,
  UserPlus,
  BookOpen,
  ArrowRight,
  Sparkles,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  X,
  KeyRound,
  Layers,
  FileText,
  Activity,
  Workflow
} from 'lucide-react';

export default function RolesAdminPage() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    updateUserRole,
    classes,
    subjects,
    students,
    feePayments,
    admissions,
    logAuditEvent
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'users' | 'interconnected' | 'rbac'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('ALL');

  // Modals state
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'TEACHER' as UserRole
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'TEACHER' as UserRole
  });

  const [newPassword, setNewPassword] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const roleDefinitions: {
    role: UserRole;
    name: string;
    description: string;
    color: string;
    badgeBg: string;
    portalRoute: string;
    interconnectedModule: string;
    icon: any;
  }[] = [
    {
      role: 'SUPER_ADMIN',
      name: 'Super Administrator',
      description: 'Master administrative authority over site settings, branding, faculty allocation, audit trail, and all system modules.',
      color: 'bg-purple-600',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
      portalRoute: '/admin-portal',
      interconnectedModule: 'Master Control & System Settings',
      icon: Shield
    },
    {
      role: 'HEADTEACHER',
      name: 'Headmaster / Principal',
      description: 'Academic supervisory authority over syllabi, continuous assessment review, terminal report cards, and faculty schedules.',
      color: 'bg-indigo-600',
      badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
      portalRoute: '/admin-portal',
      interconnectedModule: 'Academic Supervision & Reports',
      icon: GraduationCap
    },
    {
      role: 'SCHOOL_ADMIN',
      name: 'School Administrator',
      description: 'Administrative officer managing daily operational records, notices, inventory, and facilities.',
      color: 'bg-blue-600',
      badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
      portalRoute: '/admin-portal',
      interconnectedModule: 'Operations & School Facilities',
      icon: Briefcase
    },
    {
      role: 'TEACHER',
      name: 'Teacher / Faculty Member',
      description: 'Classroom instructors managing assigned classes, recording SBA continuous assessments, entering exam marks, and setting quizzes.',
      color: 'bg-emerald-600',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      portalRoute: '/portal/teacher',
      interconnectedModule: 'SBA Marks & Classroom Grading',
      icon: BookOpen
    },
    {
      role: 'ACCOUNTANT',
      name: 'Bursar / Accountant',
      description: 'Finance desk logging student tuition payments, generating official receipts, tracking arrears, and managing expenditures.',
      color: 'bg-teal-600',
      badgeBg: 'bg-teal-100 text-teal-900 border-teal-200',
      portalRoute: '/portal/accountant',
      interconnectedModule: 'Fees, Invoicing & Receipts',
      icon: DollarSign
    },
    {
      role: 'ADMISSIONS_OFFICER',
      name: 'Admissions Desk Officer',
      description: 'Manages new student intake, screens online applications, schedules interviews, and converts accepted applicants to students.',
      color: 'bg-rose-600',
      badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
      portalRoute: '/portal/admissions-officer',
      interconnectedModule: 'Applicant Intake & Enrollment',
      icon: UserPlus
    },
    {
      role: 'LIBRARIAN',
      name: 'Librarian & Media Curator',
      description: 'Curates institutional library catalog, issues academic textbooks, and monitors student book borrowings.',
      color: 'bg-amber-600',
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
      portalRoute: '/admin-portal/library',
      interconnectedModule: 'Library Catalog & Textbooks',
      icon: BookOpen
    }
  ];

  const permissionModules = [
    {
      module: 'Student Information System (SIS)',
      permissions: ['View Students Registry', 'Admit New Student', 'Modify Student Profile', 'Promote to Next Grade', 'Archive / Delete Record']
    },
    {
      module: 'School-Based Assessments (SBA) & Grading',
      permissions: ['Enter SBA Scores (CW, HW, Project, Test)', 'Enter End of Term Exam Score', 'Calculate 9-Point NaCCA Grades', 'Generate Terminal Report Cards', 'Create Online CBT Quizzes']
    },
    {
      module: 'Bursary & Financial Management',
      permissions: ['View Tuition Balances & Arrears', 'Issue Official Payment Receipts', 'Configure Fee Structures', 'Log School Operating Expenses', 'Export Financial Statements']
    },
    {
      module: 'Admissions Pipeline & Intake',
      permissions: ['Review Online Applications', 'Schedule Placement Interview', 'Approve & Convert to Enrolled Student', 'Manage Intake Waiting List']
    },
    {
      module: 'Executive Security & System Settings',
      permissions: ['Assign User Roles & Provision Accounts', 'Reset User Passwords', 'Manage Website CMS', 'Inspect Cryptographic Audit Trail', 'Configure School Branding & Motto']
    }
  ];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'ALL' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.username || !formData.password) {
      alert('Please fill out all required fields.');
      return;
    }

    addUser({
      name: formData.name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim() || `${formData.username.trim()}@blessedchildschool.edu.gh`,
      phone: formData.phone.trim() || '+233 24 000 0000',
      password: formData.password.trim(),
      role: formData.role
    });

    setFeedbackMsg(`User ${formData.name} assigned role "${formData.role}" successfully!`);
    setIsAddUserOpen(false);
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'TEACHER'
    });
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleOpenEditUser = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone || '',
      role: user.role
    });
    setIsEditUserOpen(true);
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    updateUser(selectedUser.id, {
      name: editFormData.name.trim(),
      username: editFormData.username.trim(),
      email: editFormData.email.trim(),
      phone: editFormData.phone.trim(),
      role: editFormData.role
    });

    setFeedbackMsg(`Updated details and role for ${editFormData.name} successfully!`);
    setIsEditUserOpen(false);
    setSelectedUser(null);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleDirectRoleChange = (userId: string, newRole: UserRole) => {
    updateUserRole(userId, newRole);
    const target = users.find(u => u.id === userId);
    setFeedbackMsg(`Role for ${target?.name || 'User'} reassigned to ${newRole}!`);
    setTimeout(() => setFeedbackMsg(''), 3500);
  };

  const handleOpenPasswordModal = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setIsPasswordModalOpen(true);
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newPassword || newPassword.length < 3) {
      alert('Password must be at least 3 characters long.');
      return;
    }

    updateUser(selectedUser.id, { password: newPassword.trim() });
    setFeedbackMsg(`Password for ${selectedUser.name} (${selectedUser.username}) reset successfully!`);
    setIsPasswordModalOpen(false);
    setSelectedUser(null);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const handleDeleteUser = (user: User) => {
    if (user.role === 'SUPER_ADMIN') {
      alert('Cannot delete the Super Administrator account.');
      return;
    }
    if (confirm(`Are you sure you want to remove user "${user.name}" (${user.username})?`)) {
      deleteUser(user.id);
      setFeedbackMsg(`User ${user.name} removed from system.`);
      setTimeout(() => setFeedbackMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-school-navy-950 via-[#0a1e45] to-school-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-luxury-lg border border-amber-400/30 relative overflow-hidden bg-grid-subtle flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center space-x-2.5 mb-2">
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest bg-amber-400/20 border border-amber-400/40 px-3 py-0.5 rounded-full shadow-xs">
              Super Admin Control
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-300 text-xs font-bold">
              Role Provisioning &amp; RBAC Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
            User Role Assignment &amp; System Integration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Super Administrator exclusive portal to provision staff accounts, assign and reassign user roles, configure permission boundaries, and govern how departmental roles interconnect across the school.
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={() => setIsAddUserOpen(true)}
            className="px-5 py-3 rounded-xl btn-gold-glow font-black text-xs uppercase tracking-wider shadow-lg flex items-center space-x-2 group hover-lift"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Assign New User &amp; Role</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2.5 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Key Metric Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-luxury hover-lift">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total User Accounts</p>
          <p className="text-2xl font-heading font-black text-school-navy-950 mt-1">{users.length}</p>
          <span className="text-[10px] text-slate-500 font-semibold">Active credentials</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-luxury hover-lift">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Teaching Faculty</p>
          <p className="text-2xl font-heading font-black text-emerald-600 mt-1">
            {users.filter(u => u.role === 'TEACHER').length}
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">SBA mark entry role</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-luxury hover-lift">
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Bursary &amp; Accounts</p>
          <p className="text-2xl font-heading font-black text-teal-600 mt-1">
            {users.filter(u => u.role === 'ACCOUNTANT').length}
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">Fee receipts role</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-luxury hover-lift">
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Admissions Desk</p>
          <p className="text-2xl font-heading font-black text-rose-600 mt-1">
            {users.filter(u => u.role === 'ADMISSIONS_OFFICER').length}
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">Intake &amp; screening role</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-luxury hover-lift col-span-2 sm:col-span-1">
          <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Leadership &amp; Head</p>
          <p className="text-2xl font-heading font-black text-purple-600 mt-1">
            {users.filter(u => u.role === 'SUPER_ADMIN' || u.role === 'HEADTEACHER' || u.role === 'SCHOOL_ADMIN').length}
          </p>
          <span className="text-[10px] text-slate-500 font-semibold">Supervisory role</span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-bold bg-white p-1.5 rounded-2xl border shadow-xs">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'users'
              ? 'bg-school-navy-950 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory &amp; Role Assignment ({filteredUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('interconnected')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'interconnected'
              ? 'bg-school-navy-950 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Workflow className="w-4 h-4 text-amber-400" />
          <span>Interconnected Role Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('rbac')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'rbac'
              ? 'bg-school-navy-950 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Role Permissions Matrix (RBAC)</span>
        </button>
      </div>

      {/* TAB 1: USERS DIRECTORY & ROLE ASSIGNMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-luxury p-6 space-y-5">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search staff by name, username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center space-x-2 self-start sm:self-auto text-xs font-bold text-slate-600">
              <span>Filter Role:</span>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="ALL">All Roles ({users.length})</option>
                <option value="SUPER_ADMIN">Super Administrator</option>
                <option value="HEADTEACHER">Headmaster</option>
                <option value="TEACHER">Teacher</option>
                <option value="ACCOUNTANT">Accountant</option>
                <option value="ADMISSIONS_OFFICER">Admissions Officer</option>
                <option value="LIBRARIAN">Librarian</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-black uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">User &amp; Identity</th>
                  <th className="py-3 px-3">Username &amp; Contact</th>
                  <th className="py-3 px-3">Assigned Role (By Super Admin)</th>
                  <th className="py-3 px-3">Connected Module</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => {
                  const roleDef = roleDefinitions.find(r => r.role === user.role) || roleDefinitions[0];
                  const Icon = roleDef.icon;
                  const isSuper = user.role === 'SUPER_ADMIN';

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* User & Identity */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-9 h-9 rounded-xl ${roleDef.color} text-white flex items-center justify-center font-black text-xs shadow-xs flex-shrink-0`}>
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900 text-xs">{user.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Created: {user.createdAt}</p>
                          </div>
                        </div>
                      </td>

                      {/* Username & Contact */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5">
                          <span className="font-mono text-xs font-bold text-school-navy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 block max-w-fit">
                            {user.username}
                          </span>
                          <span className="text-[11px] text-slate-500 block">{user.email}</span>
                        </div>
                      </td>

                      {/* Assigned Role & Quick Reassign Selector */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1.5">
                          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${roleDef.badgeBg}`}>
                            <Icon className="w-3 h-3" />
                            <span>{roleDef.name}</span>
                          </span>

                          {!isSuper && (
                            <select
                              value={user.role}
                              onChange={(e) => handleDirectRoleChange(user.id, e.target.value as UserRole)}
                              className="block text-[10px] font-bold text-slate-700 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors cursor-pointer"
                              title="Reassign role for this user"
                            >
                              <option value="TEACHER">Role: Teacher</option>
                              <option value="ACCOUNTANT">Role: Accountant</option>
                              <option value="ADMISSIONS_OFFICER">Role: Admissions Officer</option>
                              <option value="HEADTEACHER">Role: Headmaster</option>
                              <option value="LIBRARIAN">Role: Librarian</option>
                              <option value="SCHOOL_ADMIN">Role: School Admin</option>
                            </select>
                          )}
                        </div>
                      </td>

                      {/* Connected Module Link */}
                      <td className="py-3.5 px-3">
                        <Link
                          href={roleDef.portalRoute}
                          className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-school-navy-900 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-colors group"
                        >
                          <Activity className="w-3 h-3 text-amber-500" />
                          <span>{roleDef.interconnectedModule}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center space-x-1.5">
                          <button
                            onClick={() => handleOpenPasswordModal(user)}
                            title="Reset password"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 transition-colors"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEditUser(user)}
                            title="Edit details & role"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-school-navy-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          {!isSuper && (
                            <button
                              onClick={() => handleDeleteUser(user)}
                              title="Delete user account"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INTERCONNECTED ROLE ARCHITECTURE */}
      {activeTab === 'interconnected' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-luxury space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200 inline-block">
                Real-Time Data Interconnection
              </span>
              <h2 className="text-xl font-heading font-extrabold text-slate-900 mt-1">
                How Roles Interconnect Across Blessed Child School
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                Every user role assigned by the Super Administrator seamlessly links into the next departmental workflow in real-time. No module operates in isolation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {/* Node 1 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-white border border-rose-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-rose-800">
                  <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">1. Admissions Desk</h3>
                    <p className="text-[10px] text-rose-600 font-bold uppercase">Role: ADMISSIONS_OFFICER</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Admissions officers review incoming online applicant forms, conduct placement tests, and approve admissions.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-rose-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Converted Applicants:</span>
                  <span className="font-bold text-rose-600">{admissions.filter(a => a.status === 'Accepted').length} Ready</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Converts automatically into Student SIS in Super Admin.
                </div>
              </div>

              {/* Node 2 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-purple-900">
                  <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">2. Super Admin SIS</h3>
                    <p className="text-[10px] text-purple-700 font-bold uppercase">Role: SUPER_ADMIN</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Super Admin allocates admitted students to classes (Creche to JHS 3), assigns class teachers, and provisions login credentials.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-purple-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Classes &amp; Students:</span>
                  <span className="font-bold text-purple-700">{classes.length} Classes • {students.length} Pupils</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Classes populate dynamically in Teacher Workspace.
                </div>
              </div>

              {/* Node 3 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-emerald-900">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">3. Teaching &amp; SBA</h3>
                    <p className="text-[10px] text-emerald-700 font-bold uppercase">Role: TEACHER</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Teachers log into their dedicated portal to access their assigned classes, enter CW, HW, Projects, Class Tests, and Exam scores.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-emerald-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Continuous Assessment:</span>
                  <span className="font-bold text-emerald-700">NaCCA 50% SBA + 50% Exam</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Feeds scores instantly to Terminal Report Cards.
                </div>
              </div>

              {/* Node 4 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-indigo-900">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">4. Academic Supervision</h3>
                    <p className="text-[10px] text-indigo-700 font-bold uppercase">Role: HEADTEACHER</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Headmaster audits teacher SBA mark submissions, verifies academic grade distributions, and signs off on terminal report cards.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Report Cards Engine:</span>
                  <span className="font-bold text-indigo-700">Online &amp; Printable PDF</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Parents &amp; students access official grades.
                </div>
              </div>

              {/* Node 5 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-teal-900">
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">5. Bursary &amp; Accounts</h3>
                    <p className="text-[10px] text-teal-700 font-bold uppercase">Role: ACCOUNTANT</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Accountants issue receipts for tuition payments via Mobile Money, cash, or bank deposit, and track student billing arrears.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-teal-100 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Collections Recorded:</span>
                  <span className="font-bold text-teal-700">{feePayments.length} Receipts Issued</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Financial statements &amp; Super Admin fees desk.
                </div>
              </div>

              {/* Node 6 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200/80 shadow-xs space-y-3">
                <div className="flex items-center space-x-2.5 text-amber-950">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm">6. Cryptographic Audit</h3>
                    <p className="text-[10px] text-amber-700 font-bold uppercase">Master Security</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every action performed by every role is permanently stamped with timestamp, user ID, module, and state changes for security.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span>Audit Logs Captured:</span>
                  <span className="font-bold text-amber-700">100% Comprehensive</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Interconnects to:</strong> Super Admin security console.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RBAC PERMISSIONS MATRIX */}
      {activeTab === 'rbac' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-luxury p-6 space-y-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                Granular Role-Based Permissions Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Inspect which functional capabilities are assigned to each institutional role.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {permissionModules.map((pm, idx) => (
              <div key={idx} className="space-y-2.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-black text-school-navy-950 uppercase tracking-wider flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  {pm.module}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {pm.permissions.map((pName, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs flex items-center justify-between shadow-xs"
                    >
                      <span className="font-medium text-slate-800">{pName}</span>
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD USER & ASSIGN ROLE */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-sm">
                    Assign New User &amp; Role
                  </h3>
                  <p className="text-[11px] text-slate-500">Super Administrator Provisioning Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Emmanuel Osei"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. eosei"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned System Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  className="w-full px-3.5 py-2.5 border rounded-xl bg-amber-50/50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="TEACHER">Teacher / Faculty Member (SBA Grading)</option>
                  <option value="ACCOUNTANT">Bursar / Accountant (Fee Payments &amp; Receipts)</option>
                  <option value="ADMISSIONS_OFFICER">Admissions Desk Officer (Student Intake)</option>
                  <option value="HEADTEACHER">Headmaster / Principal (Academic Supervision)</option>
                  <option value="LIBRARIAN">Librarian (Book Catalog &amp; Borrowings)</option>
                  <option value="SCHOOL_ADMIN">School Administrator (Operational Management)</option>
                </select>
                <p className="text-[10px] text-slate-500 mt-1">
                  The selected role dictates the portal, permissions, and interconnected workflow this user can access.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Login Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Assign confidential password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Staff Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +233 24 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. staff@blessedchildschool.edu.gh"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black btn-gold-glow rounded-xl shadow-md"
                >
                  Create &amp; Assign Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER & ROLE */}
      {isEditUserOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Edit className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-sm">
                    Modify User Details &amp; Reassign Role
                  </h3>
                  <p className="text-[11px] text-slate-500">{selectedUser.name} ({selectedUser.username})</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsEditUserOpen(false);
                  setSelectedUser(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username</label>
                  <input
                    type="text"
                    required
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as UserRole })}
                  className="w-full px-3.5 py-2.5 border rounded-xl bg-amber-50/50 font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="TEACHER">Teacher / Faculty Member</option>
                  <option value="ACCOUNTANT">Bursar / Accountant</option>
                  <option value="ADMISSIONS_OFFICER">Admissions Desk Officer</option>
                  <option value="HEADTEACHER">Headmaster / Principal</option>
                  <option value="LIBRARIAN">Librarian</option>
                  <option value="SCHOOL_ADMIN">School Administrator</option>
                  {selectedUser.role === 'SUPER_ADMIN' && (
                    <option value="SUPER_ADMIN">Super Administrator</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditUserOpen(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black bg-school-navy-950 text-white rounded-xl shadow-md hover:bg-school-navy-900 transition-colors"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: RESET PASSWORD */}
      {isPasswordModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-sm">
                    Reset User Password
                  </h3>
                  <p className="text-[11px] text-slate-500">{selectedUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsPasswordModalOpen(false);
                  setSelectedUser(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  New Password for {selectedUser.username} *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password (min 3 chars)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black btn-gold-glow rounded-xl shadow-md"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
