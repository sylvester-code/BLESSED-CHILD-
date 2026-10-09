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
  feePayments: FeePayment[];
  recordFeePayment: (payment: Omit<FeePayment, 'id' | 'receiptNumber'>) => FeePayment;
  expenses: ExpenseRecord[];
  addExpense: (expense: Omit<ExpenseRecord, 'id'>) => ExpenseRecord;

  // Admissions
  admissions: AdmissionApplication[];
  submitAdmissionApplication: (app: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'submissionDate' | 'status'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], interviewDate?: string, notes?: string) => void;
  convertAdmissionToStudent: (applicationId: string, targetClassId?: string) => Student;

  // Quizzes & Online CBT
  quizzes: OnlineQuiz[];
  addQuiz: (quiz: Omit<OnlineQuiz, 'id'>) => OnlineQuiz;
  quizAttempts: QuizAttempt[];
  submitQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'submittedAt'>) => QuizAttempt;

  // Homework & Materials
  homework: HomeworkAssignment[];
  addHomework: (hw: Omit<HomeworkAssignment, 'id'>) => HomeworkAssignment;
  homeworkSubmissions: HomeworkSubmission[];
  submitHomework: (submission: Omit<HomeworkSubmission, 'id' | 'submittedAt'>) => HomeworkSubmission;
  gradeHomework: (submissionId: string, score: number, feedback: string) => void;
  learningMaterials: LearningMaterial[];
  addLearningMaterial: (lm: Omit<LearningMaterial, 'id' | 'dateUploaded'>) => LearningMaterial;

  // Library & Inventory
  libraryBooks: LibraryBook[];
  borrowBook: (bookId: string, studentId: string) => void;
  returnBook: (bookId: string) => void;
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id' | 'assetTag'>) => InventoryItem;

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
  const [adminCreds, setAdminCreds] = useState<{ username: string; password: string }>({
    username: 'BLESSED CHILD',
    password: '4040'
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [activeTeacher, setActiveTeacher] = useState<Teacher | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    setIsClient(true);
    try {
      // Invalidate legacy cached data containing previous student or teacher names
      const storageVersion = localStorage.getItem('blessed_clean_version');
      if (storageVersion !== 'v4_clean') {
        localStorage.removeItem('blessed_students');
        localStorage.removeItem('blessed_teachers');
        localStorage.removeItem('blessed_parents');
        localStorage.removeItem('blessed_scores');
        localStorage.removeItem('blessed_payments');
        localStorage.removeItem('blessed_attendance');
        localStorage.setItem('blessed_clean_version', 'v4_clean');
      }

      const storedCreds = localStorage.getItem('blessed_admin_creds');
      if (storedCreds) setAdminCreds(JSON.parse(storedCreds));

      const storedAdminSession = localStorage.getItem('blessed_admin_session');
      if (storedAdminSession === 'true') setIsAdminAuthenticated(true);

      const storedSettings = localStorage.getItem('blessed_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedUser = localStorage.getItem('blessed_user');
      if (storedUser) setCurrentUser(JSON.parse(storedUser));

      const storedStudents = localStorage.getItem('blessed_students');
      if (storedStudents) setStudents(JSON.parse(storedStudents));

      const storedTeachers = localStorage.getItem('blessed_teachers');
      if (storedTeachers) setTeachers(JSON.parse(storedTeachers));

      const storedPrefects = localStorage.getItem('blessed_prefects');
      if (storedPrefects) setPrefects(JSON.parse(storedPrefects));

      const storedActiveTeacher = localStorage.getItem('blessed_active_teacher');
      if (storedActiveTeacher) setActiveTeacher(JSON.parse(storedActiveTeacher));

      const storedAdmissions = localStorage.getItem('blessed_admissions');
      if (storedAdmissions) setAdmissions(JSON.parse(storedAdmissions));

      const storedScores = localStorage.getItem('blessed_scores');
      if (storedScores) setAssessmentScores(JSON.parse(storedScores));

      const storedPayments = localStorage.getItem('blessed_payments');
      if (storedPayments) setFeePayments(JSON.parse(storedPayments));
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage when critical items update
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem('blessed_settings', JSON.stringify(settings));
      localStorage.setItem('blessed_students', JSON.stringify(students));
      localStorage.setItem('blessed_teachers', JSON.stringify(teachers));
      localStorage.setItem('blessed_prefects', JSON.stringify(prefects));
      localStorage.setItem('blessed_admissions', JSON.stringify(admissions));
      localStorage.setItem('blessed_scores', JSON.stringify(assessmentScores));
      localStorage.setItem('blessed_payments', JSON.stringify(feePayments));
      localStorage.setItem('blessed_user', JSON.stringify(currentUser));
      localStorage.setItem('blessed_admin_creds', JSON.stringify(adminCreds));
      if (activeTeacher) {
        localStorage.setItem('blessed_active_teacher', JSON.stringify(activeTeacher));
      } else {
        localStorage.removeItem('blessed_active_teacher');
      }
    } catch {
      // ignore
    }
  }, [settings, students, teachers, prefects, admissions, assessmentScores, feePayments, currentUser, adminCreds, activeTeacher, isClient]);

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
      return updated;
    });
  };

  const switchRole = (role: UserRole) => {
    const matchingUser = users.find(u => u.role === role);
    if (matchingUser) {
      setCurrentUser(matchingUser);
      logAuditEvent('Users & Roles', `Switched active session to role ${role} (${matchingUser.name})`);
    } else {
      // create temporary user for this role
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

  const loginAdmin = (usernameInput: string, passwordInput: string): { success: boolean; error?: string } => {
    const isUserMatch = usernameInput.trim().toUpperCase() === adminCreds.username.toUpperCase();
    const isPassMatch = passwordInput === adminCreds.password;

    if (isUserMatch && isPassMatch) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('blessed_admin_session', 'true');
      }
      const adminUser = users.find(u => u.role === 'SUPER_ADMIN') || initialUsers[0];
      setCurrentUser(adminUser);
      logAuditEvent('Settings', `Super Administrator logged in with username: ${adminCreds.username}`);
      return { success: true };
    }
    return {
      success: false,
      error: `Invalid administrator credentials. Expected username "${adminCreds.username}" and password "${adminCreds.password}".`
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
    if (currentPassword !== adminCreds.password) {
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
    setStudents(prev => [newStudent, ...prev]);
    logAuditEvent('Students', `Admitted new student ${newStudent.firstName} ${newStudent.lastName} (${admissionNo})`, admissionNo);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logAuditEvent('Students', `Updated student profile information`, id);
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    logAuditEvent('Students', `Removed student record`, id);
  };

  const promoteStudent = (id: string, toClassId: string) => {
    const targetClass = classes.find(c => c.id === toClassId);
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, classId: toClassId };
      }
      return s;
    }));
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
    setTeachers(prev => [newTeacher, ...prev]);

    // Create user record for teacher
    const teacherUser: User = {
      id: `usr-tch-${newTeacher.id}`,
      name: newTeacher.fullName,
      email: newTeacher.email || `${cleanUsername}@blessedchildschool.edu.gh`,
      role: 'TEACHER',
      username: cleanUsername,
      password: cleanPassword,
      phone: newTeacher.phone,
      linkedTeacherId: newTeacher.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [teacherUser, ...prev]);

    logAuditEvent('Users & Roles', `Added faculty member ${newTeacher.fullName} (${staffId}) with login: ${cleanUsername}`, staffId);
    return newTeacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    setUsers(prev => prev.map(u => {
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
    }));
    setActiveTeacher(prev => prev?.id === id ? { ...prev, ...updates } : prev);
    logAuditEvent('Users & Roles', `Updated teacher profile & class allocations`, id);
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
    setUsers(prev => prev.filter(u => u.linkedTeacherId !== id));
    if (activeTeacher?.id === id) {
      setActiveTeacher(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blessed_active_teacher');
      }
    }
    logAuditEvent('Users & Roles', `Removed faculty member`, id);
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blessed_active_teacher');
    }
  };

  const addParent = (parentData: Omit<Parent, 'id'>): Parent => {
    const newParent: Parent = {
      ...parentData,
      id: `prt-${Date.now()}`
    };
    setParents(prev => [newParent, ...prev]);
    logAuditEvent('Users & Roles', `Added parent/guardian record ${newParent.fullName}`, newParent.id);
    return newParent;
  };

  const addPrefect = (prefectData: Omit<SchoolPrefect, 'id'>): SchoolPrefect => {
    const newPrefect: SchoolPrefect = {
      ...prefectData,
      id: `prf-${Date.now()}`
    };
    setPrefects(prev => [newPrefect, ...prev]);
    logAuditEvent('Settings', `Added school prefect ${newPrefect.fullName} (${newPrefect.role})`, newPrefect.id);
    return newPrefect;
  };

  const updatePrefect = (id: string, updates: Partial<SchoolPrefect>) => {
    setPrefects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    logAuditEvent('Settings', `Updated prefect profile information`, id);
  };

  const deletePrefect = (id: string) => {
    setPrefects(prev => prev.filter(p => p.id !== id));
    logAuditEvent('Settings', `Removed school prefect record`, id);
  };

  const addClass = (clsData: Omit<SchoolClass, 'id'>): SchoolClass => {
    const newClass: SchoolClass = {
      ...clsData,
      id: `cls-${Date.now()}`
    };
    setClasses(prev => [...prev, newClass]);
    logAuditEvent('Academics', `Created new academic class ${newClass.name}`, newClass.id);
    return newClass;
  };

  const updateClass = (id: string, updates: Partial<SchoolClass>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    logAuditEvent('Academics', `Updated class structure`, id);
  };

  const deleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    logAuditEvent('Academics', `Removed academic class`, id);
  };

  const addSubject = (subData: Omit<Subject, 'id'>): Subject => {
    const newSubject: Subject = {
      ...subData,
      id: `sub-${Date.now()}`
    };
    setSubjects(prev => [...prev, newSubject]);
    logAuditEvent('Academics', `Added curriculum subject ${newSubject.name}`, newSubject.id);
    return newSubject;
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    logAuditEvent('Academics', `Updated curriculum subject details`, id);
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

  const addQuiz = (quizData: Omit<OnlineQuiz, 'id'>): OnlineQuiz => {
    const newQuiz: OnlineQuiz = { ...quizData, id: `qz-${Date.now()}` };
    setQuizzes(prev => [newQuiz, ...prev]);
    logAuditEvent('Assessments', `Created online quiz assessment: ${newQuiz.title}`);
    return newQuiz;
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
    setHomework(prev => [newHw, ...prev]);
    logAuditEvent('Assessments', `Posted homework assignment: ${newHw.title}`);
    return newHw;
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
    setLearningMaterials(prev => [newLm, ...prev]);
    logAuditEvent('Academics', `Uploaded educational learning resource: ${newLm.title}`);
    return newLm;
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

  const addInventoryItem = (itemData: Omit<InventoryItem, 'id' | 'assetTag'>): InventoryItem => {
    const assetTag = `BCS-${itemData.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newItem: InventoryItem = { ...itemData, id: `inv-${Date.now()}`, assetTag };
    setInventory(prev => [newItem, ...prev]);
    logAuditEvent('CMS', `Added school asset item: ${newItem.name} (${assetTag})`);
    return newItem;
  };

  const addAnnouncement = (ancData: Omit<SchoolAnnouncement, 'id' | 'datePosted'>): SchoolAnnouncement => {
    const newAnc: SchoolAnnouncement = {
      ...ancData,
      id: `anc-${Date.now()}`,
      datePosted: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    logAuditEvent('CMS', `Published bulletin announcement: ${newAnc.title}`);
    return newAnc;
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    logAuditEvent('CMS', `Deleted announcement`, id);
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
        attendance,
        markAttendance,
        assessmentScores,
        saveAssessmentScore,
        generateTerminalReport,
        feeItems,
        addFeeItem,
        feePayments,
        recordFeePayment,
        expenses,
        addExpense,
        admissions,
        submitAdmissionApplication,
        updateAdmissionStatus,
        convertAdmissionToStudent,
        quizzes,
        addQuiz,
        quizAttempts,
        submitQuizAttempt,
        homework,
        addHomework,
        homeworkSubmissions,
        submitHomework,
        gradeHomework,
        learningMaterials,
        addLearningMaterial,
        libraryBooks,
        borrowBook,
        returnBook,
        inventory,
        addInventoryItem,
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
