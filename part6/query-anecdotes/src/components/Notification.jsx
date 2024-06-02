import { useContext } from "react";
import NotificationContext from "../context/notificationContext";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  const [notification, setNotification] = useContext(NotificationContext);
  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
