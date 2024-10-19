/* eslint-disable react/prop-types */
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { NavLink, useLocation } from "react-router-dom";

const HomeScreenDishCard = ({ name, price, image, description, rating, time }) => {
  const location = useLocation()
  const baseUrl = "http://localhost:1337";

  const imageUrl = image
    ? `${baseUrl}${image.url}`
    : "https://via.placeholder.com/120"; // Use placeholder if no image

  return (
    <NavLink
      to={`/item/${encodeURIComponent(
        name
      )}/${price}?image=${encodeURIComponent(
        imageUrl
      )}&desc=${encodeURIComponent(description)}&rating=${encodeURIComponent(
        rating
      )}&time=${encodeURIComponent(time)}&prevPath=${encodeURIComponent(location.pathname)}`}
    >
      <div className="p-4 bg-gradient-to-b from-[#EBE8E8] to-[#EFEEEE] flex flex-col justify-between items-center py-4 rounded-3xl h-full">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img src={imageUrl} alt={name} className="w-[120px] h-[120px] object-cover rounded-lg" />
          <h2 className="text-center text-lg font-semibold">{name}</h2>
        </div>

        <div className="w-full mt-2 flex justify-between items-center">
          <p className="text-base font-medium">Rs. {price}</p>
          <ControlPointOutlinedIcon sx={{ color: "#0E803C" }} />
        </div>
      </div>
    </NavLink>
  );
};

export default HomeScreenDishCard;
