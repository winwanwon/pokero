import React, { createContext, useCallback, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

const isSupported = 'Notification' in window;

interface NotificationContextType {
  notificationsSupported: boolean;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  requestNotificationPermission: () => Promise<NotificationPermission>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [optedIn, setOptedIn] = useState(() => {
    const stored = localStorage.getItem('notificationsEnabled');
    return stored !== null ? stored === 'true' : true;
  });
  const [permission, setPermission] = useState<NotificationPermission>(isSupported ? Notification.permission : 'denied');

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', String(optedIn));
  }, [optedIn]);

  const requestNotificationPermission = useCallback(async () => {
    if (!isSupported) return 'denied';
    const result = Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;
    setPermission(result);
    return result;
  }, []);

  const toggleNotifications = async () => {
    if (!isSupported) return;

    if (Notification.permission === 'denied') {
      setPermission('denied');
      toast({
        title: 'Notifications are blocked',
        description: "Turn them on in your browser's site settings.",
      });
      return;
    }

    if (Notification.permission === 'default') {
      setOptedIn((await requestNotificationPermission()) === 'granted');
      return;
    }

    setPermission('granted');
    setOptedIn((prev) => !prev);
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationsSupported: isSupported,
        notificationsEnabled: optedIn && permission === 'granted',
        toggleNotifications,
        requestNotificationPermission,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
