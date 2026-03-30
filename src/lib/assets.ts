/** Raster brand marks in `public/images` (webp + avif). */
export const BRAND_MARK = {
  webp: '/images/medicore-mark.webp',
  avif: '/images/medicore-mark.avif',
} as const;

export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path}`;
}

/** Icons for Notification API / service worker (prefer webp for broad OS support). */
export function notificationIconUrls(): { icon: string; badge: string } {
  const icon = absoluteUrl(BRAND_MARK.webp);
  return { icon, badge: icon };
}
