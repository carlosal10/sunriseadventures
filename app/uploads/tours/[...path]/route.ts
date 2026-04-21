import { readFile, stat } from 'fs/promises';
import { NextResponse } from 'next/server';
import { getContentType, resolveUploadPath } from '../../../../lib/uploads/storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_: Request, { params }: { params: { path: string[] } }) {
  const filePath = resolveUploadPath(params.path);

  if (!filePath) {
    return NextResponse.json({ message: 'File not found.' }, { status: 404 });
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      return NextResponse.json({ message: 'File not found.' }, { status: 404 });
    }

    const file = await readFile(filePath);
    const body = file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;

    return new Response(body, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': String(fileStat.size),
        'Content-Type': getContentType(filePath),
      },
    });
  } catch {
    return NextResponse.json({ message: 'File not found.' }, { status: 404 });
  }
}
