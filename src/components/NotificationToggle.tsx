import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotification } from '@/hooks/useNotification';

const NotificationToggle: React.FC = () => {
  const { notificationsEnabled, toggleNotifications } = useNotification();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleNotifications}
      className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
    >
      {notificationsEnabled ? (
        <Bell className="h-5 w-5 text-foreground transition-all" aria-hidden="true" />
      ) : (
        <BellOff className="h-5 w-5 text-foreground transition-all" aria-hidden="true" />
      )}
    </Button>
  );
};

export default NotificationToggle;
