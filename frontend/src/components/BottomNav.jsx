import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import cartContext from "../context/cartContext";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";

const BottomNav = () => {
  const location = useLocation();
  const { items } = useContext(cartContext);

  const noOfItems = items.length;

  return (
    <div className="bg-white w-screen h-[75px] flex justify-evenly items-center fixed bottom-0">
      <NavLink to="/homepage">
        {location.pathname == "/homepage" ? (
          <HomeIcon sx={{ fontSize: 30, color: "#462B9C" }} />
        ) : (
          <HomeIcon sx={{ fontSize: 30, color: "#9D9C9C" }} />
        )}
      </NavLink>
      <NavLink to={"/homepage/search/"}>
        {location.pathname.match(/^\/homepage\/search\/.+$/) ? (
          <SearchIcon sx={{ fontSize: 30, color: "#462B9C" }} />
        ) : (
          <SearchIcon sx={{ fontSize: 30, color: "#9D9C9C" }} />
        )}
      </NavLink>
      <NavLink to="/homepage/cart">
        <div className="relative h-[50px] w-[30px] flex justify-center items-center">
          {noOfItems > 0 && (
            <span className="absolute top-[-8px] right-[-10px] bg-[#462B9C] p-[3px] rounded-full text-white text-[10px]">
              {noOfItems}
            </span>
          )}
          <ShoppingCartOutlinedIcon
            sx={{
              fontSize: 30,
              color:
                location.pathname === "/homepage/cart" ? "#462B9C" : "#9D9C9C",
            }}
          />
        </div>
      </NavLink>

      <NavLink to="/homepage/profile">
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
