/* eslint-disable react/prop-types */
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import AddOnCard from "./AddOnCard";
import loremPicsum from "lorem-picsum";
import cartContext from "../../context/cartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Info = ({ counter, setCounter, price, name }) => {
  const { addItem } = useContext(cartContext);
  const navigate = useNavigate();

  function handleCartAddition() {
    addItem((prev) => [...prev, { name, price, quantity: counter }]);
    navigate("/homepage");
  }

  return (
    <div className="w-full h-[600px] bg-white rounded-t-[60px] animate-fade-up">
      <div className="flex justify-between items-center mb-5">
        <div className="px-4 ml-5 mt-3 h-[50px] bg-[#472C9D] text-white rounded-[30px] flex gap-2 justify-center items-center">
          <div className="text-xl">⭐</div>
          <div className="text-xl">4.8</div>
        </div>
        <div className="mt-3 mr-5 h-[50px] flex items-center text-2xl px-4 text-[#C9AA05] font-bold">
          Rs. {price}
        </div>
      </div>

      <div className="mt-1 w-full flex justify-between">
        <span className="text-2xl ml-5">{name}</span>
        <div className="mr-5 flex justify-center items-center gap-5">
          <RemoveCircleOutlineOutlinedIcon
            sx={{ color: "#472C9D", fontSize: 27 }}
            onClick={() =>
              setCounter((prev) => {
                if (prev > 0) return prev - 1;
                else return 0;
              })
            }
          />
          <span className="text-2xl">{counter}</span>
          <ControlPointOutlinedIcon
            sx={{ color: "#472C9D", fontSize: 27 }}
            onClick={() => setCounter((prev) => prev + 1)}
          />
        </div>
      </div>

      <div className="ml-5 text-sm text-[#595959]">
        <span>Your desi tasty vada pav</span>
      </div>

      <div className="ml-5 mt-5 flex flex-col">
        <h3 className="text-lg">Add Ons</h3>
        <div className="flex justify-evenly mt-2">
          <AddOnCard src={loremPicsum({ width: 60 })}></AddOnCard>
          <AddOnCard src={loremPicsum({ width: 60 })}></AddOnCard>
          <AddOnCard src={loremPicsum({ width: 60 })}></AddOnCard>
        </div>
      </div>

      <div className="w-full flex justify-center mt-3">
        <button
          className="px-10 py-3 my-5 text-xl bg-[#472C9D] text-white rounded-3xl"
          onClick={handleCartAddition}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Info;
