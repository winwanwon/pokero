import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NotificationContextType {
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const stored = localStorage.getItem('notificationsEnabled');
    const value = stored !== null ? stored === 'true' : true;
    console.log('🔔 NotificationProvider initialized:', { stored, value });
    return value;
  });

  useEffect(() => {
    console.log('🔔 Saving notification preference:', notificationsEnabled);
    localStorage.setItem('notificationsEnabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => {
      console.log('🔔 Toggling notifications:', { from: prev, to: !prev });
      return !prev;
    });
  };

  return (
    <NotificationContext.Provider value={{ notificationsEnabled, toggleNotifications }}>
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
