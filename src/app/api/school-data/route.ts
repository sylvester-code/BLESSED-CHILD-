import { NextResponse } from 'next/server';
import {
  initialSiteSettings,
  initialAnnouncements,
  initialUsers,
  initialTeachers,
  initialStudents,
  initialParents,
  initialPrefects,
  initialFeePayments,
  initialExpenses,
  initialAdmissions,
  initialAssessmentScores,
  initialLibraryBooks,
  initialInventory,
  initialLearningMaterials,
  initialQuizzes,
  initialHomework,
  initialTimetable,
  initialAuditLogs
} from '@/data/initialData';
import {
  Teacher,
  Student,
  Parent,
  User,
  SchoolPrefect,
  FeePayment,
  ExpenseRecord,
  AdmissionApplication,
  AssessmentScore,
  LibraryBook,
  InventoryItem,
  LearningMaterial,
  OnlineQuiz,
  HomeworkAssignment,
  TimetableSlot,
  AuditLog,
  SchoolAnnouncement,
  SiteSettings
} from '@/types';
import fs from 'fs';
import path from 'path';

// Local temporary file fallback for persistence across serverless invocations
const DATA_FILE_PATH = path.join(process.env.TEMP || '/tmp', 'blessed_school_live_data.json');

// Helper to filter out any student or teacher accounts unless created by SUPER_ADMIN
function filterAuthorizedAccounts(userList: User[], teacherList: Teacher[]): User[] {
  return userList.filter((u) => {
    if (u.role === 'TEACHER') {
      return (
        u.createdBy === 'SUPER_ADMIN' ||
        (u.linkedTeacherId && teacherList.some((t) => t.id === u.linkedTeacherId))
      );
    }
    if (u.role === 'STUDENT') {
      return u.createdBy === 'SUPER_ADMIN';
    }
    return true;
  });
}

// In-memory server cache initialized clean
let serverDataCache: {
  settings: SiteSettings;
  announcements: SchoolAnnouncement[];
  teachers: Teacher[];
  students: Student[];
  parents: Parent[];
  users: User[];
  prefects: SchoolPrefect[];
  feePayments: FeePayment[];
  expenses: ExpenseRecord[];
  admissions: AdmissionApplication[];
  assessmentScores: AssessmentScore[];
  libraryBooks: LibraryBook[];
  inventory: InventoryItem[];
  learningMaterials: LearningMaterial[];
  quizzes: OnlineQuiz[];
  homework: HomeworkAssignment[];
  timetable: TimetableSlot[];
  auditLogs: AuditLog[];
  deletedIds: string[];
  updatedAt: string;
} = {
  settings: { ...initialSiteSettings },
  announcements: [...initialAnnouncements],
  teachers: [...initialTeachers],
  students: [...initialStudents],
  parents: [...initialParents],
  users: filterAuthorizedAccounts(initialUsers, []),
  prefects: [...initialPrefects],
  feePayments: [...initialFeePayments],
  expenses: [...initialExpenses],
  admissions: [...initialAdmissions],
  assessmentScores: [...initialAssessmentScores],
  libraryBooks: [...initialLibraryBooks],
  inventory: [...initialInventory],
  learningMaterials: [...initialLearningMaterials],
  quizzes: [...initialQuizzes],
  homework: [...initialHomework],
  timetable: [...initialTimetable],
  auditLogs: [...initialAuditLogs],
  deletedIds: [],
  updatedAt: new Date().toISOString()
};

// Permanently purge any records whose ID is present in tombstone deletedIds
function purgeDeletedRecords(cache: typeof serverDataCache) {
  if (!cache.deletedIds || cache.deletedIds.length === 0) return;
  const tombstone = new Set(cache.deletedIds);

  cache.teachers = cache.teachers.filter(t => !tombstone.has(t.id));
  cache.students = cache.students.filter(s => !tombstone.has(s.id));
  cache.parents = cache.parents.filter(p => !tombstone.has(p.id));
  cache.prefects = cache.prefects.filter(p => !tombstone.has(p.id));
  cache.feePayments = cache.feePayments.filter(f => !tombstone.has(f.id) && !tombstone.has(f.studentId));
  cache.expenses = cache.expenses.filter(e => !tombstone.has(e.id));
  cache.admissions = cache.admissions.filter(a => !tombstone.has(a.id));
  cache.assessmentScores = cache.assessmentScores.filter(s => !tombstone.has(s.id) && !tombstone.has(s.studentId));
  cache.libraryBooks = cache.libraryBooks.filter(b => !tombstone.has(b.id));
  cache.inventory = cache.inventory.filter(i => !tombstone.has(i.id));
  cache.learningMaterials = cache.learningMaterials.filter(m => !tombstone.has(m.id));
  cache.quizzes = cache.quizzes.filter(q => !tombstone.has(q.id));
  cache.homework = cache.homework.filter(h => !tombstone.has(h.id));
  cache.timetable = cache.timetable.filter(tt => !tombstone.has(tt.id) && !tombstone.has(tt.teacherId) && !tombstone.has(tt.classId));
  cache.announcements = cache.announcements.filter(a => !tombstone.has(a.id));
  cache.users = cache.users.filter(u => !tombstone.has(u.id) && (!u.linkedTeacherId || !tombstone.has(u.linkedTeacherId)));
}

