import ProfileDisplayTag from "../components/ProfilePage/ProfileDisplayTag";
import ProfileInfoTag from "../components/ProfilePage/ProfileInfoTag";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useState } from "react";

const ProfilePage = () => {
    const [status, setStatus] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center bg-[#F5F5F5] overflow-y-auto no-scrollbar">
            <h2 className="text-3xl self-start m-5">Profile</h2>

            <ProfileDisplayTag />

            <div className="flex flex-col items-center w-full mt-5">
                <ProfileInfoTag
                    head="My Account"
                    desc="Make changes to your account"
                    icon1={
                        <PersonOutlineOutlinedIcon
                            sx={{ fontSize: 35, color: "#9075eb" }}
                        />
                    }
                    icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
                />
                <ProfileInfoTag
                    head="Saved Payment Methods"
                    desc="Manage your saved payment methods"
                    icon1={
                        <AddCardOutlinedIcon
                            sx={{ fontSize: 25, color: "#9075eb" }}
                        />
                    }
                    icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
                />
                <ProfileInfoTag
                    head="Face ID / Touch ID"
                    desc="Secure your account"
                    icon1={
                        <FingerprintOutlinedIcon
                            sx={{ fontSize: 30, color: "#9075eb" }}
                        />
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
                    icon1={
                        <LogoutOutlinedIcon
                            sx={{ fontSize: 25, color: "#9075eb" }}
                        />
                    }
                    icon2={<ChevronRightIcon sx={{ fontSize: 20, color: "gray" }} />}
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
        </div>
    );
};

export default ProfilePage;
