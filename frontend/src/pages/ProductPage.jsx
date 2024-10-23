import Info from "../components/ProductPage/Info";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductPage = () => {
  const [counter, setCounter] = useState(1);
  const { name: encodedName, price } = useParams();
  const navigate = useNavigate();
  const name = decodeURIComponent(encodedName);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const description = searchParams.get("desc");
  const rating = searchParams.get("rating");
  const imageUrl = searchParams.get("image");
  const returnPath = searchParams.get("returnPath");
  const time = searchParams.get("time");

  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath);
    } else {
      navigate("/homepage");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[rgb(70,43,156)] to-[#644AB5] flex flex-col items-center gap-10 overflow-hidden overflow-y-auto">
      <button 
        onClick={handleBack}
        className="ml-5 mt-5 self-start bg-transparent border-none cursor-pointer"
      >
        <ArrowBackIosNewOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
      </button>

      {/* Image Container */}
      <div
        className="h-[50%] w-[70%] flex justify-center items-center rounded-full"
        style={{
          transform: `scale(${1 - scrollY / 1000})`, // Shrink the image as you scroll
          opacity: 1 - scrollY / 500, // Fade out the image slightly as you scroll
        }}
      >
        <img
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover overflow-hidden rounded-full"
        />
      </div>

      {/* Info Component */}
      <div
        className="w-full transition-transform duration-300"
      >
        <Info
          counter={counter}
          time={time}
          setCounter={setCounter}
          price={price}
          name={name}
          image={imageUrl}
          description={description}
          rating={rating}
          returnPath={returnPath}
        />
      </div>
    </div>
  );
};

export default ProductPage;
