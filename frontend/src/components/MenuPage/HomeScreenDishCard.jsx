/* eslint-disable react/prop-types */
import loremPicsum from "lorem-picsum";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { NavLink } from "react-router-dom";

const HomeScreenDishCard = ({ name }) => {
  return (
    <NavLink to='/item'>
      <div className="p-10 bg-gradient-to-b from-[#EBE8E8] to-[#EFEEEE] flex flex-col justify-between items-center py-4 rounded-3xl">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img
            src={loremPicsum({ width: 120, height: 120, random: true })}
            alt=""
            className="rounded-lg"
          />
          <h2>{name}</h2>
        </div>

        <div className="w-full mt-2 flex justify-between">
          <p>Rs. 20</p>
          <ControlPointOutlinedIcon sx={{ color: "#0E803C" }} />
        </div>
      </div>
    </NavLink>
  );
};

export default HomeScreenDishCard;
