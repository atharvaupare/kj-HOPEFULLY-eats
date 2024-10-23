import { useEffect, useState } from "react";
import ProfileDisplayTag from "../components/ProfilePage/ProfileDisplayTag";
import ProfileInfoTag from "../components/ProfilePage/ProfileInfoTag";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Snackbar from "../components/Snackbar";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [status, setStatus] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found, please log in.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setProfileData(data.data); // Successfully fetched profile data
        } else {
          setError(data.message || "Failed to fetch profile data");
        }
      } catch {
        setError("An error occurred while fetching the profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Display error if occurred
  }

  if (!profileData) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>; // Display error if occurred
  }

  if (!profileData) {
    return <div>Loading...</div>; // Show loading state until data is fetched
  }

  console.log(profileData);
  
  return (
    <div className="w-full h-full flex flex-col items-center bg-[#F5F5F5] overflow-y-auto no-scrollbar">
      <h2 className="text-3xl self-start m-5">Profile</h2>

      <ProfileDisplayTag name={profileData.name} email={profileData.email} avatar={profileData.avatar}/>

      <div className="flex flex-col items-center w-full mt-5">
        <NavLink to="/homepage/profile/orders" className="w-full flex justify-center">
          <ProfileInfoTag
            head="My Orders"
            desc="See all your orders"
            icon1={
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: 35, color: "#9075eb" }}
              />
            }
            icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
          />
        </NavLink>
        <ProfileInfoTag
          head="Saved Payment Methods"
          desc="Manage your saved payment methods"
          icon1={
            <AddCardOutlinedIcon sx={{ fontSize: 25, color: "#9075eb" }} />
          }
          icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
        />
        <ProfileInfoTag
          head="Face ID / Touch ID"
          desc="Secure your account"
          icon1={
            <FingerprintOutlinedIcon sx={{ fontSize: 30, color: "#9075eb" }} />
          }
          icon2={
            !status ? (
              <ToggleOffOutlinedIcon
                sx={{ fontSize: 40, color: "gray" }}
                onClick={() => setStatus(!status)}
              />
            ) : (
              <ToggleOnOutlinedIcon
                sx={{ fontSize: 40, color: "#9075eb" }}
                onClick={() => setStatus(!status)}
              />
            )
          }
        />
        <ProfileInfoTag
          head="Log Out"
          desc="Click here to exit"
          icon1={<LogoutOutlinedIcon sx={{ fontSize: 25, color: "#9075eb" }} />}
          icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
          onClick={handleLogout}
        />
      </div>

      <div className="flex flex-col items-center w-full mt-5 pb-24">
        <ProfileInfoTag
          head="Help & Support"
          icon1={
            <NotificationsOutlinedIcon
              sx={{ fontSize: 25, color: "#9075eb" }}
            />
          }
          icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
        />
        <ProfileInfoTag
          head="About App"
          icon1={
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: 25, color: "#9075eb" }}
            />
          }
          icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
        />
      </div>

      <Snackbar
        message="Logged out successfully"
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </div>
  );
};

export default ProfilePage;
