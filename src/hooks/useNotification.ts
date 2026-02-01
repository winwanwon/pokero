import { useState, useEffect } from 'react';

export const useNotification = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const stored = localStorage.getItem('notificationsEnabled');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', String(notificationsEnabled));
  }, [notificationsEnabled]);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  return { notificationsEnabled, toggleNotifications };
};
