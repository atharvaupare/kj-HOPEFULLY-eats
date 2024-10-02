import CartItem from "../components/CartPage/CartItem";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import visa from "../assets/visa.svg.png";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import cartContext from "../context/cartContext";

const CartPage = () => {
  const { items } = useContext(cartContext);
  const navigate = useNavigate();

  // Calculate the item total using reduce
  const itemTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = itemTotal * 0.1;
  const total = itemTotal + tax;

  return (
    <div className="w-screen h-full bg-[#F5F5F5] flex flex-col items-center overflow-hidden overflow-y-auto no-scrollbar pb-16">
      <div className="text-2xl font-semibold m-5 self-start">
        <span>{items.length === 0 ? "No" : items.length} Items in cart</span>
      </div>

      {items.length === 0 ? (
        <button
          className="w-fit px-10 py-3 my-5 text-2xl bg-[#472C9D] text-white rounded-3xl"
          onClick={() => navigate("/homepage")}
        >
          Add some items
        </button>
      ) : (
        <div className="w-full flex flex-col items-center p-5">
          {items.map((item, key) => (
            <CartItem name={item.name} price={item.price} quantity={item.quantity} key={key} />
          ))}

          <div className="flex flex-col items-center w-full">
            <h2 className="text-xl font-semibold self-start">Payment Method</h2>

            <div className="w-[90%] h-[80px] mt-5 bg-[#EFEEEE] flex justify-between items-center rounded-3xl">
              <img src={visa} alt="" className="w-[100px] m-5" />
              <div className="flex h-full items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-xl">UPI</span>
                  <span className="text-sm">anujparwal@okicici</span>
                </div>
                <div className="mr-4">
                  <ArrowForwardIosOutlinedIcon />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col m-5 gap-2">
              <div className="flex justify-between">
                <span className="text-lg text-[#6F6D6D]">Subtotal</span>
                <span>Rs. {itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg text-[#6F6D6D]">Tax 10%</span>
                <span>Rs. {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-2xl">Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <button className="px-16 py-3 my-5 text-3xl bg-[#472C9D] text-white rounded-3xl">
              Order
            </button>
            <NavLink to="/homepage">
              <button className="text-lg font-light">Back to menu</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
