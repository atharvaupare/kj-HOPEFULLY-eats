/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

// Card component styling
const SearchResultCard = ({ name, cuisines, time, price, image, rating, description }) => {
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
      )}`}
    >
      <div
        className="relative bg-white rounded-lg overflow-hidden shadow-lg"
        onClick={() => console.log("yo yo")}
      >
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-[150px]
          object-cover`}
        />

        <div className="absolute top-2 left-2 flex items-center gap-2 bg-white/80 p-1 rounded-md text-sm">
          <AccessTimeIcon fontSize="small" />
          <span>{time} min</span>
        </div>
        <div className="absolute top-2 right-2 h-[30px] flex items-center bg-white/80 p-1 rounded-md text-xs">
          <CurrencyRupeeOutlinedIcon sx={{ fontSize: 18 }} />
          <span className="text-[15px]">{price}</span>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{cuisines}</p>
          <div className="mt-2 text-sm flex items-center justify-between">
            <span className="bg-orange-500 text-white p-1 rounded-md">
              {rating} ⭐
            </span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default SearchResultCard;
