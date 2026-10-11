import { NextResponse } from 'next/server';
import { initialSiteSettings, initialAnnouncements, initialUsers } from '@/data/initialData';
import { Teacher, Student, User } from '@/types';
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

// In-memory server cache
let serverDataCache: {
  settings: typeof initialSiteSettings;
  announcements: typeof initialAnnouncements;
  teachers: Teacher[];
  students: Student[];
  users: User[];
  updatedAt: string;
} = {
  settings: { ...initialSiteSettings },
  announcements: [...initialAnnouncements],
  teachers: [],
  students: [],
  users: filterAuthorizedAccounts(initialUsers, []),
  updatedAt: new Date().toISOString()
};

// Initialize cache from disk if available
try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.settings) serverDataCache.settings = { ...serverDataCache.settings, ...parsed.settings };
    if (parsed.announcements && Array.isArray(parsed.announcements)) {
      serverDataCache.announcements = parsed.announcements;
    }
    if (parsed.teachers && Array.isArray(parsed.teachers)) {
      serverDataCache.teachers = parsed.teachers;
    }
    if (parsed.students && Array.isArray(parsed.students)) {
      serverDataCache.students = parsed.students;
    }
    if (parsed.users && Array.isArray(parsed.users)) {
      serverDataCache.users = filterAuthorizedAccounts(parsed.users, serverDataCache.teachers);
    }
    if (parsed.updatedAt) serverDataCache.updatedAt = parsed.updatedAt;
  }
} catch {
  // Use initial data if file cannot be read
}

export async function GET() {
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

    if (body.settings) {
      serverDataCache.settings = {
        ...serverDataCache.settings,
        ...body.settings
      };
    }

    if (body.announcements && Array.isArray(body.announcements)) {
      serverDataCache.announcements = body.announcements;
    }

    if (body.teachers && Array.isArray(body.teachers)) {
      serverDataCache.teachers = body.teachers;
    }

    if (body.students && Array.isArray(body.students)) {
      serverDataCache.students = body.students;
    }

    if (body.users && Array.isArray(body.users)) {
      serverDataCache.users = filterAuthorizedAccounts(body.users, serverDataCache.teachers);
    }

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
