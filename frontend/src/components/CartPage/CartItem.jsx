/* eslint-disable react/prop-types */
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import loremPicsum from "lorem-picsum";
import { useState } from "react";

const CartItem = ({ name, price }) => {
    const [counter, setCounter] = useState(1);

  return (
    <div className="w-full mb-5 h-[150px] flex justify-between items-center">
      <div className="flex gap-3">
        <div className="w-[100px] h-[150px] bg-[#EFEEEE] flex justify-center items-center">
          <img src={loremPicsum({ width: 90, height: 120 })} alt="" />
        </div>
        <div className="flex flex-col justify-center gap-3 items-center">
          <span>{name}</span>
          <span>Rs.{price}</span>
          <div className="w-fit p-2 h-fit flex gap-3 justify-center items-center">
            <RemoveCircleOutlineOutlinedIcon
              sx={{ color: "#472C9D", fontSize: 22 }}
              onClick={() =>
                setCounter((prev) => {
                  if (prev > 0) return prev - 1;
                  else return 0;
                })
              }
            />
            <span className="text-xl">{counter}</span>
            <ControlPointOutlinedIcon
              sx={{ color: "#472C9D", fontSize: 22 }}
              onClick={() => setCounter((prev) => prev + 1)}
            />
          </div>
        </div>
      </div>
      <div className="m-5">
        <CancelOutlinedIcon sx={{ color: "red" }} />
      </div>
    </div>
  );
};

export default CartItem;
