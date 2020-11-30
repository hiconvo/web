import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

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
  align-items: center;
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  pointer-events: none;
`;

export default function NotificationsManager() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    function enqueueNotificationDeletion(id) {
      setTimeout(() => {
        setNotifications((prevNotifs) => prevNotifs.filter((n) => n.id !== id));
      }, 5000);
    }

    function handleNotification(e) {
      setNotifications((prevNotifs) => prevNotifs.concat(e.detail));
      enqueueNotificationDeletion(e.detail.id);
    }

    document.addEventListener("notification", handleNotification);

    return () => {
      document.removeEventListener("notification", handleNotification);
    };
  }, [notifications, setNotifications]);

  return (
    <Container isOpen={notifications.length > 0}>
      <AnimateSharedLayout>
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              layout
              key={notif.id}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              initial={{ opacity: 0, y: -10, scale: 0 }}
            >
              <Notification key={notif.id} {...notif} />
            </motion.div>
          ))}
        </AnimatePresence>
      </AnimateSharedLayout>
    </Container>
  );
}
