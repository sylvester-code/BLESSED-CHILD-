'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Student,
  Parent,
  Teacher,
  SchoolClass,
  Subject,
  AssessmentScore,
  ReportCard,
  FeeItem,
  FeePayment,
  ExpenseRecord,
  AdmissionApplication,
  TimetableSlot,
  OnlineQuiz,
  QuizAttempt,
  HomeworkAssignment,
  HomeworkSubmission,
  LearningMaterial,
  LibraryBook,
  InventoryItem,
  SchoolAnnouncement,
  InternalMessage,
  AuditLog,
  SiteSettings,
  AttendanceRecord,
  SchoolPrefect
} from '../types';
import {
  initialSiteSettings,
  initialUsers,
  initialClasses,
  initialSubjects,
  initialTeachers,
  initialParents,
  initialStudents,
  initialAssessmentScores,
  initialFeeItems,
  initialFeePayments,
  initialExpenses,
  initialAdmissions,
  initialQuizzes,
  initialHomework,
  initialHomeworkSubmissions,
  initialLearningMaterials,
  initialLibraryBooks,
  initialInventory,
  initialAnnouncements,
  initialMessages,
  initialAuditLogs,
  initialTimetable,
  initialPrefects
} from '../data/initialData';

interface SchoolContextType {
  // Settings & Theme
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Auth & Roles
  currentUser: User;
  setCurrentUser: (user: User) => void;
  users: User[];
  switchRole: (role: UserRole) => void;
  addUser: (userData: Omit<User, 'id' | 'createdAt'>) => User;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  updateUserRole: (id: string, newRole: UserRole) => void;
  loginPortalUser: (usernameOrEmail: string, passwordInput: string) => { success: boolean; user?: User; redirectUrl?: string; error?: string };

  // Super Admin Credentials & Session
  adminCreds: { username: string; password: string };
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, password: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
  changeAdminPassword: (currentPassword: string, newPassword: string) => { success: boolean; error?: string };
  updateAdminCredentials: (username: string, newPassword?: string) => { success: boolean; error?: string };

  // Students & Academics
  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'admissionNo'>) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  promoteStudent: (id: string, toClassId: string) => void;

  // Teachers & Faculty Portal
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id' | 'staffId'>) => Teacher;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  activeTeacher: Teacher | null;
  loginTeacher: (username: string, password: string) => { success: boolean; teacher?: Teacher; error?: string };
  logoutTeacher: () => void;

  // Parents
  parents: Parent[];
  addParent: (parent: Omit<Parent, 'id'>) => Parent;
  deleteParent: (id: string) => void;

  // School Prefects
  prefects: SchoolPrefect[];
  addPrefect: (prefect: Omit<SchoolPrefect, 'id'>) => SchoolPrefect;
  updatePrefect: (id: string, updates: Partial<SchoolPrefect>) => void;
  deletePrefect: (id: string) => void;

  // Classes & Subjects
  classes: SchoolClass[];
  addClass: (cls: Omit<SchoolClass, 'id'>) => SchoolClass;
  updateClass: (id: string, updates: Partial<SchoolClass>) => void;
  deleteClass: (id: string) => void;
  subjects: Subject[];
  addSubject: (sub: Omit<Subject, 'id'>) => Subject;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;

  // Attendance
  attendance: AttendanceRecord[];
  markAttendance: (classId: string, date: string, records: { studentId: string; status: 'Present' | 'Absent' | 'Late' | 'Excused' }[]) => void;

  // Assessments & Scores
  assessmentScores: AssessmentScore[];
  saveAssessmentScore: (score: Omit<AssessmentScore, 'id' | 'continuousAssessmentTotal' | 'totalScore' | 'grade' | 'gradeRemark'>) => AssessmentScore;
  generateTerminalReport: (studentId: string, term: 'Term 1' | 'Term 2' | 'Term 3') => ReportCard;

  // Fees & Finance
  feeItems: FeeItem[];
  addFeeItem: (item: Omit<FeeItem, 'id'>) => FeeItem;
  deleteFeeItem: (id: string) => void;
  feePayments: FeePayment[];
  recordFeePayment: (payment: Omit<FeePayment, 'id' | 'receiptNumber'>) => FeePayment;
  deleteFeePayment: (id: string) => void;
  expenses: ExpenseRecord[];
  addExpense: (expense: Omit<ExpenseRecord, 'id'>) => ExpenseRecord;
  deleteExpense: (id: string) => void;

  // Admissions
  admissions: AdmissionApplication[];
  submitAdmissionApplication: (app: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'submissionDate' | 'status'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], interviewDate?: string, notes?: string) => void;
  convertAdmissionToStudent: (applicationId: string, targetClassId?: string) => Student;
  deleteAdmission: (id: string) => void;

  // Quizzes & Online CBT
  quizzes: OnlineQuiz[];
  addQuiz: (quiz: Omit<OnlineQuiz, 'id'>) => OnlineQuiz;
  deleteQuiz: (id: string) => void;
  quizAttempts: QuizAttempt[];
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'submittedAt'>) => QuizAttempt;

  // Homework & Materials
  homework: HomeworkAssignment[];
  addHomework: (hw: Omit<HomeworkAssignment, 'id'>) => HomeworkAssignment;
  deleteHomework: (id: string) => void;
  homeworkSubmissions: HomeworkSubmission[];
  submitHomework: (submission: Omit<HomeworkSubmission, 'id' | 'submittedAt'>) => HomeworkSubmission;
  gradeHomework: (submissionId: string, score: number, feedback: string) => void;
  learningMaterials: LearningMaterial[];
  addLearningMaterial: (lm: Omit<LearningMaterial, 'id' | 'dateUploaded'>) => LearningMaterial;
  deleteLearningMaterial: (id: string) => void;

  // Library & Inventory
  libraryBooks: LibraryBook[];
  borrowBook: (bookId: string, studentId: string) => void;
  returnBook: (bookId: string) => void;
  deleteLibraryBook: (id: string) => void;
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'assetTag'>) => InventoryItem;
  deleteInventoryItem: (id: string) => void;

  // Communication & Timetable
  announcements: SchoolAnnouncement[];
  addAnnouncement: (anc: Omit<SchoolAnnouncement, 'id' | 'datePosted'>) => SchoolAnnouncement;
  deleteAnnouncement: (id: string) => void;
  messages: InternalMessage[];
  sendMessage: (msg: Omit<InternalMessage, 'id' | 'sentAt' | 'read'>) => InternalMessage;
  markMessageRead: (id: string) => void;
  timetable: TimetableSlot[];
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => { success: boolean; error?: string };

  // Audit
  auditLogs: AuditLog[];
  logAuditEvent: (module: AuditLog['module'], action: string, recordAffected?: string) => void;

  // Tombstones & State
  deletedIds: string[];

  // Reset to demo
  resetToDemo: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

// Helper for Grade calculation based on NaCCA Ghana standard
export function calculateGrade(total: number, scale: 'NaCCA_9_POINT' | 'LETTER_GRADE_AF' = 'NaCCA_9_POINT'): { grade: string; remark: string } {
  if (scale === 'NaCCA_9_POINT') {
    if (total >= 80) return { grade: '1', remark: 'Highest Distinction' };
    if (total >= 70) return { grade: '2', remark: 'Higher Distinction' };
    if (total >= 65) return { grade: '3', remark: 'High (Very Good)' };
    if (total >= 60) return { grade: '4', remark: 'Credit (Good)' };
    if (total >= 55) return { grade: '5', remark: 'Credit' };
    if (total >= 50) return { grade: '6', remark: 'Pass' };
    if (total >= 45) return { grade: '7', remark: 'Pass' };
    if (total >= 40) return { grade: '8', remark: 'Weak Pass' };
    return { grade: '9', remark: 'Fail' };
  } else {
    if (total >= 80) return { grade: 'A1', remark: 'Excellent' };
    if (total >= 70) return { grade: 'B2', remark: 'Very Good' };
    if (total >= 65) return { grade: 'B3', remark: 'Good' };
    if (total >= 60) return { grade: 'C4', remark: 'Credit' };
    if (total >= 55) return { grade: 'C5', remark: 'Credit' };
    if (total >= 50) return { grade: 'C6', remark: 'Credit' };
    if (total >= 45) return { grade: 'D7', remark: 'Pass' };
    if (total >= 40) return { grade: 'E8', remark: 'Pass' };
    return { grade: 'F9', remark: 'Fail' };
  }
}

