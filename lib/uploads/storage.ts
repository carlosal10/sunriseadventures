import path from 'path';

const DEFAULT_UPLOAD_BASE_URL = '/uploads/tours';

const MIME_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
};

const CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_EXTENSIONS);

export function getUploadDir() {
  return path.resolve(
    process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads', 'tours')
  );
}

export function getUploadBaseUrl() {
  return (process.env.PUBLIC_UPLOAD_BASE_URL || DEFAULT_UPLOAD_BASE_URL).replace(/\/$/, '');
}

export function getExtensionForMimeType(mimeType: string) {
  return MIME_EXTENSIONS[mimeType] ?? null;
}

export function getContentType(filePath: string) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

export function createSafeFileName(originalName: string, mimeType: string) {
  const extension = getExtensionForMimeType(mimeType);
  if (!extension) return null;

  const baseName =
    path
      .basename(originalName, path.extname(originalName))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'tour-image';

  return `${Date.now()}-${crypto.randomUUID()}-${baseName}.${extension}`;
}

export function resolveUploadPath(segments: string[]) {
  const uploadDir = getUploadDir();
  const targetPath = path.resolve(uploadDir, ...segments);
  const relative = path.relative(uploadDir, targetPath);

  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return null;
  }

  return targetPath;
}
