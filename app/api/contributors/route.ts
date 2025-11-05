import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const cwd = process.cwd();
    const filePath = path.join(cwd, 'lib', 'data', 'contributors-data.json');
    const stats = fs.statSync(filePath);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(
      { 
        contributors: data,
        meta: {
          count: Array.isArray(data) ? data.length : 0,
          lastModified: stats.mtime.toISOString(),
          filePath,
          cwd
        }
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load contributors' }, { status: 500 });
  }
}