// Initialize cache from disk if available
try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.settings) serverDataCache.settings = { ...serverDataCache.settings, ...parsed.settings };
    if (Array.isArray(parsed.deletedIds)) {
      serverDataCache.deletedIds = Array.from(new Set([...serverDataCache.deletedIds, ...parsed.deletedIds]));
    }
    if (Array.isArray(parsed.announcements)) serverDataCache.announcements = parsed.announcements;
    if (Array.isArray(parsed.teachers)) serverDataCache.teachers = parsed.teachers;
    if (Array.isArray(parsed.students)) serverDataCache.students = parsed.students;
    if (Array.isArray(parsed.parents)) serverDataCache.parents = parsed.parents;
    if (Array.isArray(parsed.prefects)) serverDataCache.prefects = parsed.prefects;
    if (Array.isArray(parsed.feePayments)) serverDataCache.feePayments = parsed.feePayments;
    if (Array.isArray(parsed.expenses)) serverDataCache.expenses = parsed.expenses;
    if (Array.isArray(parsed.admissions)) serverDataCache.admissions = parsed.admissions;
    if (Array.isArray(parsed.assessmentScores)) serverDataCache.assessmentScores = parsed.assessmentScores;
    if (Array.isArray(parsed.libraryBooks)) serverDataCache.libraryBooks = parsed.libraryBooks;
    if (Array.isArray(parsed.inventory)) serverDataCache.inventory = parsed.inventory;
    if (Array.isArray(parsed.learningMaterials)) serverDataCache.learningMaterials = parsed.learningMaterials;
    if (Array.isArray(parsed.quizzes)) serverDataCache.quizzes = parsed.quizzes;
    if (Array.isArray(parsed.homework)) serverDataCache.homework = parsed.homework;
    if (Array.isArray(parsed.timetable)) serverDataCache.timetable = parsed.timetable;
    if (Array.isArray(parsed.auditLogs)) serverDataCache.auditLogs = parsed.auditLogs;
    if (Array.isArray(parsed.users)) {
      serverDataCache.users = filterAuthorizedAccounts(parsed.users, serverDataCache.teachers);
    }
    purgeDeletedRecords(serverDataCache);
    if (parsed.updatedAt) serverDataCache.updatedAt = parsed.updatedAt;
  }
} catch {
  // Use initial data if file cannot be read
}

export async function GET() {
  purgeDeletedRecords(serverDataCache);
  return NextResponse.json(serverDataCache, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Register any newly deleted tombstones immediately
    if (Array.isArray(body.deletedIds) && body.deletedIds.length > 0) {
      serverDataCache.deletedIds = Array.from(new Set([...serverDataCache.deletedIds, ...body.deletedIds]));
    }

    if (body.settings) {
      serverDataCache.settings = {
        ...serverDataCache.settings,
        ...body.settings
      };
    }

    if (Array.isArray(body.announcements)) serverDataCache.announcements = body.announcements;
    if (Array.isArray(body.teachers)) serverDataCache.teachers = body.teachers;
    if (Array.isArray(body.students)) serverDataCache.students = body.students;
    if (Array.isArray(body.parents)) serverDataCache.parents = body.parents;
    if (Array.isArray(body.prefects)) serverDataCache.prefects = body.prefects;
    if (Array.isArray(body.feePayments)) serverDataCache.feePayments = body.feePayments;
    if (Array.isArray(body.expenses)) serverDataCache.expenses = body.expenses;
    if (Array.isArray(body.admissions)) serverDataCache.admissions = body.admissions;
    if (Array.isArray(body.assessmentScores)) serverDataCache.assessmentScores = body.assessmentScores;
    if (Array.isArray(body.libraryBooks)) serverDataCache.libraryBooks = body.libraryBooks;
    if (Array.isArray(body.inventory)) serverDataCache.inventory = body.inventory;
    if (Array.isArray(body.learningMaterials)) serverDataCache.learningMaterials = body.learningMaterials;
    if (Array.isArray(body.quizzes)) serverDataCache.quizzes = body.quizzes;
    if (Array.isArray(body.homework)) serverDataCache.homework = body.homework;
    if (Array.isArray(body.timetable)) serverDataCache.timetable = body.timetable;
    if (Array.isArray(body.auditLogs)) serverDataCache.auditLogs = body.auditLogs;

    if (Array.isArray(body.users)) {
      serverDataCache.users = filterAuthorizedAccounts(body.users, serverDataCache.teachers);
    }

    // Always enforce tombstone purge after updating collections
    purgeDeletedRecords(serverDataCache);

    serverDataCache.updatedAt = new Date().toISOString();

    // Persist to file if possible
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverDataCache, null, 2), 'utf-8');
    } catch {
      // Ephemeral environments might not allow writes, in-memory still holds
    }

    return NextResponse.json({
      success: true,
      message: 'School data successfully updated live on server',
      updatedAt: serverDataCache.updatedAt,
      serverData: serverDataCache
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update live school data' },
      { status: 400 }
    );
  }
}
