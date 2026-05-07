import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import { useNotificationStore } from '../../store/notificationStore';

export default function Layout() {
  useEffect(() => {
    void useNotificationStore.getState().bootstrapNotifications();
  }, []);

  return (
    <div className="flex min-h-screen bg-root text-tx-primary">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen ml-[216px]">
        <AppHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(99,102,241,0.07),transparent)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
