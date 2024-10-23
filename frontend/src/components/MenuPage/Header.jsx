import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-screen flex justify-between p-5">
      <div className="text-4xl font-semibold">Menu</div>
      <NavLink to="/homepage/profile">
        <AccountCircleIcon
          color="black"
          sx={{ fontSize: 55, color: "#462b9c" }}
        />
      </NavLink>
    </div>
  );
};

export default Header;
