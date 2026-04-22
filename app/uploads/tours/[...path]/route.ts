import path from 'path';
import { readFile, stat } from 'fs/promises';
import { NextResponse } from 'next/server';
import { getContentType, resolveUploadPath } from '../../../../lib/uploads/storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function readFallbackImage() {
  const fallbackPath = path.resolve(process.cwd(), 'public', 'images', 'tour-island.jpg');
  const fallbackStat = await stat(fallbackPath);
  const fallbackFile = await readFile(fallbackPath);
  const body = fallbackFile.buffer.slice(
    fallbackFile.byteOffset,
    fallbackFile.byteOffset + fallbackFile.byteLength
  ) as ArrayBuffer;

  return {
    body,
    size: fallbackStat.size,
    type: getContentType(fallbackPath),
  };
}

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
    try {
      const fallback = await readFallbackImage();

      return new Response(fallback.body, {
        headers: {
          'Cache-Control': 'public, max-age=300',
          'Content-Length': String(fallback.size),
          'Content-Type': fallback.type,
          'X-Upload-Fallback': 'true',
        },
      });
    } catch {
      return NextResponse.json({ message: 'File not found.' }, { status: 404 });
    }
  }
}
