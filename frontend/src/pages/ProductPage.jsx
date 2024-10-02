import Info from "../components/ProductPage/Info";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { useState } from "react";

const ProductPage = () => {
  const [counter, setCounter] = useState(1);
  const { name: encodedName, price } = useParams();

  const name = decodeURIComponent(encodedName);

  // Get the image URL from the query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const description = searchParams.get("desc");
  const rating = searchParams.get("rating");
  const imageUrl = searchParams.get("image");
  console.log(imageUrl, description);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#462B9C] to-[#644AB5] flex flex-col items-center gap-10 overflow-hidden">
      <NavLink to="/homepage" className="ml-5 mt-5 self-start">
        <ArrowBackIosNewOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
      </NavLink>

      <div className="h-[50%] w-[70%] flex justify-center items-center rounded-full">
        <img
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover overflow-hidden "
        />
      </div>

      <Info
        counter={counter}
        setCounter={setCounter}
        price={price}
        name={name}
        image={imageUrl}
        description={description}
        rating={rating}
      />
    </div>
  );
};

export default ProductPage;
