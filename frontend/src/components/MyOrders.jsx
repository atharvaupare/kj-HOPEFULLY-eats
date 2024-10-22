import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import DinnerDiningOutlinedIcon from "@mui/icons-material/DinnerDiningOutlined";
import OrderConfirmation from "./OrderConfirmation";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderIndex, setExpandedOrderIndex] = useState(null); // Track which order is expanded
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const profileResponse = await fetch(
          "http://localhost:3000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();
        const orderTokens = profileData.data.orders;

        const orderPromises = orderTokens.map(async (orderToken) => {
          const orderResponse = await fetch(
            `http://localhost:3000/api/users/order/${orderToken}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return orderResponse.json();
        });

        const ordersData = await Promise.all(orderPromises);
        ordersData.reverse();
        setOrders(ordersData);
        setIsLoading(false);
      } catch {
        setError("Failed to fetch orders");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index); // Toggle the clicked order
  };

  function handleBack() {
    navigate("/homepage/profile");
  }

  const displayTime = (orderTime) => {
    const now = new Date();
    const orderDate = new Date(orderTime);

    const diffInMs = now - orderDate;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else {
      return `${diffInYears} years ago`;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-50 p-5 overflow-hidden overflow-y-auto mb-20">
      <div className="w-[95%] h-[80px] top-1 flex justify-between items-center bg-gradient-to-b from-[#462b9c] to-[#644ab5] rounded-xl text-white fixed">
        <button
          onClick={handleBack}
          className="self-start ml-5 bg-transparent border-none cursor-pointer h-full"
        >
          <ArrowBackIosNewOutlinedIcon sx={{ color: "white", fontSize: 20 }} />
        </button>
        <div className="flex gap-3 w-full justify-center">
          <h1 className="text-3xl font-semibold">My Orders</h1>
          <DinnerDiningOutlinedIcon sx={{ fontSize: 40 }} />
        </div>
      </div>

      <div className="mt-[80px] w-[90%]">
        {isLoading ? (
          <p className="text-gray-600">Loading your orders...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="w-full flex flex-col gap-5">
            {orders.map((order, index) => (
              <div
                key={index}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg shadow-md transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleOrderDetails(index)}
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {displayTime(order.data.orderDate)}
                    </h2>
                    <p className="text-gray-600">
                      Total Amount: Rs. {order.data.totalAmount}
                    </p>
                  </div>
                </div>

                {expandedOrderIndex === index && (
                  <OrderConfirmation
                    orderDetails={order.data}
                    onClose={() => setExpandedOrderIndex(-1)}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
