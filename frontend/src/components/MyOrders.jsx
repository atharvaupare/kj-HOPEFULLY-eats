import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from '@mui/material';

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
        const profileResponse = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileResponse.json();
        const orderTokens = profileData.data.orders;

        const orderPromises = orderTokens.map(async (orderToken) => {
          const orderResponse = await fetch(`http://localhost:3000/api/users/order/${orderToken}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return orderResponse.json();
        });

        const ordersData = await Promise.all(orderPromises);
        setOrders(ordersData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatRemainingTime = (estimatedTime, orderTime) => {
    const timePassed = (Date.now() - new Date(orderTime).getTime()) / 60000; // Convert to minutes
    const timeLeft = estimatedTime - timePassed;
  
    return timeLeft > 0 ? `${Math.floor(timeLeft)} mins left` : "Order Ready";
  };

  const toggleOrderDetails = (index) => {
    setExpandedOrderIndex(expandedOrderIndex === index ? null : index); // Toggle the clicked order
  };

  return (
    <div className="w-full h-full bg-gray-50 p-5">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">My Orders</h1>
      {isLoading ? (
        <p className="text-gray-600">Loading your orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md transition-all duration-300">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleOrderDetails(index)}>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Order #{order.data.orderToken}</h2>
                  <p className="text-gray-600">Total Amount: Rs. {order.data.totalAmount}</p>
                </div>
                {expandedOrderIndex === index ? (
                  <ExpandLessIcon className="text-gray-500" />
                ) : (
                  <ExpandMoreIcon className="text-gray-500" />
                )}
              </div>

              <Collapse in={expandedOrderIndex === index}>
                <div className="mt-4">
                  <p className="font-medium text-gray-600">Items:</p>
                  <ul className="mb-4">
                    {order.data.cartItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-4 mb-2">
                        <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-md border" />
                        <div>
                          <p className="text-gray-700">{item.name}</p>
                          <p className="text-sm text-gray-600">Rs. {item.price} x {item.quantity} = Rs. {item.totalPrice}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-gray-600">Estimated Time: {formatRemainingTime(order.data.estimatedTime, order.data.orderDate)}</p>
                  <p className="font-medium text-gray-600">Status: {order.data.estimatedTime > 0 ? "Ongoing" : "Completed"}</p>
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
