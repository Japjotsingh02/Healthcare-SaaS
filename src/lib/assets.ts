import { BRAND_MARK } from '../constants/assets';

export function absoluteUrl(path: string): string {
  if (typeof window === 'undefined') return path;
  return `${window.location.origin}${path}`;
}

export function notificationIconUrls(): { icon: string; badge: string } {
  const icon = absoluteUrl(BRAND_MARK.webp);
  return { icon, badge: icon };
}
