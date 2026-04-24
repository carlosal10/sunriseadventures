const CLOUDINARY_HOST = 'res.cloudinary.com';
const DEFAULT_TRANSFORMATIONS = 'f_auto,q_auto';

function isCloudinaryUrl(value: string) {
  try {
    const url = new URL(value);
    return url.hostname === CLOUDINARY_HOST;
  } catch {
    return false;
  }
}

export function getOptimizedImageUrl(src: string, transformations = DEFAULT_TRANSFORMATIONS) {
  if (!src || !isCloudinaryUrl(src)) {
    return src;
  }

  const url = new URL(src);
  const marker = '/image/upload/';
  const markerIndex = url.pathname.indexOf(marker);

  if (markerIndex === -1) {
    return src;
  }

  const before = url.pathname.slice(0, markerIndex + marker.length);
  const after = url.pathname.slice(markerIndex + marker.length);

  if (after.startsWith(`${transformations}/`)) {
    return src;
  }

  url.pathname = `${before}${transformations}/${after}`;
  return url.toString();
}
