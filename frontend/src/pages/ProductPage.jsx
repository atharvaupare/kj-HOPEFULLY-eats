import Info from "../components/ProductPage/Info";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import loremPicsum from "lorem-picsum";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";

const ProductPage = () => {
  const [counter, setCounter] = useState(1);
  const { name: encodedName, price } = useParams();
  const name = decodeURIComponent(encodedName);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#462B9C] to-[#644AB5] flex flex-col items-center gap-10 overflow-hidden">
      <NavLink to="/homepage" className="ml-5 mt-5 self-start">
        <ArrowBackIosNewOutlinedIcon
          sx={{ color: "white", fontSize: 20 }}
        />
      </NavLink>

      <div className="h-[400px]">
        <img src={loremPicsum({ width: 300, height: 250 })} alt="" />
      </div>

      <Info counter={counter} setCounter={setCounter} price={price} name={name}/>
    </div>
  );
};

export default ProductPage;
