'use client';

import React, { useState } from 'react';
import { useSchool } from '@/context/SchoolContext';
import { FeePayment, FeeItem, ExpenseRecord } from '@/types';
import {
  DollarSign,
  Plus,
  Printer,
  Receipt,
  Search,
  Filter,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
  Calendar,
  X,
  CreditCard,
  Building,
  Smartphone
} from 'lucide-react';

export default function FeesAdminPage() {
  const {
    settings,
    students,
    feeItems,
    feePayments,
    expenses,
    recordFeePayment,
    addFeeItem,
    addExpense
  } = useSchool();

  const [activeTab, setActiveTab] = useState<'payments' | 'debtors' | 'structure' | 'expenses'>('payments');
  const [search, setSearch] = useState('');

  // Modals
  const [recordPaymentModalOpen, setRecordPaymentModalOpen] = useState(false);
  const [addExpenseModalOpen, setAddExpenseModalOpen] = useState(false);
  const [addFeeItemModalOpen, setAddFeeItemModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  // Payment Form State
  const [paymentForm, setPaymentForm] = useState({
    studentId: students[0]?.id || '',
    amountPaid: 1000,
    paymentMethod: 'MTN Mobile Money' as FeePayment['paymentMethod'],
    transactionReference: `MM-GH-${Math.floor(10000000 + Math.random() * 90000000)}`,
    term: settings.currentTerm,
    academicYear: settings.academicYear,
    receivedBy: 'Mrs. Cecilia Owusu (Accounts)',
    notes: 'Tuition and levy part payment'
  });

  // Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    category: 'Utilities' as ExpenseRecord['category'],
    amount: 1500,
    recordedBy: 'Mrs. Cecilia Owusu',
    date: new Date().toISOString().split('T')[0]
  });

  // Fee Item Form State
  const [feeItemForm, setFeeItemForm] = useState({
    name: '',
    amount: 500,
    frequency: 'Per Term' as FeeItem['frequency'],
    applicableClassIds: [] as string[]
  });

  const totalCollected = feePayments.reduce((acc, p) => acc + p.amountPaid, 0);
  const totalArrears = students.reduce((acc, s) => acc + s.balance, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  const debtorsList = students.filter(s => s.balance > 0);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = recordFeePayment({
      studentId: paymentForm.studentId,
      amountPaid: Number(paymentForm.amountPaid),
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: paymentForm.paymentMethod,
      transactionReference: paymentForm.transactionReference,
      term: paymentForm.term,
      academicYear: paymentForm.academicYear,
      receivedBy: paymentForm.receivedBy,
      notes: paymentForm.notes
    });

    setRecordPaymentModalOpen(false);
    setActiveReceipt(newPayment);
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      title: expenseForm.title,
      category: expenseForm.category,
      amount: Number(expenseForm.amount),
      date: expenseForm.date,
      recordedBy: expenseForm.recordedBy,
      status: 'Approved'
    });
    setAddExpenseModalOpen(false);
    setExpenseForm({
      title: '',
      category: 'Utilities',
      amount: 1500,
      recordedBy: 'Mrs. Cecilia Owusu',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleFeeItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFeeItem({
      name: feeItemForm.name,
      amount: Number(feeItemForm.amount),
      applicableClassIds: [],
      frequency: feeItemForm.frequency
    });
    setAddFeeItemModalOpen(false);
    setFeeItemForm({
      name: '',
      amount: 500,
      frequency: 'Per Term',
      applicableClassIds: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Fees Collected (Term 2)</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {settings.currencySymbol} {totalCollected.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-400">{feePayments.length} recorded transactions</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Outstanding Arrears / Debtors</p>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {settings.currencySymbol} {totalArrears.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-400">{debtorsList.length} pupils with arrears</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Logged School Expenses</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {settings.currencySymbol} {totalExpenses.toLocaleString()}
            </p>
            <span className="text-[11px] text-slate-400">{expenses.length} operating disbursements</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Navigation Toolbar */}
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'payments'
                  ? 'bg-school-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Fee Payment Records ({feePayments.length})
            </button>
            <button
              onClick={() => setActiveTab('debtors')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'debtors'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Debtors List ({debtorsList.length})
            </button>
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'structure'
                  ? 'bg-school-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Fee Items & Levies ({feeItems.length})
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'expenses'
                  ? 'bg-school-navy-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Expenses ({expenses.length})
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {activeTab === 'structure' && (
              <button
                onClick={() => setAddFeeItemModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Fee Levy</span>
              </button>
            )}

            {activeTab === 'expenses' && (
              <button
                onClick={() => setAddExpenseModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-school-navy-900 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Record Expense</span>
              </button>
            )}

            <button
              onClick={() => setRecordPaymentModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Record Fee Payment</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PAYMENTS TABLE */}
        {activeTab === 'payments' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
                <tr>
                  <th className="py-3 px-4">Receipt No.</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Tx Reference</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Cashier</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feePayments.map((p) => {
                  const student = students.find(s => s.id === p.studentId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-school-navy-900">{p.receiptNumber}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {student ? `${student.firstName} ${student.lastName}` : p.studentId}
                        <span className="text-[10px] text-slate-400 block">{student?.admissionNo}</span>
                      </td>
                      <td className="py-3 px-4 font-black text-emerald-700 text-sm">
                        {settings.currencySymbol} {p.amountPaid.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-800">
                          {p.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">{p.transactionReference}</td>
                      <td className="py-3 px-4 text-slate-500">{p.paymentDate}</td>
                      <td className="py-3 px-4 text-slate-600">{p.receivedBy}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setActiveReceipt(p)}
                          className="px-2.5 py-1 rounded-lg bg-school-navy-50 hover:bg-school-navy-100 text-school-navy-900 font-bold text-xs"
                        >
                          View Receipt
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: DEBTORS LIST */}
        {activeTab === 'debtors' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50 text-rose-900 uppercase font-bold border-b border-rose-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Admission No.</th>
                  <th className="py-3 px-4">Guardian Contact</th>
                  <th className="py-3 px-4">Outstanding Arrears</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {debtorsList.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {d.firstName} {d.lastName}
                    </td>
                    <td className="py-3 px-4 font-mono">{d.admissionNo}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 block">{d.emergencyContact.name}</span>
                      <span className="text-[10px] text-slate-500">{d.emergencyContact.phone}</span>
                    </td>
                    <td className="py-3 px-4 font-black text-rose-600 text-sm">
                      {settings.currencySymbol} {d.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setPaymentForm({ ...paymentForm, studentId: d.id, amountPaid: d.balance });
                          setRecordPaymentModalOpen(true);
                        }}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                      >
                        Collect Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: FEE STRUCTURE ITEMS */}
        {activeTab === 'structure' && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feeItems.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">
                    {item.frequency}
                  </span>
                  <span className="font-black text-slate-900 text-base">
                    {settings.currencySymbol} {item.amount.toLocaleString()}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                <p className="text-[11px] text-slate-500">Applicable to all enrolled students for {settings.academicYear}.</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: EXPENSES TABLE */}
        {activeTab === 'expenses' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-b">
                <tr>
                  <th className="py-3 px-4">Expense Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Disbursed By</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{e.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold">{e.category}</span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900">
                      {settings.currencySymbol} {e.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{e.recordedBy}</td>
                    <td className="py-3 px-4 text-slate-500">{e.date}</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: RECORD FEE PAYMENT */}
      {recordPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Record Fee Payment</h3>
              <button onClick={() => setRecordPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Student *</label>
                <select
                  value={paymentForm.studentId}
                  onChange={(e) => setPaymentForm({ ...paymentForm, studentId: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.lastName} ({s.admissionNo}) — Arrears: {settings.currencySymbol}{s.balance}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount Paid ({settings.currencySymbol}) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={paymentForm.amountPaid}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amountPaid: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-black text-emerald-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method *</label>
                <select
                  value={paymentForm.paymentMethod}
                  onChange={(e) => setPaymentForm({ ...paymentForm, paymentMethod: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-semibold"
                >
                  <option value="MTN Mobile Money">MTN Mobile Money</option>
                  <option value="Telecel Cash">Telecel Cash</option>
                  <option value="Bank Deposit">Bank Deposit (GCB Bank)</option>
                  <option value="Cash">Cash at Accounts Office</option>
                  <option value="Cheque">Bank Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Ref / Cheque No.</label>
                <input
                  type="text"
                  required
                  value={paymentForm.transactionReference}
                  onChange={(e) => setPaymentForm({ ...paymentForm, transactionReference: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Remarks</label>
                <input
                  type="text"
                  value={paymentForm.notes}
                  onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setRecordPaymentModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs"
                >
                  Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE OFFICIAL FEE RECEIPT */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-2 border-school-navy-900 space-y-4">
            <div className="flex justify-between items-start border-b-2 border-school-navy-900 pb-4">
              <div>
                <h2 className="text-xl font-black text-school-navy-950 uppercase">{settings.schoolName}</h2>
                <p className="text-xs text-amber-700 font-bold uppercase">{settings.location}</p>
                <p className="text-[10px] text-slate-500">Tel: {settings.primaryPhone} • {settings.email}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold bg-school-navy-900 text-white px-2 py-0.5 rounded uppercase">Official Receipt</span>
                <p className="font-mono font-bold text-xs text-school-navy-900 mt-1">{activeReceipt.receiptNumber}</p>
                <p className="text-[10px] text-slate-400">{activeReceipt.paymentDate}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Received From (Student):</span>
                <span className="font-bold text-slate-900">
                  {students.find(s => s.id === activeReceipt.studentId)?.firstName} {students.find(s => s.id === activeReceipt.studentId)?.lastName}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Admission Number:</span>
                <span className="font-mono font-bold text-school-navy-900">
                  {students.find(s => s.id === activeReceipt.studentId)?.admissionNo}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Channel:</span>
                <span className="font-bold text-slate-900">{activeReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Transaction Reference:</span>
                <span className="font-mono text-slate-700">{activeReceipt.transactionReference}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Academic Period:</span>
                <span className="font-bold text-slate-900">{activeReceipt.term}, {activeReceipt.academicYear}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex justify-between items-center">
              <span className="font-bold text-xs text-slate-800 uppercase">Total Amount Received:</span>
              <span className="text-xl font-black text-school-navy-950">
                {settings.currencySymbol} {activeReceipt.amountPaid.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-end pt-4 border-t text-[11px] text-slate-500">
              <div>
                <p>Issued By: <strong>{activeReceipt.receivedBy}</strong></p>
                <p className="text-[10px]">{settings.schoolName} Accounts Department</p>
              </div>
              <div className="w-28 border-b border-slate-800 text-center pb-1 text-xs italic font-serif text-slate-800">
                Cecilia Owusu
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-school-navy-900 text-white font-bold text-xs rounded-xl flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD EXPENSE */}
      {addExpenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Record Operating Expense</h3>
            <form onSubmit={handleExpenseSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Expense Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ECG Power Recharge or Lab Chemicals"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                >
                  <option value="Utilities">Utilities (ECG / GWCL / Internet)</option>
                  <option value="Instructional Materials">Instructional Materials</option>
                  <option value="Transportation & Fuel">Transportation & Fuel</option>
                  <option value="Salaries">Salaries & Stipends</option>
                  <option value="Maintenance">Maintenance & Repairs</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount ({settings.currencySymbol})</label>
                <input
                  type="number"
                  required
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddExpenseModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD FEE ITEM */}
      {addFeeItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add New Fee Item or Levy</h3>
            <form onSubmit={handleFeeItemSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Levy / Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robotics Club Fee or Sports Levy"
                  value={feeItemForm.name}
                  onChange={(e) => setFeeItemForm({ ...feeItemForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount ({settings.currencySymbol}) *</label>
                <input
                  type="number"
                  required
                  value={feeItemForm.amount}
                  onChange={(e) => setFeeItemForm({ ...feeItemForm, amount: Number(e.target.value) })}
                  className="w-full text-xs px-3 py-2 border rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Billing Frequency</label>
                <select
                  value={feeItemForm.frequency}
                  onChange={(e) => setFeeItemForm({ ...feeItemForm, frequency: e.target.value as any })}
                  className="w-full text-xs px-3 py-2 border rounded-lg"
                >
                  <option value="Per Term">Per Term</option>
                  <option value="Annual">Annual</option>
                  <option value="One-Time">One-Time</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddFeeItemModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-school-navy-900 text-white rounded-xl"
                >
                  Add Fee Levy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
