import { create } from 'zustand';
import type { Notification, NotificationType } from '../types';
import { notificationIconUrls } from '../lib/assets';
import { serviceWorkerScope, serviceWorkerScriptUrl } from '../lib/serviceWorker';

interface NotificationState {
  notifications: Notification[];
  swRegistered: boolean;
  permissionGranted: boolean;

  addNotification: (n: { title: string; message: string; type: NotificationType }) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
  registerSW: () => Promise<boolean>;
  bootstrapNotifications: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
  sendLocalNotification: (title: string, body: string, tag?: string, type?: NotificationType) => void;
  unreadCount: () => number;
}

function syncPermissionFromBrowser(
  set: (partial: Partial<Pick<NotificationState, 'permissionGranted'>>) => void
) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  set({ permissionGranted: Notification.permission === 'granted' });
}

async function showOsNotification(title: string, body: string, tag: string) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const { icon, badge } = notificationIconUrls();
  const dataUrl = `${window.location.origin}${window.location.pathname}`;

  const showViaSw = async (): Promise<boolean> => {
    if (!('serviceWorker' in navigator)) return false;
    const scope = serviceWorkerScope();
    try {
      let reg = await navigator.serviceWorker.getRegistration();
      if (!reg) {
        reg = await navigator.serviceWorker.register(serviceWorkerScriptUrl(), { scope });
      }
      await navigator.serviceWorker.ready;
      reg = await navigator.serviceWorker.getRegistration();
      if (!reg?.active) return false;
      await reg.showNotification(title, {
        body,
        icon,
        badge,
        tag,
        data: { url: dataUrl },
      });
      return true;
    } catch {
      return false;
    }
  };

  if (await showViaSw()) return;

  try {
    new Notification(title, { body, icon });
  } catch {
    /* ignore */
  }
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  swRegistered: false,
  permissionGranted: typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted',

  addNotification: (n) => {
    const notif: Notification = {
      ...n,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      timestamp: new Date(),
      read: false,
    };
    set((s) => ({ notifications: [notif, ...s.notifications].slice(0, 50) }));
  },

  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),

  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearAll: () => set({ notifications: [] }),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,

  registerSW: async () => {
    if (!('serviceWorker' in navigator)) return false;
    try {
      const reg = await navigator.serviceWorker.register(serviceWorkerScriptUrl(), {
        scope: serviceWorkerScope(),
      });
      await reg.update().catch(() => {});
      set({ swRegistered: true });
      return true;
    } catch {
      set({ swRegistered: false });
      return false;
    }
  },

  bootstrapNotifications: async () => {
    syncPermissionFromBrowser(set);
    await get().registerSW();
    syncPermissionFromBrowser(set);
  },

  requestPermission: async () => {
    if (!('Notification' in window)) return false;
    const permission = await Notification.requestPermission();
    const granted = permission === 'granted';
    set({ permissionGranted: granted });
    if (granted) {
      await get().registerSW();
    }
    return granted;
  },

  sendLocalNotification: (title, body, tag = 'medicore', type: NotificationType = 'info') => {
    get().addNotification({ title, message: body, type });
    void showOsNotification(title, body, tag);
  },
}));
