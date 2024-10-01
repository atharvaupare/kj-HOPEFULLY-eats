import CartItem from "../components/CartPage/CartItem";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import visa from "../assets/visa.svg.png";

import {NavLink} from "react-router-dom"

const CartPage = () => {
  let cartItems = 3;
  let arr = ["Vada Pav", "Pav Bhaji", "Paneer Rice"];
  return (
    <div className="w-screen h-full bg-[#F5F5F5] flex flex-col items-center overflow-hidden overflow-y-auto no-scrollbar pb-16">
      <div className="text-2xl font-semibold m-5 self-start">
        <span>{cartItems == 0 ? "No" : cartItems} Items in cart</span>
      </div>

      {cartItems == 0 ? (
        <button className="w-fit px-10 py-3 my-5 text-2xl bg-[#472C9D] text-white rounded-3xl">
          Add some items
        </button>
      ) : (
        <div className="w-full flex flex-col items-center p-5">
          {arr.map((item, key) => (
            <CartItem name={item} price={20} key={key} />
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
                <span>Rs. 20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg text-[#6F6D6D]">Tax 10%</span>
                <span>Rs. 4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-2xl">Total</span>
                <span>Rs. 20</span>
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
