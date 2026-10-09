'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { Package, Plus, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function InventoryAdminPage() {
  const { inventory, addInventoryItem } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'ICT & Computers' as any,
    location: 'Computer Lab 1',
    condition: 'Good' as any,
    quantity: 10,
    purchaseDate: new Date().toISOString().split('T')[0],
    assignedTo: 'ICT Department'
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addInventoryItem(form);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md inline-flex mb-1">
            <Package className="w-3.5 h-3.5" />
            <span>Asset Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            School Assets & Physical Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log and audit laboratory microscopes, desktop computers, school buses, and sports equipment.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Asset Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-school-navy-900 bg-school-navy-50 px-2 py-0.5 rounded">
                {item.assetTag}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                item.condition === 'Brand New' || item.condition === 'Good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {item.condition}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm leading-snug">{item.name}</h3>

            <div className="space-y-1 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
              <p><strong className="text-slate-800">Location:</strong> {item.location}</p>
              <p><strong className="text-slate-800">Quantity:</strong> {item.quantity} units</p>
              {item.assignedTo && <p><strong className="text-slate-800">Assigned To:</strong> {item.assignedTo}</p>}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add School Asset Item</h3>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Asset Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Microscopes"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="ICT & Computers">ICT & Computers</option>
                    <option value="Science Equipment">Science Equipment</option>
                    <option value="Vehicles & Transport">Vehicles & Transport</option>
                    <option value="Classroom Furniture">Classroom Furniture</option>
                    <option value="Sports Gear">Sports Gear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Condition</label>
                  <select
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Good">Good</option>
                    <option value="Needs Repair">Needs Repair</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                    className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
