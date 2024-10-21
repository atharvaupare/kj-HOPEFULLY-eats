import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminSide = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // For expanding order details
  const [userOrders, setUserOrders] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken"); // Fetch the token for protected routes

  // Fetch orders based on pagination
  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/api/admin/getOrders?page=${pageNumber}&limit=5`,
        {
          headers: { Authorization: `Bearer ${adminToken}` }, // Pass token for protected route
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

  // Update order status
  const updateOrderStatus = async (orderToken, newStatus) => {
    try {
      newStatus = newStatus.toLowerCase();
      const response = await axios.post(
        "http://localhost:3000/api/admin/updateOrder",
        { orderToken, newStatus },
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      fetchOrders(page);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Fetch user order history
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
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
  }, [adminToken, navigate]);

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

  const filteredOrders =
    selectedStatus === "All"
      ? orders
      : orders.filter((order) => order.status === selectedStatus.toLowerCase());

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-purple-700">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      {/* Orders Section */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="Pending">Pending</option>
          <option value="Cooking">Cooking</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
          <option value="All">All</option> {/* Option to view all orders */}
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl mb-4 font-semibold text-gray-700">
          Order Management
        </h2>

        {/* Orders Table */}
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
            {filteredOrders.map((order) => (
              <tr key={order._id} className={getStatusClass(order.status)}>
                <td className="px-6 py-4 border-b text-sm">
                  {order.orderToken}
                </td>
                <td className="px-6 py-4 border-b text-sm">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.orderToken, e.target.value)
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl mb-4">
              Order Details: {selectedOrder.orderToken}
            </h3>
            <p>Status: {selectedOrder.status}</p>
            <p>Total Amount: Rs. {selectedOrder.totalAmount}</p>
            <p>
              User: {selectedOrder.user.name} ({selectedOrder.user.email})
            </p>
            <p>
              Dishes:{" "}
              {selectedOrder.cartItems
                .map((item) => `${item.name} (${item.quantity})`)
                .join(", ")}
            </p>{" "}
            {/* Update this line */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* User Orders Modal */}
      {userOrders && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-xl mb-4">User Order History</h3>
            {userOrders.map((order) => (
              <div key={order._id} className="mb-4">
                <p>Order Token: {order.orderToken}</p>
                <p>Status: {order.status}</p>
                <p>Total Amount: Rs. {order.totalAmount}</p>
                <p>
                  Dishes:{" "}
                  {order.cartItems
                    .map((item) => `${item.name} (${item.quantity})`)
                    .join(", ")}
                </p>{" "}
                {/* Update this line */}
              </div>
            ))}
            <button
              onClick={() => setUserOrders(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSide;
