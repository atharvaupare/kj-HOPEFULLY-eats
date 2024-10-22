/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3000");

const Table = ({
  adminToken,
  selectedStatus,
  setSelectedOrder,
  setUserOrders,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const statusQuery =
        selectedStatus.toLowerCase() === "all"
          ? ""
          : `&status=${selectedStatus.toLowerCase()}`;

      const response = await axios.get(
        `http://localhost:3000/api/admin/getOrders?page=${pageNumber}&limit=5${statusQuery}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      const { orders, pagination } = response.data.data;
      setOrders(orders);
      setPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const updateOrderStatus = async (userName, orderToken, newStatus, userId) => {
    try {
      newStatus = newStatus.toLowerCase();
      const response = await axios.post(
        "http://localhost:3000/api/admin/updateOrder",
        { orderToken, newStatus },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      socket.emit("send_message", { 
        room: userId,  // Add the room parameter
        message: `${userName}, your order is ${newStatus}`,
        newStatus: newStatus
      });
      fetchOrders(page);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const fetchUserOrders = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/getOrders?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      setUserOrders(response.data.data.orders); // Set user order history
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };
  useEffect(() => {
    if (!adminToken) {
      navigate("/adminlogin");
    } else {
      fetchOrders(); // Initial fetch
      const intervalId = setInterval(() => {
        fetchOrders(); // Fetch new orders periodically
      }, 30000); // Adjust the interval as needed (e.g., every 30 seconds)

      return () => clearInterval(intervalId); // Clean up on component unmount
    }
  }, [adminToken, navigate, selectedStatus]);

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100"; // Light yellow for pending
      case "cooking":
        return "bg-orange-100"; // Light orange for cooking
      case "ready":
        return "bg-green-100"; // Light green for ready
      case "delivered":
        return "bg-blue-100"; // Light blue for delivered
      case "canceled":
        return "bg-red-100"; // Light red for canceled
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading Orders...
      </div>
    );
  }

  return (
    <div>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
              Order Token
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
              Total Amount
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
              User
            </th>
            <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className={getStatusClass(order.status)}>
              <td className="px-6 py-4 border-b text-sm">{order.orderToken}</td>
              <td className="px-6 py-4 border-b text-sm">
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.user.name, order.orderToken, e.target.value, order.user._id)
                  }
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="pending">Pending</option>
                  <option value="cooking">Cooking</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </td>
              <td className="px-6 py-4 border-b text-sm">
                Rs. {order.totalAmount}
              </td>
              <td className="px-6 py-4 border-b text-sm">
                <button
                  onClick={() => fetchUserOrders(order.user._id)}
                  className="text-blue-500 hover:underline"
                >
                  {order.user.name} ({order.user.email})
                </button>
              </td>
              <td className="px-6 py-4 border-b text-sm">
                <button
                  onClick={() => {
                    console.log(order);
                    setSelectedOrder(order);
                  }} // Expand order details
                  className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-4">
        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            onClick={() => fetchOrders(i + 1)}
            className={`px-4 py-2 border rounded-lg ${
              page === i + 1
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
