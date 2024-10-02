/* eslint-disable react/prop-types */
import loremPicsum from "lorem-picsum";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { NavLink } from "react-router-dom";

const HomeScreenDishCard = ({ name, price, image, description, rating }) => {
  const baseUrl = "http://localhost:1337"; // Replace with your Strapi base URL
  // console.log(image, description);

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
      )}`}
    >
      <div className="p-10 bg-gradient-to-b from-[#EBE8E8] to-[#EFEEEE] flex flex-col justify-between items-center py-4 rounded-3xl">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <img src={imageUrl} alt="" className="rounded-lg" />
          <h2>{name}</h2>
        </div>

        <div className="w-full mt-2 flex justify-between">
          <p>Rs. {price}</p>
          <ControlPointOutlinedIcon sx={{ color: "#0E803C" }} />
        </div>
      </div>
    </NavLink>
  );
};

export default HomeScreenDishCard;
