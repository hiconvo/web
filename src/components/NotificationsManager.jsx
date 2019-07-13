import React, { useEffect, useState } from "react";

export default function NotificationsManager() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    function enqueueNotificationDeletion(id) {
      setTimeout(() => {
        setNotifications(prevNotifs => prevNotifs.filter(n => n.id !== id));
      }, 2000);
    }

    function handleNotification(e) {
      setNotifications(prevNotifs => prevNotifs.concat(e.detail));
      enqueueNotificationDeletion(e.detail.id);
    }

    document.addEventListener("notification", handleNotification);

    return () => {
      document.removeEventListener("notification", handleNotification);
    };
  }, [notifications, setNotifications]);

  return (
    <div>
      {notifications.map(notif => (
        <span>{notif.message}</span>
      ))}
    </div>
  );
}
