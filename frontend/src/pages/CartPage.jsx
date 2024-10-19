import CartItem from "../components/CartPage/CartItem";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import visa from "../assets/visa.svg.png";
import { useState } from "react";
import OrderConfirmation from "../components/OrderConfirmation";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import cartContext from "../context/cartContext";

const CartPage = () => {
  const { items } = useContext(cartContext);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("authToken");
    const maxTime = Math.max(...items.map((item) => item.time || 30));

    const orderData = {
      cartItems: items.map((item) => ({
        name: item.name,
        price: item.price,
        image: item.image,
        cuisine: item.cuisine,
        time: item.time,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount: total,
      estimatedTime: maxTime,
    };

    console.log("Order data being sent:", orderData);

    try {
      const response = await fetch("http://localhost:3000/api/users/order", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderConfirmation({
          orderToken: data.data.orderToken,
          items: orderData.cartItems,
          totalAmount: total,
          estimatedTime: maxTime,
        });

        items.length = 0;
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      alert("Failed to place order: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const itemTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
            <CartItem
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              key={key}
              image={item.image}
            />
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

            <button
              className={`px-16 py-3 my-5 text-3xl ${
                isLoading ? "bg-gray-400" : "bg-[#472C9D]"
              } text-white rounded-3xl`}
              onClick={handleOrder}
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Order"}
            </button>
            <NavLink to="/homepage">
              <button className="text-lg font-light">Back to menu</button>
            </NavLink>
          </div>
        </div>
      )}
      {orderConfirmation && (
        <OrderConfirmation
          orderDetails={orderConfirmation}
          onClose={() => {
            setOrderConfirmation(null);
            navigate("/homepage");
          }}
        />
      )}
    </div>
  );
};

export default CartPage;
