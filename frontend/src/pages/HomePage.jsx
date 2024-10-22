import { Outlet, Navigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Toast from "../components/Toast";
import ClipLoader from "react-spinners/ClipLoader";
import notif from "../assets/notif.mp3"

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const playSound = ()=>{
    new Audio(notif).play();
  }

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setUser(authToken);
    }
    const socketInstance = io.connect("http://localhost:3000");
    setSocket(socketInstance);

    const userId = localStorage.getItem("userId");
    if (userId) {
      socketInstance.emit("join_room", userId);
    }
    setLoading(false);

    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      const newNotification = {
        id: Date.now(),
        message: data.message,
        status: data.newStatus,
      };
      playSound();
      setNotifications((prev) => [...prev, newNotification]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  if (loading) {
    return (
      <div className="w-screen h-full flex justify-center items-center">
        <ClipLoader
          color={"gray"}
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="w-screen h-[100vh] flex flex-col">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          message={notification.message}
          status={notification.status}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default HomePage;
