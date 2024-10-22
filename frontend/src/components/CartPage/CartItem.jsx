/* eslint-disable react/prop-types */
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useContext, useState } from "react";
import cartContext from "../../context/cartContext";

const CartItem = ({ name, price, quantity, image, addOns }) => {
  console.log(image);
  const { addItem } = useContext(cartContext);
  const [showAddOns, setShowAddOns] = useState(false);
  const [count, setCount] = useState(quantity);

  function handleQuantityRemoval() {
    const updatedCount = count - 1;
    setCount(updatedCount);
    addItem((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: updatedCount } : item
      )
    );
  }

  function handleQuantityAddition() {
    const updatedCount = count + 1;
    setCount(updatedCount);
    addItem((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: updatedCount } : item
      )
    );
  }

  function handleDelete() {
    addItem((prev) => prev.filter((item) => item.name !== name));
  }

  return (
    <div className="w-full mb-5 h-[150px] flex justify-between items-center">
      <div className="flex gap-3">
        <div className="w-[100px] h-[150px] bg-[#EFEEEE] flex justify-center items-center">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col justify-center gap-3 items-center">
          <span>{name}</span>
          <span>Rs.{price}</span>
          <div className="w-fit p-2 h-fit flex gap-3 justify-center items-center">
            <RemoveCircleOutlineOutlinedIcon
              sx={{ color: "#472C9D", fontSize: 22 }}
              onClick={() => {
                if (count > 1) handleQuantityRemoval();
              }}
            />
            <span className="text-xl">{count}</span>
            <ControlPointOutlinedIcon
              sx={{ color: "#472C9D", fontSize: 22 }}
              onClick={handleQuantityAddition}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end h-full justify-around cursor-pointer">
        {addOns.length > 0 && (
          <div
            className="relative"
            onMouseEnter={() => setShowAddOns(true)}
            onMouseLeave={() => setShowAddOns(false)}
          >
            <span>AddOns: {addOns.length}</span>
            {showAddOns && (
              <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-1 z-10">
                <ul>
                  {addOns.map((addOn, index) => (
                    <li key={index} className="text-gray-700">
                      {addOn}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        <CancelOutlinedIcon sx={{ color: "red" }} onClick={handleDelete} />
      </div>
    </div>
  );
};

export default CartItem;
