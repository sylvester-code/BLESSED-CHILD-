'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSchool } from '@/context/SchoolContext';
import {
  DollarSign,
  Receipt,
  Users,
  Building,
  Plus,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  X
} from 'lucide-react';

export default function AccountantPortalPage() {
  const { currentUser, settings, feePayments, students, expenses, recordFeePayment } = useSchool();

  const totalCollected = feePayments.reduce((acc, p) => acc + p.amountPaid, 0);
  const totalArrears = students.reduce((acc, s) => acc + s.balance, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [paymentAmount, setPaymentAmount] = useState(1450);
  const [paymentMethod, setPaymentMethod] = useState<'MTN Mobile Money' | 'Telecel Cash' | 'Bank Deposit' | 'Cash'>('MTN Mobile Money');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId && students.length === 0) return;
    const targetStudent = students.find(s => s.id === selectedStudentId) || students[0];
    if (!targetStudent) return;

    recordFeePayment({
      studentId: targetStudent.id,
      amountPaid: Number(paymentAmount),
      term: settings.currentTerm,
      academicYear: settings.academicYear,
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod,
      transactionReference: `MM-TAK-${Date.now().toString().slice(-6)}`,
      receivedBy: currentUser.name,
      notes: `Term 2 Tuition & Levies - ${targetStudent.firstName} ${targetStudent.lastName}`
    });

    setSuccessMsg('Payment recorded and receipt generated!');
    setTimeout(() => {
      setSuccessMsg('');
      setPaymentModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-school-navy-950 via-school-navy-900 to-school-navy-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Bursar & Accounts Office
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {currentUser.name}
          </h1>
          <p className="text-xs text-slate-300 mt-0.5">
            Finance & Fee Reconciliation for {settings.schoolName} ({settings.currentTerm})
          </p>
        </div>

        <button
          onClick={() => setPaymentModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Record Payment / Issue Receipt</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Term Collections</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {settings.currencySymbol} {totalCollected.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">{feePayments.length} receipts generated</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Outstanding Fee Arrears</p>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {settings.currencySymbol} {totalArrears.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">Total pupil balances</span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Operating Disbursements</p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {settings.currencySymbol} {totalExpenses.toLocaleString()}
          </p>
          <span className="text-[11px] text-slate-400">{expenses.length} approved expenses</span>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Recent Fee Payment Receipts</h3>
          <span className="text-xs text-slate-500">Official Electronic Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
              <tr>
                <th className="py-2.5 px-3">Receipt No</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Payment Channel</th>
                <th className="py-2.5 px-3">Transaction Reference</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feePayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No fee payment transactions recorded yet. Click &ldquo;Record Payment&rdquo; above to issue receipts.
                  </td>
                </tr>
              ) : (
                feePayments.slice(0, 10).map((p) => {
                  const s = students.find(stud => stud.id === p.studentId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-school-navy-900">{p.receiptNumber}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{s ? `${s.firstName} ${s.lastName}` : p.studentId}</td>
                      <td className="py-2.5 px-3 font-black text-emerald-700">{settings.currencySymbol} {p.amountPaid.toLocaleString()}</td>
                      <td className="py-2.5 px-3">{p.paymentMethod}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{p.transactionReference}</td>
                      <td className="py-2.5 px-3 text-slate-500">{p.paymentDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: RECORD PAYMENT */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center">
                <Receipt className="w-4 h-4 mr-2 text-emerald-600" />
                Record Fee Payment & Issue Receipt
              </h3>
              <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {successMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center space-x-2 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student</label>
                  {students.length === 0 ? (
                    <p className="text-slate-400 py-2 text-center bg-slate-50 rounded-lg">
                      No registered students found. Please enroll students first.
                    </p>
                  ) : (
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      {students.map(s => (
                        <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.admissionNo})</option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount Paid ({settings.currencySymbol})</label>
                  <input
                    type="number"
                    min={1}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Channel</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Telecel Cash">Telecel Cash</option>
                    <option value="Bank Deposit">Bank Deposit / Transfer</option>
                    <option value="Cash">Cash (School Bursar)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={students.length === 0}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-sm disabled:opacity-50"
                >
                  Generate Official Receipt
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
