import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { NavLink, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bg-white w-screen h-[75px] flex justify-evenly items-center fixed bottom-0">
      <NavLink to="/homepage">
        {location.pathname == "/homepage" ? (
          <HomeIcon sx={{ fontSize: 30, color: "#462B9C" }} />
        ) : (
          <HomeIcon sx={{ fontSize: 30, color: "#9D9C9C" }} />
        )}
      </NavLink>
      <NavLink to={"/homepage/search"}>
        {location.pathname == "/homepage/search" ? (
          <SearchIcon sx={{ fontSize: 30, color: "#462B9C" }} />
        ) : (
          <SearchIcon sx={{ fontSize: 30, color: "#9D9C9C" }} />
        )}
      </NavLink>
      <NavLink to="/homepage/cart">
        {location.pathname == "/homepage/cart" ? (
          <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: "#462B9C" }} />
        ) : (
          <ShoppingCartOutlinedIcon sx={{ fontSize: 30, color: "#9D9C9C" }} />
        )}
      </NavLink>
      <NavLink to='/homepage/profile'>
        {location.pathname == "/homepage/profile" ? (
          <PersonOutlinedIcon sx={{ fontSize: 32, color: "#462B9C" }} />
        ) : (
          <PersonOutlinedIcon sx={{ fontSize: 32, color: "#9D9C9C" }} />
        )}
      </NavLink>
    </div>
  );
};

export default BottomNav;
