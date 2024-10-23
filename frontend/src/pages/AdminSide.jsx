import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/AdminSide/Table";

const AdminSide = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const adminToken = localStorage.getItem("adminToken");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/adminlogin");
  };

  return (
    <div className="w-screen h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-purple-700">
          Admin Dashboard
        </h1>
        <div className="flex gap-5">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            <a href="http://localhost:1337/admin" target="_blank">Update Stock</a>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
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

        <Table
          adminToken={adminToken}
          selectedStatus={selectedStatus}
          setSelectedOrder={setSelectedOrder}
          setUserOrders={setUserOrders}
        />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center flex-col">
          <h3 className="text-xl mb-4 sticky top-0 bg-white p-4 border">
            User Order History
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full h-3/4 overflow-y-auto no-scrollbar">
            {userOrders.map((order) => (
              <div key={order._id} className="mb-4 border-b pb-4">
                <p>Order Token: {order.orderToken}</p>
                <p>Total Amount: Rs. {order.totalAmount}</p>
                <p>
                  Dishes:{" "}
                  {order.cartItems
                    .map((item) => `${item.name} (${item.quantity})`)
                    .join(", ")}
                </p>
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
