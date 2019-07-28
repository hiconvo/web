import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

import Notification from "./Notification";

const Container = styled.div`
  position: fixed;
  top: ${themeGet("space.3")};
  left: 0;
  width: 100%;
  height: auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
`;

export default function NotificationsManager() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    function enqueueNotificationDeletion(id) {
      setTimeout(() => {
        setNotifications(prevNotifs => prevNotifs.filter(n => n.id !== id));
      }, 5000);
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
    <Container isOpen={notifications.length > 0}>
      {notifications.map(notif => (
        <Notification key={notif.id} {...notif} />
      ))}
    </Container>
  );
}
