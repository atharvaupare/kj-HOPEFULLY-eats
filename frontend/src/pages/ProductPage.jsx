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
      navigate(-1);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[rgb(70,43,156)] to-[#644AB5] flex flex-col items-center gap-10 overflow-hidden">
      <button 
        onClick={handleBack}
        className="ml-5 mt-5 self-start bg-transparent border-none cursor-pointer"
      >
        <ArrowBackIosNewOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
      </button>

      <div className="h-[50%] w-[70%] flex justify-center items-center rounded-full">
        <img
          src={imageUrl || "https://via.placeholder.com/300"}
          alt={name}
          className="h-full w-full object-cover overflow-hidden"
        />
      </div>

      <Info
        counter={counter}
        time={time}
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