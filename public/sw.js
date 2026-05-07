self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { body: event.data?.text() ?? "You have a new alert." };
  }
  const title = data.title || "MediCore";
  const options = {
    body: data.body || "You have a new notification.",
    // icon: data.icon || '/images/medicore-mark.webp',
    // badge: '/images/medicore-mark.webp',
    tag: data.tag || "medicore",
    data: { url: data.url || "/" },
    vibrate: [120, 80, 120],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? self.location.origin;
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const existing = clientList.find((c) => c.url === url && "focus" in c);
        if (existing) return existing.focus();
        return self.clients.openWindow(url);
      }),
  );
});