export const THEME_PALETTES: Record<string, {
  name: string;
  navy950: string;
  navy900: string;
  navy800: string;
  navy700: string;
  navy600: string;
  navy500: string;
  navy400: string;
  navy300: string;
  navy200: string;
  navy100: string;
  navy50: string;
  gold500: string;
  gold400: string;
}> = {
  'navy-gold': {
    name: 'Classic Royal Navy & Gold',
    navy950: '#0b1c3d',
    navy900: '#0f2b5c',
    navy800: '#11329e',
    navy700: '#0e39c4',
    navy600: '#144ee9',
    navy500: '#2b6bf8',
    navy400: '#5993ff',
    navy300: '#8eb9ff',
    navy200: '#bcd3ff',
    navy100: '#d9e6ff',
    navy50: '#eef4ff',
    gold500: '#d4a712',
    gold400: '#eec520',
  },
  'emerald-gold': {
    name: 'Majestic Emerald & Gold',
    navy950: '#042316',
    navy900: '#064e3b',
    navy800: '#065f46',
    navy700: '#047857',
    navy600: '#059669',
    navy500: '#10b981',
    navy400: '#34d399',
    navy300: '#6ee7b7',
    navy200: '#a7f3d0',
    navy100: '#d1fae5',
    navy50: '#ecfdf5',
    gold500: '#d97706',
    gold400: '#f59e0b',
  },
  'burgundy-gold': {
    name: 'Imperial Burgundy & Champagne',
    navy950: '#270711',
    navy900: '#4c0519',
    navy800: '#700c2a',
    navy700: '#881337',
    navy600: '#9f1239',
    navy500: '#be123c',
    navy400: '#e11d48',
    navy300: '#f43f5e',
    navy200: '#fda4af',
    navy100: '#ffe4e6',
    navy50: '#fff1f2',
    gold500: '#d97706',
    gold400: '#f59e0b',
  },
  'sapphire-amber': {
    name: 'Electric Sapphire & Amber',
    navy950: '#031738',
    navy900: '#172554',
    navy800: '#1e3a8a',
    navy700: '#1d4ed8',
    navy600: '#2563eb',
    navy500: '#3b82f6',
    navy400: '#60a5fa',
    navy300: '#93c5fd',
    navy200: '#bfdbfe',
    navy100: '#dbeafe',
    navy50: '#eff6ff',
    gold500: '#d97706',
    gold400: '#f59e0b',
  },
  'amethyst-gold': {
    name: 'Regal Royal Purple & Gold',
    navy950: '#1a052e',
    navy900: '#3b0764',
    navy800: '#581c87',
    navy700: '#6b21a8',
    navy600: '#7e22ce',
    navy500: '#9333ea',
    navy400: '#a855f7',
    navy300: '#c084fc',
    navy200: '#e9d5ff',
    navy100: '#f3e8ff',
    navy50: '#faf5ff',
    gold500: '#d97706',
    gold400: '#f59e0b',
  },
  'obsidian-cyan': {
    name: 'Modern Obsidian & Cyan',
    navy950: '#020617',
    navy900: '#0f172a',
    navy800: '#1e293b',
    navy700: '#334155',
    navy600: '#475569',
    navy500: '#64748b',
    navy400: '#94a3b8',
    navy300: '#cbd5e1',
    navy200: '#e2e8f0',
    navy100: '#f1f5f9',
    navy50: '#f8fafc',
    gold500: '#0891b2',
    gold400: '#06b6d4',
  }
};

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state keys
  const [isClient, setIsClient] = useState(false);

  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [prefects, setPrefects] = useState<SchoolPrefect[]>(initialPrefects);
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [classes, setClasses] = useState<SchoolClass[]>(initialClasses);
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [assessmentScores, setAssessmentScores] = useState<AssessmentScore[]>(initialAssessmentScores);
  const [feeItems, setFeeItems] = useState<FeeItem[]>(initialFeeItems);
  const [feePayments, setFeePayments] = useState<FeePayment[]>(initialFeePayments);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(initialExpenses);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(initialAdmissions);
  const [quizzes, setQuizzes] = useState<OnlineQuiz[]>(initialQuizzes);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [homework, setHomework] = useState<HomeworkAssignment[]>(initialHomework);
  const [homeworkSubmissions, setHomeworkSubmissions] = useState<HomeworkSubmission[]>(initialHomeworkSubmissions);
  const [learningMaterials, setLearningMaterials] = useState<LearningMaterial[]>(initialLearningMaterials);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(initialLibraryBooks);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(initialAnnouncements);
  const [messages, setMessages] = useState<InternalMessage[]>(initialMessages);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [timetable, setTimetable] = useState<TimetableSlot[]>(initialTimetable);

  // Super Admin Master Credentials & Auth Session
  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string }>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('blessed_admin_creds');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.username && parsed?.password) return parsed;
        } catch {
          // ignore error
        }
      }
    }
    return {
      username: 'BLESSED',
      password: '2026'
    };
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('blessed_admin_session') === 'true';
    }
    return false;
  });
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  // Persistent Tombstone tracking of all deleted IDs across the entire system
  const [deletedIds, setDeletedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('blessed_deleted_ids');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Central deletion recorder: records IDs to persistent tombstones immediately
  const recordDeletion = (idsToRecord: string | string[]) => {
    const arr = (Array.isArray(idsToRecord) ? idsToRecord : [idsToRecord]).filter(Boolean);
    if (arr.length === 0) return;
    setDeletedIds(prev => {
      const merged = Array.from(new Set([...prev, ...arr]));
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('blessed_deleted_ids', JSON.stringify(merged));
        } catch {
          // ignore
        }
      }
      return merged;
    });
  };

  // Helper to filter out any student or teacher accounts unless created by Super Admin
  const filterAuthorizedUsers = (userList: User[], teacherList: Teacher[]): User[] => {
    return userList.filter(u => {
      if (u.role === 'TEACHER') {
        return (
          u.createdBy === 'SUPER_ADMIN' ||
          (u.linkedTeacherId && teacherList.some(t => t.id === u.linkedTeacherId))
        );
      }
      if (u.role === 'STUDENT') {
        return u.createdBy === 'SUPER_ADMIN';
      }
      return true;
    });
  };

  // Live Server Sync helper
  const syncServer = (payload: {
    deletedIds?: string[];
    settings?: Partial<SiteSettings>;
    announcements?: SchoolAnnouncement[];
    teachers?: Teacher[];
    students?: Student[];
    parents?: Parent[];
    users?: User[];
    prefects?: SchoolPrefect[];
    classes?: SchoolClass[];
    subjects?: Subject[];
    feePayments?: FeePayment[];
    expenses?: ExpenseRecord[];
    feeItems?: FeeItem[];
    admissions?: AdmissionApplication[];
    assessmentScores?: AssessmentScore[];
    libraryBooks?: LibraryBook[];
    inventory?: InventoryItem[];
    quizzes?: OnlineQuiz[];
    homework?: HomeworkAssignment[];
    learningMaterials?: LearningMaterial[];
  }) => {
    try {
      fetch('/api/school-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  // Load from localStorage on client mount & sync authoritative data from server
  useEffect(() => {
    setIsClient(true);
    let loadedTeachers: Teacher[] = [];
    let localDeletedSet = new Set<string>();

    try {
      // Load deleted IDs tombstones first
      const storedDeleted = localStorage.getItem('blessed_deleted_ids');
      if (storedDeleted) {
        try {
          const parsed = JSON.parse(storedDeleted);
          if (Array.isArray(parsed)) {
            localDeletedSet = new Set(parsed);
            setDeletedIds(parsed);
          }
        } catch {
          // ignore
        }
      }

      // Clean slate migration
      const storageVersion = localStorage.getItem('blessed_clean_version');
      if (storageVersion !== 'v10_permanent_deletions_and_tombstones') {
        localStorage.removeItem('blessed_students');
        localStorage.removeItem('blessed_teachers');
        localStorage.removeItem('blessed_parents');
        localStorage.removeItem('blessed_scores');
        localStorage.removeItem('blessed_payments');
        localStorage.removeItem('blessed_expenses');
        localStorage.removeItem('blessed_admissions');
        localStorage.removeItem('blessed_prefects');
        localStorage.removeItem('blessed_attendance');
        localStorage.removeItem('blessed_users');
        localStorage.removeItem('blessed_active_teacher');
        localStorage.removeItem('blessed_settings');
        localStorage.setItem('blessed_admin_creds', JSON.stringify({ username: 'BLESSED', password: '2026' }));
        localStorage.setItem('blessed_clean_version', 'v10_permanent_deletions_and_tombstones');
        setAdminCreds({ username: 'BLESSED', password: '2026' });
        setStudents([]);
        setTeachers([]);
        setParents([]);
        setPrefects([]);
        setAdmissions([]);
        setFeePayments([]);
        setExpenses([]);
        setUsers([initialUsers[0]]);
      }

      const storedCreds = localStorage.getItem('blessed_admin_creds');
      if (storedCreds) {
        try {
          const parsed = JSON.parse(storedCreds);
          if (parsed?.username && parsed?.password) setAdminCreds(parsed);
        } catch {
          // ignore
        }
      }

      const storedAdminSession = localStorage.getItem('blessed_admin_session');
      if (storedAdminSession === 'true') setIsAdminAuthenticated(true);

      const storedSettings = localStorage.getItem('blessed_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedTeachers = localStorage.getItem('blessed_teachers');
      if (storedTeachers) {
        const parsedT = JSON.parse(storedTeachers).filter((t: Teacher) => !localDeletedSet.has(t.id));
        loadedTeachers = parsedT;
        setTeachers(parsedT);
      }

      const storedStudents = localStorage.getItem('blessed_students');
      if (storedStudents) {
        setStudents(JSON.parse(storedStudents).filter((s: Student) => !localDeletedSet.has(s.id)));
      }

      const storedParents = localStorage.getItem('blessed_parents');
      if (storedParents) {
        setParents(JSON.parse(storedParents).filter((p: Parent) => !localDeletedSet.has(p.id)));
      }

      const storedUsers = localStorage.getItem('blessed_users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers).filter((u: User) => !localDeletedSet.has(u.id));
        setUsers(filterAuthorizedUsers(parsedUsers, loadedTeachers));
      }

      const storedUser = localStorage.getItem('blessed_user');
      if (storedUser) {
        const parsedU = JSON.parse(storedUser);
        if (parsedU.role !== 'TEACHER' && parsedU.role !== 'STUDENT') {
          setCurrentUser(parsedU);
        }
      }

      const storedPrefects = localStorage.getItem('blessed_prefects');
      if (storedPrefects) {
        setPrefects(JSON.parse(storedPrefects).filter((p: SchoolPrefect) => !localDeletedSet.has(p.id)));
      }

      const storedActiveTeacher = localStorage.getItem('blessed_active_teacher');
      if (storedActiveTeacher) {
        const parsedActive = JSON.parse(storedActiveTeacher);
        if (!localDeletedSet.has(parsedActive.id)) {
          setActiveTeacher(parsedActive);
        }
      }

      const storedAdmissions = localStorage.getItem('blessed_admissions');
      if (storedAdmissions) {
        setAdmissions(JSON.parse(storedAdmissions).filter((a: AdmissionApplication) => !localDeletedSet.has(a.id)));
      }

      const storedScores = localStorage.getItem('blessed_scores');
      if (storedScores) {
        setAssessmentScores(JSON.parse(storedScores).filter((sc: AssessmentScore) => !localDeletedSet.has(sc.id) && !localDeletedSet.has(sc.studentId)));
      }

      const storedPayments = localStorage.getItem('blessed_payments');
      if (storedPayments) {
        setFeePayments(JSON.parse(storedPayments).filter((fp: FeePayment) => !localDeletedSet.has(fp.id) && !localDeletedSet.has(fp.studentId)));
      }

      const storedExpenses = localStorage.getItem('blessed_expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses).filter((e: ExpenseRecord) => !localDeletedSet.has(e.id)));
      }

      const storedClasses = localStorage.getItem('blessed_classes');
      if (storedClasses) {
        setClasses(JSON.parse(storedClasses).filter((c: SchoolClass) => !localDeletedSet.has(c.id)));
      }

      const storedSubjects = localStorage.getItem('blessed_subjects');
      if (storedSubjects) {
        setSubjects(JSON.parse(storedSubjects).filter((sub: Subject) => !localDeletedSet.has(sub.id)));
      }

      const storedFeeItems = localStorage.getItem('blessed_fee_items');
      if (storedFeeItems) {
        setFeeItems(JSON.parse(storedFeeItems).filter((f: FeeItem) => !localDeletedSet.has(f.id)));
      }

      const storedInventory = localStorage.getItem('blessed_inventory');
      if (storedInventory) {
        setInventory(JSON.parse(storedInventory).filter((i: InventoryItem) => !localDeletedSet.has(i.id)));
      }

      const storedLibraryBooks = localStorage.getItem('blessed_library_books');
      if (storedLibraryBooks) {
        setLibraryBooks(JSON.parse(storedLibraryBooks).filter((b: LibraryBook) => !localDeletedSet.has(b.id)));
      }

      const storedQuizzes = localStorage.getItem('blessed_quizzes');
      if (storedQuizzes) {
        setQuizzes(JSON.parse(storedQuizzes).filter((q: OnlineQuiz) => !localDeletedSet.has(q.id)));
      }

      const storedHomework = localStorage.getItem('blessed_homework');
      if (storedHomework) {
        setHomework(JSON.parse(storedHomework).filter((h: HomeworkAssignment) => !localDeletedSet.has(h.id)));
      }

      const storedMaterials = localStorage.getItem('blessed_learning_materials');
      if (storedMaterials) {
        setLearningMaterials(JSON.parse(storedMaterials).filter((m: LearningMaterial) => !localDeletedSet.has(m.id)));
      }
    } catch {
      // ignore
    }

    // Fetch authoritative live data from server and apply tombstone filtering
    fetch('/api/school-data')
      .then(res => res.json())
      .then(data => {
        if (!data) return;

        // Combine server tombstones and client tombstones
        const activeTombstone = new Set([
          ...Array.from(localDeletedSet),
          ...(Array.isArray(data.deletedIds) ? data.deletedIds : [])
        ]);

        if (activeTombstone.size > 0) {
          const combinedArr = Array.from(activeTombstone);
          setDeletedIds(combinedArr);
          try {
            localStorage.setItem('blessed_deleted_ids', JSON.stringify(combinedArr));
          } catch {
            // ignore
          }
        }

        if (data.settings) setSettings(prev => ({ ...prev, ...data.settings }));
        if (Array.isArray(data.announcements)) {
          setAnnouncements(data.announcements.filter((a: SchoolAnnouncement) => !activeTombstone.has(a.id)));
        }
        if (Array.isArray(data.teachers)) {
          const filteredT = data.teachers.filter((t: Teacher) => !activeTombstone.has(t.id));
          setTeachers(filteredT);
          loadedTeachers = filteredT;
        }
        if (Array.isArray(data.students)) {
          setStudents(data.students.filter((s: Student) => !activeTombstone.has(s.id)));
        }
        if (Array.isArray(data.parents)) {
          setParents(data.parents.filter((p: Parent) => !activeTombstone.has(p.id)));
        }
        if (Array.isArray(data.prefects)) {
          setPrefects(data.prefects.filter((p: SchoolPrefect) => !activeTombstone.has(p.id)));
        }
        if (Array.isArray(data.feePayments)) {
          setFeePayments(data.feePayments.filter((fp: FeePayment) => !activeTombstone.has(fp.id) && !activeTombstone.has(fp.studentId)));
        }
        if (Array.isArray(data.expenses)) {
          setExpenses(data.expenses.filter((e: ExpenseRecord) => !activeTombstone.has(e.id)));
        }
        if (Array.isArray(data.admissions)) {
          setAdmissions(data.admissions.filter((a: AdmissionApplication) => !activeTombstone.has(a.id)));
        }
        if (Array.isArray(data.assessmentScores)) {
          setAssessmentScores(data.assessmentScores.filter((sc: AssessmentScore) => !activeTombstone.has(sc.id) && !activeTombstone.has(sc.studentId)));
        }
        if (Array.isArray(data.libraryBooks)) {
          setLibraryBooks(data.libraryBooks.filter((b: LibraryBook) => !activeTombstone.has(b.id)));
        }
        if (Array.isArray(data.inventory)) {
          setInventory(data.inventory.filter((i: InventoryItem) => !activeTombstone.has(i.id)));
        }
        if (Array.isArray(data.quizzes)) {
          setQuizzes(data.quizzes.filter((q: OnlineQuiz) => !activeTombstone.has(q.id)));
        }
        if (Array.isArray(data.homework)) {
          setHomework(data.homework.filter((h: HomeworkAssignment) => !activeTombstone.has(h.id)));
        }
        if (Array.isArray(data.learningMaterials)) {
          setLearningMaterials(data.learningMaterials.filter((m: LearningMaterial) => !activeTombstone.has(m.id)));
        }
        if (Array.isArray(data.users)) {
          const filteredU = data.users.filter((u: User) => !activeTombstone.has(u.id) && (!u.linkedTeacherId || !activeTombstone.has(u.linkedTeacherId)));
          setUsers(filterAuthorizedUsers(filteredU, loadedTeachers));
        }
      })
      .catch(() => {});
  }, []);

  // Save to localStorage and live server whenever critical items update
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem('blessed_deleted_ids', JSON.stringify(deletedIds));
      localStorage.setItem('blessed_settings', JSON.stringify(settings));
      localStorage.setItem('blessed_users', JSON.stringify(users));
      localStorage.setItem('blessed_students', JSON.stringify(students));
      localStorage.setItem('blessed_teachers', JSON.stringify(teachers));
      localStorage.setItem('blessed_parents', JSON.stringify(parents));
      localStorage.setItem('blessed_prefects', JSON.stringify(prefects));
      localStorage.setItem('blessed_classes', JSON.stringify(classes));
      localStorage.setItem('blessed_subjects', JSON.stringify(subjects));
      localStorage.setItem('blessed_fee_items', JSON.stringify(feeItems));
      localStorage.setItem('blessed_admissions', JSON.stringify(admissions));
      localStorage.setItem('blessed_scores', JSON.stringify(assessmentScores));
      localStorage.setItem('blessed_payments', JSON.stringify(feePayments));
      localStorage.setItem('blessed_expenses', JSON.stringify(expenses));
      localStorage.setItem('blessed_library_books', JSON.stringify(libraryBooks));
      localStorage.setItem('blessed_inventory', JSON.stringify(inventory));
      localStorage.setItem('blessed_quizzes', JSON.stringify(quizzes));
      localStorage.setItem('blessed_homework', JSON.stringify(homework));
      localStorage.setItem('blessed_learning_materials', JSON.stringify(learningMaterials));
      localStorage.setItem('blessed_user', JSON.stringify(currentUser));
      localStorage.setItem('blessed_admin_creds', JSON.stringify(adminCreds));
      if (activeTeacher) {
        localStorage.setItem('blessed_active_teacher', JSON.stringify(activeTeacher));
      } else {
        localStorage.removeItem('blessed_active_teacher');
      }

      // Automatically sync live to server
      syncServer({
        deletedIds,
        settings,
        users,
        students,
        teachers,
        parents,
        prefects,
        classes,
        subjects,
        feeItems,
        admissions,
        feePayments,
        expenses,
        assessmentScores,
        announcements,
        libraryBooks,
        inventory,
        quizzes,
        homework,
        learningMaterials
      });
    } catch {
      // ignore
    }
  }, [
    deletedIds,
    settings,
    users,
    students,
    teachers,
    parents,
    prefects,
    classes,
    subjects,
    feeItems,
    admissions,
    assessmentScores,
    feePayments,
    expenses,
    libraryBooks,
    inventory,
    quizzes,
    homework,
    learningMaterials,
    announcements,
    currentUser,
    adminCreds,
    activeTeacher,
    isClient
  ]);

  // Dynamically apply Theme CSS Variables and Document Title on mount & updates
  useEffect(() => {
    if (typeof document === 'undefined') return;
    try {
      const preset = settings.themePreset || 'navy-gold';
      const palette = (THEME_PALETTES as any)[preset] || THEME_PALETTES['navy-gold'];
      const root = document.documentElement;

      root.style.setProperty('--theme-navy-950', palette.navy950);
      root.style.setProperty('--theme-navy-900', palette.navy900);
      root.style.setProperty('--theme-navy-800', palette.navy800);
      root.style.setProperty('--theme-navy-700', palette.navy700);
      root.style.setProperty('--theme-navy-600', palette.navy600);
      root.style.setProperty('--theme-navy-500', palette.navy500);
      root.style.setProperty('--theme-navy-400', palette.navy400);
      root.style.setProperty('--theme-navy-300', palette.navy300);
      root.style.setProperty('--theme-navy-200', palette.navy200);
      root.style.setProperty('--theme-navy-100', palette.navy100);
      root.style.setProperty('--theme-navy-50', palette.navy50);

      root.style.setProperty('--theme-gold-500', palette.gold500);
      root.style.setProperty('--theme-gold-400', palette.gold400);

      if (settings.schoolName) {
        document.title = `${settings.schoolName} | ${settings.locationCity || settings.city || 'Ghana'}`;
      }
    } catch {
      // ignore
    }
  }, [settings.themePreset, settings.schoolName, settings.locationCity, settings.city]);

  const logAuditEvent = (module: AuditLog['module'], action: string, recordAffected?: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      module,
      action,
      recordAffected,
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAuditEvent('Settings', 'Updated school site settings and configurations');
      // Push changes to server so all visitors see the latest data immediately
      try {
        fetch('/api/school-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings: updated })
        }).catch(() => { /* silent – local state still updated */ });
      } catch { /* ignore */ }
      return updated;
    });
  };

  const switchRole = (role: UserRole) => {
    const matchingUser = users.find(u => u.role === role);
    if (matchingUser) {
      setCurrentUser(matchingUser);
      logAuditEvent('Users & Roles', `Switched active session to role ${role} (${matchingUser.name})`);
    } else if (role !== 'TEACHER' && role !== 'STUDENT') {
      // create temporary user only for non-faculty/non-student roles
      const tempUser: User = {
        id: `usr-role-${role.toLowerCase()}`,
        name: `${role.replace('_', ' ')} Demo User`,
        email: `${role.toLowerCase()}@blessedchildschool.edu.gh`,
        role,
        username: role.toLowerCase(),
        phone: "+233 24 000 0000",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCurrentUser(tempUser);
      logAuditEvent('Users & Roles', `Switched active session to role ${role}`);
    }
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdBy: 'SUPER_ADMIN',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => {
      const updated = [newUser, ...prev];
      syncServer({ users: updated });
      return updated;
    });
    logAuditEvent('Users & Roles', `Super Administrator registered user ${newUser.name} with role ${newUser.role} (Username: ${newUser.username})`);
    return newUser;
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => {
      const updated = prev.map(u => u.id === id ? { ...u, ...updates } : u);
      syncServer({ users: updated });
      return updated;
    });
    if (currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, ...updates }));
    }
    logAuditEvent('Users & Roles', `Super Administrator updated account details for user ID: ${id}`);
  };

  const updateUserRole = (id: string, newRole: UserRole) => {
    setUsers(prev => {
      const updated = prev.map(u => {
        if (u.id === id) {
          logAuditEvent('Users & Roles', `Super Administrator reassigned role for ${u.name} from ${u.role} to ${newRole}`);
          return { ...u, role: newRole };
        }
        return u;
      });
      syncServer({ users: updated });
      return updated;
    });
    if (currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, role: newRole }));
    }
  };

  const deleteUser = (id: string) => {
    const target = users.find(u => u.id === id);
    recordDeletion(id);
    setUsers(prev => {
      const updated = prev.filter(u => u.id !== id);
      try {
        localStorage.setItem('blessed_users', JSON.stringify(updated));
      } catch {
        // ignore
      }
      syncServer({ deletedIds: [id], users: updated });
      return updated;
    });
    logAuditEvent('Users & Roles', `Super Administrator removed user account ${target?.name || id}`);
  };

  const loginPortalUser = (usernameOrEmailInput: string, passwordInput: string): { success: boolean; user?: User; redirectUrl?: string; error?: string } => {
    const trimmed = (usernameOrEmailInput || '').trim().toLowerCase();
    const cleanPass = (passwordInput || '').trim();

    // 0. Super Admin master credentials match - ALWAYS unlocks admin portal
    const isMasterAdmin =
      (trimmed === 'blessed' || trimmed === (adminCreds?.username || 'blessed').toLowerCase()) &&
      (cleanPass === '2026' || passwordInput === adminCreds?.password || cleanPass === (adminCreds?.password || '').trim());

    if (isMasterAdmin) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('blessed_admin_session', 'true');
      }
      const adminUser = users.find(u => u.role === 'SUPER_ADMIN') || initialUsers[0];
      setCurrentUser(adminUser);
      logAuditEvent('Users & Roles', `Super Administrator authenticated via Master Credentials (BLESSED)`);
      return { success: true, user: adminUser, redirectUrl: '/admin-portal' };
    }

    // 1. Search in persistent registered users assigned by Super Admin
    const matchedUser = users.find(
      u => (u.username && u.username.toLowerCase() === trimmed) ||
           (u.email && u.email.toLowerCase() === trimmed)
    );

    if (matchedUser) {
      const passMatches =
        matchedUser.password === passwordInput ||
        matchedUser.password === cleanPass ||
        (matchedUser.role === 'SUPER_ADMIN' && cleanPass === '2026');

      if (!passMatches) {
        return { success: false, error: 'Incorrect password for this user account.' };
      }

      setCurrentUser(matchedUser);

      // If linked to a teacher, activate teacher context
      if (matchedUser.role === 'TEACHER' || matchedUser.linkedTeacherId) {
        const matchedTeacher = teachers.find(
          t => t.id === matchedUser.linkedTeacherId ||
               t.username?.toLowerCase() === trimmed ||
               t.email?.toLowerCase() === trimmed
        );
        if (matchedTeacher) {
          setActiveTeacher(matchedTeacher);
        }
      }

      // Route dynamically according to the interconnected role assigned by Super Admin
      let redirectUrl = '/portal';
      if (matchedUser.role === 'TEACHER') {
        redirectUrl = '/portal/teacher';
      } else if (matchedUser.role === 'ACCOUNTANT') {
        redirectUrl = '/portal/accountant';
      } else if (matchedUser.role === 'ADMISSIONS_OFFICER') {
        redirectUrl = '/portal/admissions-officer';
      } else if (
        matchedUser.role === 'SUPER_ADMIN' ||
        matchedUser.role === 'HEADTEACHER' ||
        matchedUser.role === 'SCHOOL_ADMIN' ||
        matchedUser.role === 'LIBRARIAN' ||
        matchedUser.role === 'RECEPTIONIST' ||
        matchedUser.role === 'STAFF'
      ) {
        setIsAdminAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem('blessed_admin_session', 'true');
        }
        redirectUrl = '/admin-portal';
      }

      logAuditEvent('Users & Roles', `User ${matchedUser.name} (${matchedUser.role}) authenticated via Portal Login`);
      return { success: true, user: matchedUser, redirectUrl };
    }

    // 2. Fallback check directly in teachers list
    const matchedTeacher = teachers.find(
      t => (t.username && t.username.toLowerCase() === trimmed) ||
           (t.email && t.email.toLowerCase() === trimmed) ||
           (t.staffId && t.staffId.toLowerCase() === trimmed)
    );

    if (matchedTeacher) {
      if (matchedTeacher.password && matchedTeacher.password !== passwordInput && matchedTeacher.password !== cleanPass) {
        return { success: false, error: 'Incorrect password for this teacher account.' };
      }
      setActiveTeacher(matchedTeacher);
      const teacherUser: User = {
        id: `usr-tch-${matchedTeacher.id}`,
        name: matchedTeacher.fullName,
        email: matchedTeacher.email,
        role: 'TEACHER',
        username: matchedTeacher.username || 'teacher',
        linkedTeacherId: matchedTeacher.id,
        createdAt: matchedTeacher.employmentDate
      };
      setCurrentUser(teacherUser);
      logAuditEvent('Users & Roles', `Teacher ${matchedTeacher.fullName} authenticated via Portal Login`);
      return { success: true, user: teacherUser, redirectUrl: '/portal/teacher' };
    }

    // 3. Super Admin master credentials fallback
    if (trimmed === (adminCreds?.username || 'blessed').toLowerCase() && (cleanPass === '2026' || cleanPass === (adminCreds?.password || '').trim())) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('blessed_admin_session', 'true');
      }
      const adminUser = users.find(u => u.role === 'SUPER_ADMIN') || initialUsers[0];
      setCurrentUser(adminUser);
      return { success: true, user: adminUser, redirectUrl: '/admin-portal' };
    }

    return {
      success: false,
      error: 'Account not found. Please contact the Super Administrator to verify your assigned role and credentials.'
    };
  };

  const loginAdmin = (usernameInput: string, passwordInput: string): { success: boolean; error?: string } => {
    const cleanUser = (usernameInput || '').trim().toUpperCase();
    const cleanPass = (passwordInput || '').trim();

    // Master credentials: BLESSED and 2026 always authenticate
    const isMasterMatch = cleanUser === 'BLESSED' && cleanPass === '2026';

    const isConfigMatch =
      cleanUser === (adminCreds?.username || 'BLESSED').trim().toUpperCase() &&
      (passwordInput === adminCreds?.password || cleanPass === (adminCreds?.password || '').trim());

    if (isMasterMatch || isConfigMatch) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('blessed_admin_session', 'true');
      }
      const adminUser = users.find(u => u.role === 'SUPER_ADMIN') || initialUsers[0];
      setCurrentUser(adminUser);
      logAuditEvent('Settings', `Super Administrator logged in with username: ${usernameInput.trim()}`);
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid administrator credentials. Please check your username and master password.'
    };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blessed_admin_session');
    }
    logAuditEvent('Settings', 'Super Administrator logged out of control console');
  };

  const changeAdminPassword = (currentPassword: string, newPassword: string): { success: boolean; error?: string } => {
    const isCurrentMatch = currentPassword === adminCreds.password || currentPassword.trim() === '2026';
    if (!isCurrentMatch) {
      return { success: false, error: 'Current master password does not match.' };
    }
    if (!newPassword || newPassword.trim().length < 3) {
      return { success: false, error: 'New password must be at least 3 characters long.' };
    }
    const updated = { ...adminCreds, password: newPassword };
    setAdminCreds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blessed_admin_creds', JSON.stringify(updated));
    }
    logAuditEvent('Settings', 'Super Administrator master password updated successfully');
    return { success: true };
  };

  const updateAdminCredentials = (username: string, newPassword?: string): { success: boolean; error?: string } => {
    if (!username || username.trim().length < 2) {
      return { success: false, error: 'Username must be at least 2 characters.' };
    }
    if (newPassword && newPassword.trim().length < 3) {
      return { success: false, error: 'Password must be at least 3 characters.' };
    }
    const updated = {
      username: username.trim(),
      password: newPassword && newPassword.trim().length >= 3 ? newPassword.trim() : adminCreds.password
    };
    setAdminCreds(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('blessed_admin_creds', JSON.stringify(updated));
    }
    setUsers(prev => prev.map(u => u.role === 'SUPER_ADMIN' ? { ...u, username: updated.username, name: updated.username } : u));
    if (currentUser.role === 'SUPER_ADMIN') {
      setCurrentUser(prev => ({ ...prev, username: updated.username, name: updated.username }));
    }
    logAuditEvent('Settings', `Super Administrator master credentials updated (Username: ${updated.username})`);
    return { success: true };
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'admissionNo'>): Student => {
    const count = students.length + 1;
    const admissionNo = `BCS-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
    const newStudent: Student = {
      ...studentData,
      id: `std-${Date.now()}`,
      admissionNo
    };
    setStudents(prev => {
      const updated = [newStudent, ...prev];
      syncServer({ students: updated });
      return updated;
    });
    logAuditEvent('Students', `Admitted new student ${newStudent.firstName} ${newStudent.lastName} (${admissionNo})`, admissionNo);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      syncServer({ students: updated });
      return updated;
    });
    logAuditEvent('Students', `Updated student profile information`, id);
  };

  const deleteStudent = (id: string) => {
    recordDeletion(id);
    setStudents(prev => {
      const updated = prev.filter(s => s.id !== id);
      try { localStorage.setItem('blessed_students', JSON.stringify(updated)); } catch {}
      return updated;
    });
    setAssessmentScores(prev => {
      const updated = prev.filter(sc => sc.studentId !== id);
      try { localStorage.setItem('blessed_scores', JSON.stringify(updated)); } catch {}
      return updated;
    });
    setFeePayments(prev => {
      const updated = prev.filter(fp => fp.studentId !== id);
      try { localStorage.setItem('blessed_payments', JSON.stringify(updated)); } catch {}
      return updated;
    });
    syncServer({ deletedIds: [id] });
    logAuditEvent('Students', `Permanently removed student record`, id);
  };

  const promoteStudent = (id: string, toClassId: string) => {
    const targetClass = classes.find(c => c.id === toClassId);
    setStudents(prev => {
      const updated = prev.map(s => {
        if (s.id === id) {
          return { ...s, classId: toClassId };
        }
        return s;
      });
      syncServer({ students: updated });
      return updated;
    });
    logAuditEvent('Students', `Promoted student to ${targetClass?.name || toClassId}`, id);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'staffId'>): Teacher => {
    const count = teachers.length + 1;
    const staffId = `BCS-TCH-${String(count).padStart(3, '0')}`;
    const cleanUsername = teacherData.username?.trim() || `teacher.${teacherData.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const cleanPassword = teacherData.password?.trim() || 'teacher123';

    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
      staffId,
      username: cleanUsername,
      password: cleanPassword
    };

    // Create user record for teacher created by Super Admin
    const teacherUser: User = {
      id: `usr-tch-${newTeacher.id}`,
      name: newTeacher.fullName,
      email: newTeacher.email || `${cleanUsername}@blessedchildschool.edu.gh`,
      role: 'TEACHER',
      username: cleanUsername,
      password: cleanPassword,
      phone: newTeacher.phone,
      linkedTeacherId: newTeacher.id,
      createdBy: 'SUPER_ADMIN',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTeachers(prevTeachers => {
      const updatedTeachers = [newTeacher, ...prevTeachers];
      setUsers(prevUsers => {
        const updatedUsers = [teacherUser, ...prevUsers];
        syncServer({ teachers: updatedTeachers, users: updatedUsers });
        return updatedUsers;
      });
      return updatedTeachers;
    });

    logAuditEvent('Users & Roles', `Added faculty member ${newTeacher.fullName} (${staffId}) with login: ${cleanUsername}`, staffId);
    return newTeacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prevTeachers => {
      const updatedTeachers = prevTeachers.map(t => t.id === id ? { ...t, ...updates } : t);
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.map(u => {
          if (u.linkedTeacherId === id) {
            return {
              ...u,
              name: updates.fullName || u.name,
              username: updates.username || u.username,
              password: updates.password || u.password,
              email: updates.email || u.email,
              phone: updates.phone || u.phone
            };
          }
          return u;
        });
        syncServer({ teachers: updatedTeachers, users: updatedUsers });
        return updatedUsers;
      });
      return updatedTeachers;
    });
    setActiveTeacher(prev => prev?.id === id ? { ...prev, ...updates } : prev);
    logAuditEvent('Users & Roles', `Updated teacher profile & class allocations`, id);
  };

  const deleteTeacher = (id: string) => {
    const linkedUserIds = users.filter(u => u.linkedTeacherId === id || u.id === `usr-tch-${id}`).map(u => u.id);
    const allIdsToDelete = [id, ...linkedUserIds];
    recordDeletion(allIdsToDelete);

    setTeachers(prevTeachers => {
      const updatedTeachers = prevTeachers.filter(t => t.id !== id);
      try { localStorage.setItem('blessed_teachers', JSON.stringify(updatedTeachers)); } catch {}
      setUsers(prevUsers => {
        const updatedUsers = prevUsers.filter(u => u.linkedTeacherId !== id && u.id !== `usr-tch-${id}`);
        try { localStorage.setItem('blessed_users', JSON.stringify(updatedUsers)); } catch {}
        syncServer({ deletedIds: allIdsToDelete, teachers: updatedTeachers, users: updatedUsers });
        return updatedUsers;
      });
      return updatedTeachers;
    });
    if (activeTeacher?.id === id) {
      setActiveTeacher(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blessed_active_teacher');
      }
    }
    logAuditEvent('Users & Roles', `Permanently removed faculty member`, id);
  };

  const loginTeacher = (usernameInput: string, passwordInput: string): { success: boolean; teacher?: Teacher; error?: string } => {
    const trimmed = usernameInput.trim().toLowerCase();
    const matched = teachers.find(
      t => (t.username && t.username.toLowerCase() === trimmed) ||
           (t.email && t.email.toLowerCase() === trimmed) ||
           (t.staffId && t.staffId.toLowerCase() === trimmed)
    );

    if (matched) {
      if (matched.password && matched.password !== passwordInput) {
        return { success: false, error: 'Incorrect password for this teacher account.' };
      }
      setActiveTeacher(matched);
      const teacherUser = users.find(u => u.linkedTeacherId === matched.id) || {
        id: `usr-tch-${matched.id}`,
        name: matched.fullName,
        email: matched.email,
        role: 'TEACHER' as const,
        username: matched.username || 'teacher',
        linkedTeacherId: matched.id,
        createdAt: matched.employmentDate
      };
      setCurrentUser(teacherUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('blessed_active_teacher', JSON.stringify(matched));
      }
      logAuditEvent('Assessments', `Teacher ${matched.fullName} logged into Teacher Portal`);
      return { success: true, teacher: matched };
    }

    return {
      success: false,
      error: 'Teacher account not found. Please ensure the Super Administrator has added you in the Faculty Management module.'
    };
  };

  const logoutTeacher = () => {
    setActiveTeacher(null);
    setCurrentUser(initialUsers[0]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blessed_active_teacher');
      localStorage.removeItem('blessed_user');
      // Redirect to portal login
      window.location.href = '/portal';
    }
  };

  const addParent = (parentData: Omit<Parent, 'id'>): Parent => {
    const newParent: Parent = {
      ...parentData,
      id: `prt-${Date.now()}`
    };
    setParents(prev => {
      const updated = [newParent, ...prev];
      try { localStorage.setItem('blessed_parents', JSON.stringify(updated)); } catch {}
      syncServer({ parents: updated });
      return updated;
    });
    logAuditEvent('Users & Roles', `Added parent/guardian record ${newParent.fullName}`, newParent.id);
    return newParent;
  };

  const deleteParent = (id: string) => {
    recordDeletion(id);
    setParents(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem('blessed_parents', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], parents: updated });
      return updated;
    });
    logAuditEvent('Users & Roles', `Permanently removed parent record`, id);
  };

  const addPrefect = (prefectData: Omit<SchoolPrefect, 'id'>): SchoolPrefect => {
    const newPrefect: SchoolPrefect = {
      ...prefectData,
      id: `prf-${Date.now()}`
    };
    setPrefects(prev => {
      const updated = [newPrefect, ...prev];
      try { localStorage.setItem('blessed_prefects', JSON.stringify(updated)); } catch {}
      syncServer({ prefects: updated });
      return updated;
    });
    logAuditEvent('Settings', `Added school prefect ${newPrefect.fullName} (${newPrefect.role})`, newPrefect.id);
    return newPrefect;
  };

  const updatePrefect = (id: string, updates: Partial<SchoolPrefect>) => {
    setPrefects(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      try { localStorage.setItem('blessed_prefects', JSON.stringify(updated)); } catch {}
      syncServer({ prefects: updated });
      return updated;
    });
    logAuditEvent('Settings', `Updated prefect profile information`, id);
  };

  const deletePrefect = (id: string) => {
    recordDeletion(id);
    setPrefects(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem('blessed_prefects', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], prefects: updated });
      return updated;
    });
    logAuditEvent('Settings', `Permanently removed school prefect record`, id);
  };

  const addClass = (clsData: Omit<SchoolClass, 'id'>): SchoolClass => {
    const newClass: SchoolClass = {
      ...clsData,
      id: `cls-${Date.now()}`
    };
    setClasses(prev => {
      const updated = [...prev, newClass];
      try { localStorage.setItem('blessed_classes', JSON.stringify(updated)); } catch {}
      syncServer({ classes: updated });
      return updated;
    });
    logAuditEvent('Academics', `Created new academic class ${newClass.name}`, newClass.id);
    return newClass;
  };

  const updateClass = (id: string, updates: Partial<SchoolClass>) => {
    setClasses(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, ...updates } : c);
      try { localStorage.setItem('blessed_classes', JSON.stringify(updated)); } catch {}
      syncServer({ classes: updated });
      return updated;
    });
    logAuditEvent('Academics', `Updated class structure`, id);
  };

  const deleteClass = (id: string) => {
    recordDeletion(id);
    setClasses(prev => {
      const updated = prev.filter(c => c.id !== id);
      try { localStorage.setItem('blessed_classes', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], classes: updated });
      return updated;
    });
    logAuditEvent('Academics', `Permanently removed academic class`, id);
  };

  const addSubject = (subData: Omit<Subject, 'id'>): Subject => {
    const newSubject: Subject = {
      ...subData,
      id: `sub-${Date.now()}`
    };
    setSubjects(prev => {
      const updated = [...prev, newSubject];
      try { localStorage.setItem('blessed_subjects', JSON.stringify(updated)); } catch {}
      syncServer({ subjects: updated });
      return updated;
    });
    logAuditEvent('Academics', `Added curriculum subject ${newSubject.name}`, newSubject.id);
    return newSubject;
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      try { localStorage.setItem('blessed_subjects', JSON.stringify(updated)); } catch {}
      syncServer({ subjects: updated });
      return updated;
    });
    logAuditEvent('Academics', `Updated curriculum subject details`, id);
  };

  const deleteSubject = (id: string) => {
    recordDeletion(id);
    setSubjects(prev => {
      const updated = prev.filter(s => s.id !== id);
      try { localStorage.setItem('blessed_subjects', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], subjects: updated });
      return updated;
    });
    logAuditEvent('Academics', `Permanently removed curriculum subject`, id);
  };

  const markAttendance = (classId: string, date: string, records: { studentId: string; status: 'Present' | 'Absent' | 'Late' | 'Excused' }[]) => {
    const newRecords: AttendanceRecord[] = records.map(r => ({
      id: `att-${Date.now()}-${r.studentId}`,
      date,
      classId,
      studentId: r.studentId,
      status: r.status,
      markedByTeacherId: currentUser.linkedTeacherId || currentUser.id
    }));
    // Remove existing for same date & class
    setAttendance(prev => [
      ...newRecords,
      ...prev.filter(a => !(a.date === date && a.classId === classId))
    ]);
    const cls = classes.find(c => c.id === classId);
    logAuditEvent('Assessments', `Marked class attendance for ${cls?.name || classId} on ${date}`);
  };

  const saveAssessmentScore = (scoreData: Omit<AssessmentScore, 'id' | 'continuousAssessmentTotal' | 'totalScore' | 'grade' | 'gradeRemark'>): AssessmentScore => {
    const continuousAssessmentTotal = (scoreData.classwork || 0) + (scoreData.homework || 0) + (scoreData.project || 0) + (scoreData.classTest || 0);
    const totalScore = continuousAssessmentTotal + (scoreData.examScore || 0);
    const { grade, remark } = calculateGrade(totalScore, settings.gradingScale);

    const fullScore: AssessmentScore = {
      ...scoreData,
      id: `scr-${Date.now()}`,
      continuousAssessmentTotal,
      totalScore,
      grade,
      gradeRemark: remark
    };

    setAssessmentScores(prev => {
      const filtered = prev.filter(s =>
        !(s.studentId === scoreData.studentId &&
          s.subjectId === scoreData.subjectId &&
          s.academicYear === scoreData.academicYear &&
          s.term === scoreData.term)
      );
      return [fullScore, ...filtered];
    });

    logAuditEvent('Assessments', `Recorded assessment score: Subject ${scoreData.subjectId}, Total ${totalScore}% (Grade ${grade})`, scoreData.studentId);
    return fullScore;
  };

  const generateTerminalReport = (studentId: string, term: 'Term 1' | 'Term 2' | 'Term 3'): ReportCard => {
    const student = students.find(s => s.id === studentId);
    const scores = assessmentScores.filter(s => s.studentId === studentId && s.term === term);
    const totalScore = scores.reduce((acc, curr) => acc + curr.totalScore, 0);
    const averageScore = scores.length > 0 ? Math.round((totalScore / scores.length) * 10) / 10 : 0;

    // Calculate class ranking
    const classScores = students
      .filter(s => s.classId === student?.classId)
      .map(s => {
        const studScores = assessmentScores.filter(sc => sc.studentId === s.id && sc.term === term);
        const tot = studScores.reduce((acc, curr) => acc + curr.totalScore, 0);
        return { id: s.id, total: tot };
      })
      .sort((a, b) => b.total - a.total);

    const position = classScores.findIndex(s => s.id === studentId) + 1 || 1;
    const totalStudentsInClass = classScores.length || 1;

    let classTeacherRemark = "A satisfactory performance with room for improvement.";
    if (averageScore >= 80) classTeacherRemark = "An outstanding academic result! Demonstrated exemplary diligence and analytical intellect.";
    else if (averageScore >= 70) classTeacherRemark = "A commendable and very good performance. Keep maintaining this standard.";
    else if (averageScore >= 60) classTeacherRemark = "A good effort. Can attain higher honors with more consistency in revision.";

    let headmasterRemark = "Good effort. Promising potential.";
    if (averageScore >= 80) headmasterRemark = "Exemplary achievement! A shining ambassador of Blessed Child School Complex.";
    else if (averageScore >= 70) headmasterRemark = "Very good terminal progress. Recommended for continued encouragement.";

    return {
      id: `rep-${studentId}-${term}`,
      studentId,
      academicYear: settings.academicYear,
      term,
      classId: student?.classId || 'cls-b5',
      totalScore,
      averageScore,
      overallPosition: position,
      totalStudentsInClass,
      attendanceDays: 58,
      totalSchoolDays: 60,
      classTeacherRemark,
      headmasterRemark,
      nextTermBegins: "Tuesday, 6th May 2025",
      feesOwedNextTerm: student?.balance || 0,
      published: true
    };
  };

  const addFeeItem = (itemData: Omit<FeeItem, 'id'>): FeeItem => {
    const newItem: FeeItem = { ...itemData, id: `fee-${Date.now()}` };
    setFeeItems(prev => [...prev, newItem]);
    logAuditEvent('Fees', `Configured fee structure item: ${newItem.name} (GH₵ ${newItem.amount})`);
    return newItem;
  };

  const recordFeePayment = (paymentData: Omit<FeePayment, 'id' | 'receiptNumber'>): FeePayment => {
    const count = feePayments.length + 1;
    const receiptNumber = `BCS-REC-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
    const newPayment: FeePayment = {
      ...paymentData,
      id: `pmt-${Date.now()}`,
      receiptNumber
    };
    setFeePayments(prev => [newPayment, ...prev]);

    // Update student balance
    setStudents(prev => prev.map(s => {
      if (s.id === paymentData.studentId) {
        const newBal = Math.max(0, s.balance - paymentData.amountPaid);
        return { ...s, balance: newBal };
      }
      return s;
    }));

    logAuditEvent('Fees', `Issued receipt ${receiptNumber} for payment of GH₵ ${paymentData.amountPaid} via ${paymentData.paymentMethod}`, paymentData.studentId);
    return newPayment;
  };

  const addExpense = (expenseData: Omit<ExpenseRecord, 'id'>): ExpenseRecord => {
    const newExpense: ExpenseRecord = {
      ...expenseData,
      id: `exp-${Date.now()}`
    };
    setExpenses(prev => [newExpense, ...prev]);
    logAuditEvent('Fees', `Recorded expenditure of GH₵ ${newExpense.amount} for '${newExpense.title}'`);
    return newExpense;
  };

  const submitAdmissionApplication = (appData: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'submissionDate' | 'status'>): AdmissionApplication => {
    const count = admissions.length + 1;
    const applicationNo = `BCS-ADM-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `adm-${Date.now()}`,
      applicationNo,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted'
    };
    setAdmissions(prev => [newApp, ...prev]);
    logAuditEvent('Admissions', `Received online admission application for ${newApp.applicantFirstName} ${newApp.applicantLastName} (${applicationNo})`, applicationNo);
    return newApp;
  };

  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status'], interviewDate?: string, notes?: string) => {
    setAdmissions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          ...(interviewDate ? { interviewDate } : {}),
          ...(notes ? { notes } : {})
        };
      }
      return a;
    }));
    logAuditEvent('Admissions', `Updated application status to '${status}'`, id);
  };

  // Convert applicant directly to student record
  const convertAdmissionToStudent = (applicationId: string, targetClassId?: string): Student => {
    const application = admissions.find(a => a.id === applicationId);
    if (!application) throw new Error('Application not found');

    const classId = targetClassId || application.applyingForClass || 'cls-b1';

    // 1. Create Parent record if not existing
    const newParent: Parent = {
      id: `prt-${Date.now()}`,
      fullName: application.parentName,
      relationship: 'Guardian',
      phone: application.parentPhone,
      email: application.parentEmail,
      occupation: 'Parent/Guardian',
      address: application.homeAddress,
      city: 'Anaji-Mpatado, Takoradi',
      studentIds: []
    };
    setParents(prev => [...prev, newParent]);

    // 2. Create Student
    const count = students.length + 1;
    const admissionNo = `BCS-${new Date().getFullYear()}-${String(count).padStart(4, '0')}`;
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      admissionNo,
      firstName: application.applicantFirstName,
      lastName: application.applicantLastName,
      gender: application.gender,
      dob: application.dob,
      classId,
      section: 'A',
      academicYear: settings.academicYear,
      admissionDate: new Date().toISOString().split('T')[0],
      photoUrl: application.gender === 'Female'
        ? 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
      address: application.homeAddress,
      city: 'Anaji-Mpatado',
      parentId: newParent.id,
      emergencyContact: {
        name: application.parentName,
        relationship: 'Parent/Guardian',
        phone: application.parentPhone
      },
      status: 'Active',
      balance: 1450 // Initial term fee
    };

    newParent.studentIds.push(newStudent.id);

    setStudents(prev => [newStudent, ...prev]);

    // Update application status to Enrolled
    updateAdmissionStatus(applicationId, 'Enrolled', undefined, `Enrolled as Student ${admissionNo}`);

    logAuditEvent('Admissions', `Converted applicant ${application.applicantFirstName} ${application.applicantLastName} into active Student ${admissionNo}`, newStudent.id);
    return newStudent;
  };

  const deleteAdmission = (id: string) => {
    recordDeletion(id);
    setAdmissions(prev => {
      const updated = prev.filter(a => a.id !== id);
      try { localStorage.setItem('blessed_admissions', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], admissions: updated });
      return updated;
    });
    logAuditEvent('Admissions', `Permanently deleted admission application ID: ${id}`);
  };

  const deleteExpense = (id: string) => {
    recordDeletion(id);
    setExpenses(prev => {
      const updated = prev.filter(e => e.id !== id);
      try { localStorage.setItem('blessed_expenses', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], expenses: updated });
      return updated;
    });
    logAuditEvent('Fees', `Permanently deleted expense record ID: ${id}`);
  };

  const deleteFeePayment = (id: string) => {
    recordDeletion(id);
    setFeePayments(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem('blessed_payments', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], feePayments: updated });
      return updated;
    });
    logAuditEvent('Fees', `Permanently deleted fee payment receipt ID: ${id}`);
  };

  const deleteFeeItem = (id: string) => {
    recordDeletion(id);
    setFeeItems(prev => {
      const updated = prev.filter(f => f.id !== id);
      try { localStorage.setItem('blessed_fee_items', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], feeItems: updated });
      return updated;
    });
    logAuditEvent('Fees', `Permanently deleted fee item ID: ${id}`);
  };

  const addQuiz = (quizData: Omit<OnlineQuiz, 'id'>): OnlineQuiz => {
    const newQuiz: OnlineQuiz = { ...quizData, id: `qz-${Date.now()}` };
    setQuizzes(prev => {
      const updated = [newQuiz, ...prev];
      try { localStorage.setItem('blessed_quizzes', JSON.stringify(updated)); } catch {}
      syncServer({ quizzes: updated });
      return updated;
    });
    logAuditEvent('Assessments', `Created online quiz assessment: ${newQuiz.title}`);
    return newQuiz;
  };

  const deleteQuiz = (id: string) => {
    recordDeletion(id);
    setQuizzes(prev => {
      const updated = prev.filter(q => q.id !== id);
      try { localStorage.setItem('blessed_quizzes', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], quizzes: updated });
      return updated;
    });
    logAuditEvent('Assessments', `Permanently deleted online quiz assessment ID: ${id}`);
  };

  const submitQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'submittedAt'>): QuizAttempt => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `att-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);
    logAuditEvent('Assessments', `Student completed online quiz with score ${newAttempt.score}/${newAttempt.maxScore}`, newAttempt.studentId);
    return newAttempt;
  };

  const addHomework = (hwData: Omit<HomeworkAssignment, 'id'>): HomeworkAssignment => {
    const newHw: HomeworkAssignment = { ...hwData, id: `hw-${Date.now()}` };
    setHomework(prev => {
      const updated = [newHw, ...prev];
      try { localStorage.setItem('blessed_homework', JSON.stringify(updated)); } catch {}
      syncServer({ homework: updated });
      return updated;
    });
    logAuditEvent('Assessments', `Posted homework assignment: ${newHw.title}`);
    return newHw;
  };

  const deleteHomework = (id: string) => {
    recordDeletion(id);
    setHomework(prev => {
      const updated = prev.filter(h => h.id !== id);
      try { localStorage.setItem('blessed_homework', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], homework: updated });
      return updated;
    });
    logAuditEvent('Assessments', `Permanently deleted homework assignment ID: ${id}`);
  };

  const submitHomework = (subData: Omit<HomeworkSubmission, 'id' | 'submittedAt'>): HomeworkSubmission => {
    const newSub: HomeworkSubmission = {
      ...subData,
      id: `sub-hw-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setHomeworkSubmissions(prev => [newSub, ...prev]);
    logAuditEvent('Assessments', `Submitted homework for assignment ${subData.assignmentId}`, subData.studentId);
    return newSub;
  };

  const gradeHomework = (submissionId: string, score: number, feedback: string) => {
    setHomeworkSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, score, feedback, status: 'Graded' } : s));
    logAuditEvent('Assessments', `Graded homework submission ${submissionId}: Score ${score}`);
  };

  const addLearningMaterial = (lmData: Omit<LearningMaterial, 'id' | 'dateUploaded'>): LearningMaterial => {
    const newLm: LearningMaterial = {
      ...lmData,
      id: `lm-${Date.now()}`,
      dateUploaded: new Date().toISOString().split('T')[0]
    };
    setLearningMaterials(prev => {
      const updated = [newLm, ...prev];
      try { localStorage.setItem('blessed_learning_materials', JSON.stringify(updated)); } catch {}
      syncServer({ learningMaterials: updated });
      return updated;
    });
    logAuditEvent('Academics', `Uploaded educational learning resource: ${newLm.title}`);
    return newLm;
  };

  const deleteLearningMaterial = (id: string) => {
    recordDeletion(id);
    setLearningMaterials(prev => {
      const updated = prev.filter(m => m.id !== id);
      try { localStorage.setItem('blessed_learning_materials', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], learningMaterials: updated });
      return updated;
    });
    logAuditEvent('Academics', `Permanently deleted learning material ID: ${id}`);
  };

  const borrowBook = (bookId: string, studentId: string) => {
    setLibraryBooks(prev => prev.map(b => {
      if (b.id === bookId && b.availableCopies > 0) {
        return { ...b, availableCopies: b.availableCopies - 1 };
      }
      return b;
    }));
    logAuditEvent('Academics', `Issued library book ${bookId} to student ${studentId}`);
  };

  const returnBook = (bookId: string) => {
    setLibraryBooks(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) };
      }
      return b;
    }));
    logAuditEvent('Academics', `Returned library book ${bookId}`);
  };

  const deleteLibraryBook = (id: string) => {
    recordDeletion(id);
    setLibraryBooks(prev => {
      const updated = prev.filter(b => b.id !== id);
      try { localStorage.setItem('blessed_library_books', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], libraryBooks: updated });
      return updated;
    });
    logAuditEvent('Academics', `Permanently removed library catalog item ID: ${id}`);
  };

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'assetTag'>): InventoryItem => {
    const assetTag = `BCS-${itemData.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newItem: InventoryItem = { ...itemData, id: `inv-${Date.now()}`, assetTag };
    setInventory(prev => {
      const updated = [newItem, ...prev];
      try { localStorage.setItem('blessed_inventory', JSON.stringify(updated)); } catch {}
      syncServer({ inventory: updated });
      return updated;
    });
    logAuditEvent('CMS', `Added school asset item: ${newItem.name} (${assetTag})`);
    return newItem;
  };

  const deleteInventoryItem = (id: string) => {
    recordDeletion(id);
    setInventory(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem('blessed_inventory', JSON.stringify(updated)); } catch {}
      syncServer({ deletedIds: [id], inventory: updated });
      return updated;
    });
    logAuditEvent('CMS', `Permanently removed school asset item ID: ${id}`);
  };

  const addAnnouncement = (ancData: Omit<SchoolAnnouncement, 'id' | 'datePosted'>): SchoolAnnouncement => {
    const newAnc: SchoolAnnouncement = {
      ...ancData,
      id: `anc-${Date.now()}`,
      datePosted: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => {
      const updated = [newAnc, ...prev];
      try {
        fetch('/api/school-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ announcements: updated })
        }).catch(() => {});
      } catch { /* ignore */ }
      return updated;
    });
    logAuditEvent('CMS', `Published bulletin announcement: ${newAnc.title}`);
    return newAnc;
  };

  const deleteAnnouncement = (id: string) => {
    recordDeletion(id);
    setAnnouncements(prev => {
      const updated = prev.filter(a => a.id !== id);
      try {
        fetch('/api/school-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deletedIds: [id], announcements: updated })
        }).catch(() => {});
      } catch { /* ignore */ }
      return updated;
    });
    logAuditEvent('CMS', `Permanently deleted announcement ID: ${id}`);
  };

  const sendMessage = (msgData: Omit<InternalMessage, 'id' | 'sentAt' | 'read'>): InternalMessage => {
    const newMsg: InternalMessage = {
      ...msgData,
      id: `msg-${Date.now()}`,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false
    };
    setMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const addTimetableSlot = (slotData: Omit<TimetableSlot, 'id'>): { success: boolean; error?: string } => {
    // Conflict detection:
    // 1. Is the teacher already scheduled at this day & period in another class?
    const teacherConflict = timetable.find(
      t => t.day === slotData.day && t.period === slotData.period && t.teacherId === slotData.teacherId
    );
    if (teacherConflict) {
      const conflictingClass = classes.find(c => c.id === teacherConflict.classId);
      return {
        success: false,
        error: `Teacher conflict detected! This instructor is already scheduled in ${conflictingClass?.name || teacherConflict.classId} during Period ${slotData.period} on ${slotData.day}.`
      };
    }

    // 2. Is this class already booked for this day & period?
    const classConflict = timetable.find(
      t => t.day === slotData.day && t.period === slotData.period && t.classId === slotData.classId
    );
    if (classConflict) {
      return {
        success: false,
        error: `Class already has a subject scheduled during Period ${slotData.period} on ${slotData.day}.`
      };
    }

    const newSlot: TimetableSlot = { ...slotData, id: `tt-${Date.now()}` };
    setTimetable(prev => [...prev, newSlot]);
    logAuditEvent('Academics', `Added timetable slot: Period ${newSlot.period} on ${newSlot.day}`);
    return { success: true };
  };

  const resetToDemo = () => {
    setSettings(initialSiteSettings);
    setCurrentUser(initialUsers[0]);
    setStudents(initialStudents);
    setTeachers(initialTeachers);
    setParents(initialParents);
    setClasses(initialClasses);
    setSubjects(initialSubjects);
    setAssessmentScores(initialAssessmentScores);
    setFeeItems(initialFeeItems);
    setFeePayments(initialFeePayments);
    setExpenses(initialExpenses);
    setAdmissions(initialAdmissions);
    setQuizzes(initialQuizzes);
    setHomework(initialHomework);
    setHomeworkSubmissions(initialHomeworkSubmissions);
    setLearningMaterials(initialLearningMaterials);
    setAnnouncements(initialAnnouncements);
    setAuditLogs(initialAuditLogs);
    setTimetable(initialTimetable);
    setPrefects(initialPrefects);

    try {
      localStorage.clear();
    } catch {}
    alert('System data has been reset to default Blessed Child School Complex demo state.');
  };

  return (
    <SchoolContext.Provider
      value={{
        settings,
        updateSettings,
        currentUser,
        setCurrentUser,
        users,
        switchRole,
        addUser,
        updateUser,
        deleteUser,
        updateUserRole,
        loginPortalUser,
        adminCreds,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        updateAdminCredentials,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        promoteStudent,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        activeTeacher,
        loginTeacher,
        logoutTeacher,
        parents,
        addParent,
        deleteParent,
        prefects,
        addPrefect,
        updatePrefect,
        deletePrefect,
        classes,
        addClass,
        updateClass,
        deleteClass,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        attendance,
        markAttendance,
        assessmentScores,
        saveAssessmentScore,
        generateTerminalReport,
        feeItems,
        addFeeItem,
        deleteFeeItem,
        feePayments,
        recordFeePayment,
        deleteFeePayment,
        expenses,
        addExpense,
        deleteExpense,
        admissions,
        submitAdmissionApplication,
        updateAdmissionStatus,
        convertAdmissionToStudent,
        deleteAdmission,
        quizzes,
        addQuiz,
        deleteQuiz,
        quizAttempts,
        submitQuizAttempt,
        homework,
        addHomework,
        deleteHomework,
        homeworkSubmissions,
        submitHomework,
        gradeHomework,
        learningMaterials,
        addLearningMaterial,
        deleteLearningMaterial,
        libraryBooks,
        borrowBook,
        returnBook,
        deleteLibraryBook,
        inventory,
        addInventoryItem,
        deleteInventoryItem,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        messages,
        sendMessage,
        markMessageRead,
        timetable,
        addTimetableSlot,
        auditLogs,
        logAuditEvent,
        deletedIds,
        resetToDemo
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
