/* eslint-disable react/prop-types */
import Face3Icon from "@mui/icons-material/Face3";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";

const ProfileDisplayTag = ({ name, email, avatar }) => {
  const avatarSrc = avatar
    ? `data:image/png;base64,${arrayBufferToBase64(avatar.data)}`
    : null;

  function arrayBufferToBase64(buffer) {
    if (!buffer || !buffer.length) return null;
    
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  return (
    <div className="w-[90%] bg-gradient-to-b from-[#462b9c] to-[#644ab5] h-[100px] rounded-3xl flex items-center justify-between flex-shrink-0">
      <div className="flex gap-3 h-full items-center">
        <div className="size-[70px] rounded-full bg-white ml-3 flex justify-center items-center border-4 border-white overflow-hidden">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Face3Icon sx={{ fontSize: 40, color: "#321e71" }} />
          )}
        </div>
        <div className="flex flex-col h-full justify-center">
          <span className="text-lg font-semibold text-white">{name}</span>
          <span className="text-sm text-[#b9b9b9]">{email}</span>
        </div>
      </div>
      <NavLink 
        to="/homepage/profile/edit"
        className="mr-5 p-2 hover:bg-white/10 rounded-full transition-all duration-200"
      >
        <EditIcon sx={{ fontSize: 24, color: "white" }} />
      </NavLink>
    </div>
  );
};

export default ProfileDisplayTag;