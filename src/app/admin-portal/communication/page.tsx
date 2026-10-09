'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { MessageSquare, Plus, Bell, Send, Mail, User, CheckCircle2 } from 'lucide-react';

export default function CommunicationAdminPage() {
  const { announcements, addAnnouncement, messages, sendMessage, currentUser, users } = useSchool();
  const [activeTab, setActiveTab] = useState<'announcements' | 'messages'>('announcements');
  const [ancModalOpen, setAncModalOpen] = useState(false);
  const [msgModalOpen, setMsgModalOpen] = useState(false);

  // Form State
  const [ancForm, setAncForm] = useState({
    title: '',
    content: '',
    targetAudience: 'All' as any,
    category: 'Academic' as any,
    authorName: currentUser.name,
    isPinned: false
  });

  const [msgForm, setMsgForm] = useState({
    recipientId: users[6]?.id || 'usr-parent-1',
    subject: '',
    message: ''
  });

  const handleCreateAnc = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement(ancForm);
    setAncModalOpen(false);
  };

  const handleSendMsg = (e: React.FormEvent) => {
    e.preventDefault();
    const recipient = users.find(u => u.id === msgForm.recipientId);
    sendMessage({
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      recipientId: msgForm.recipientId,
      recipientName: recipient?.name || 'Recipient',
      subject: msgForm.subject,
      message: msgForm.message
    });
    setMsgModalOpen(false);
    setMsgForm({ recipientId: users[6]?.id || 'usr-parent-1', subject: '', message: '' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>School Communication Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Broadcast Announcements & Internal Messaging
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Broadcast official bulletins to teachers, parents, and students, or send direct correspondence.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'announcements' ? (
            <button
              onClick={() => setAncModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Broadcast Announcement</span>
            </button>
          ) : (
            <button
              onClick={() => setMsgModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Compose Message</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex gap-2">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'announcements'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Announcements & Bulletins ({announcements.length})
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'messages'
              ? 'bg-school-navy-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Direct Messages ({messages.length})
        </button>
      </div>

      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-school-navy-900 bg-school-navy-50 px-2 py-0.5 rounded">
                    {a.category}
                  </span>
                  <span className="text-slate-400">{a.datePosted}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{a.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{a.content}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Target: <strong>{a.targetAudience}</strong></span>
                <span>By {a.authorName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
          {messages.map((m) => (
            <div key={m.id} className="p-5 hover:bg-slate-50 transition-colors flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 text-sm">{m.senderName}</span>
                  <span className="text-[10px] text-slate-400">→ To: {m.recipientName}</span>
                </div>
                <h4 className="font-semibold text-xs text-school-navy-950">{m.subject}</h4>
                <p className="text-xs text-slate-600 max-w-xl">{m.message}</p>
              </div>
              <span className="text-[11px] text-slate-400 whitespace-nowrap pl-4">{m.sentAt}</span>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ANNOUNCEMENT */}
      {ancModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Broadcast Official Announcement</h3>
            <form onSubmit={handleCreateAnc} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={ancForm.title}
                  onChange={(e) => setAncForm({ ...ancForm, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={ancForm.targetAudience}
                    onChange={(e) => setAncForm({ ...ancForm, targetAudience: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="All">All School</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Parents">Parents Only</option>
                    <option value="Students">Students Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={ancForm.category}
                    onChange={(e) => setAncForm({ ...ancForm, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Academic">Academic</option>
                    <option value="PTA">PTA</option>
                    <option value="General">General</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Memo Content *</label>
                <textarea
                  rows={4}
                  required
                  value={ancForm.content}
                  onChange={(e) => setAncForm({ ...ancForm, content: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAncModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Broadcast Memo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: COMPOSE MESSAGE */}
      {msgModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Compose Direct Message</h3>
            <form onSubmit={handleSendMsg} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipient *</label>
                <select
                  value={msgForm.recipientId}
                  onChange={(e) => setMsgForm({ ...msgForm, recipientId: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={msgForm.subject}
                  onChange={(e) => setMsgForm({ ...msgForm, subject: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message Body *</label>
                <textarea
                  rows={4}
                  required
                  value={msgForm.message}
                  onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMsgModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
