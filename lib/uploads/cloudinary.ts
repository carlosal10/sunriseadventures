import crypto from 'crypto';
import { createSafeFileName } from './storage';

type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
};

type CloudinaryUploadResult = {
  fileName: string;
  height?: number;
  provider: 'cloudinary';
  publicId: string;
  size: number;
  type: string;
  url: string;
  width?: number;
};

function parseCloudinaryUrl() {
  const raw = process.env.CLOUDINARY_URL;
  if (!raw) return null;

  try {
    const parsed = new URL(raw);

    if (parsed.protocol !== 'cloudinary:') {
      return null;
    }

    return {
      apiKey: decodeURIComponent(parsed.username),
      apiSecret: decodeURIComponent(parsed.password),
      cloudName: parsed.hostname,
    };
  } catch {
    return null;
  }
}

export function getCloudinaryConfig(): CloudinaryConfig | null {
  const fromUrl = parseCloudinaryUrl();
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || fromUrl?.cloudName;
  const apiKey = process.env.CLOUDINARY_API_KEY || fromUrl?.apiKey;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || fromUrl?.apiSecret;

  if (!cloudName || !apiKey || !apiSecret) {
    return null;
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    folder: (process.env.CLOUDINARY_UPLOAD_FOLDER || 'sunriseadventures/tours').replace(
      /^\/+|\/+$/g,
      ''
    ),
  };
}

export function isCloudinaryConfigured() {
  return Boolean(getCloudinaryConfig());
}

function createUploadSignature(params: Record<string, string>, apiSecret: string) {
  const toSign = Object.entries(params)
    .filter(([, value]) => value !== '')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${toSign}${apiSecret}`).digest('hex');
}

function toPublicId(fileName: string) {
  return fileName.replace(/\.[^.]+$/, '');
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const config = getCloudinaryConfig();

  if (!config) {
    throw new Error('Cloudinary is not configured.');
  }

  const fileName = createSafeFileName(file.name, file.type);

  if (!fileName) {
    throw new Error('Unsupported image type.');
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  const publicId = toPublicId(fileName);
  const signedParams = {
    folder: config.folder,
    public_id: publicId,
    timestamp,
  };
  const signature = createUploadSignature(signedParams, config.apiSecret);
  const body = new FormData();

  body.append('file', file);
  body.append('api_key', config.apiKey);
  body.append('folder', config.folder);
  body.append('public_id', publicId);
  body.append('signature', signature);
  body.append('timestamp', timestamp);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
    {
      method: 'POST',
      body,
    }
  );
  const payload = (await response.json()) as {
    bytes?: number;
    error?: { message?: string };
    format?: string;
    height?: number;
    public_id?: string;
    secure_url?: string;
    width?: number;
  };

  if (!response.ok || !payload.secure_url || !payload.public_id) {
    throw new Error(payload.error?.message || 'Cloudinary upload failed.');
  }

  const extension = payload.format ? `.${payload.format}` : '';

  return {
    fileName: `${payload.public_id}${extension}`,
    height: payload.height,
    provider: 'cloudinary',
    publicId: payload.public_id,
    size: payload.bytes ?? file.size,
    type: file.type,
    url: payload.secure_url,
    width: payload.width,
  };
}
