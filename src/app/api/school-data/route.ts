import { NextResponse } from 'next/server';
import { initialSiteSettings, initialAnnouncements } from '@/data/initialData';
import fs from 'fs';
import path from 'path';

// Local temporary file fallback for persistence across serverless invocations
const DATA_FILE_PATH = path.join(process.env.TEMP || '/tmp', 'blessed_school_live_data.json');

// In-memory server cache
let serverDataCache: {
  settings: typeof initialSiteSettings;
  announcements: typeof initialAnnouncements;
  updatedAt: string;
} = {
  settings: { ...initialSiteSettings },
  announcements: [...initialAnnouncements],
  updatedAt: new Date().toISOString()
};

// Initialize cache from disk if available
try {
  if (fs.existsSync(DATA_FILE_PATH)) {
    const raw = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed.settings) serverDataCache.settings = { ...serverDataCache.settings, ...parsed.settings };
    if (parsed.announcements) serverDataCache.announcements = parsed.announcements;
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

    serverDataCache.updatedAt = new Date().toISOString();

    // Persist to file if possible
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverDataCache, null, 2), 'utf-8');
    } catch {
      // Ephemeral environments might not allow writes, in-memory still holds
    }

    return NextResponse.json({
      success: true,
      message: 'School configuration successfully updated live on server',
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
