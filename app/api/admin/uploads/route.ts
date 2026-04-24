import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { isCloudinaryConfigured, uploadToCloudinary } from '../../../../lib/uploads/cloudinary';
import {
  ACCEPTED_IMAGE_TYPES,
  createSafeFileName,
  getUploadBaseUrl,
  getUploadDir,
  MAX_UPLOAD_BYTES,
} from '../../../../lib/uploads/storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: 'Invalid upload request.' }, { status: 400 });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'Please choose an image to upload.' }, { status: 400 });
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { message: 'Only JPG, PNG, WebP, GIF, and AVIF images are supported.' },
      { status: 400 }
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ message: 'Images must be 8 MB or smaller.' }, { status: 400 });
  }

  if (isCloudinaryConfigured()) {
    try {
      const upload = await uploadToCloudinary(file);

      return NextResponse.json(upload);
    } catch (error) {
      console.error('Cloudinary upload failed.', error);
      return NextResponse.json(
        { message: error instanceof Error ? error.message : 'Cloud image upload failed.' },
        { status: 500 }
      );
    }
  }

  const fileName = createSafeFileName(file.name, file.type);

  if (!fileName) {
    return NextResponse.json({ message: 'Unsupported image type.' }, { status: 400 });
  }

  const uploadDir = getUploadDir();
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(filePath, buffer);

  const url = `${getUploadBaseUrl()}/${fileName}`;

  return NextResponse.json({
    fileName,
    provider: 'local',
    size: file.size,
    type: file.type,
    url,
  });
}
