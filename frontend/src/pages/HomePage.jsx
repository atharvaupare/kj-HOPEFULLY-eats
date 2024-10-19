import { Outlet, Navigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setUser(authToken);
    }
    setLoading(false);
  }, []);

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
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default HomePage;
