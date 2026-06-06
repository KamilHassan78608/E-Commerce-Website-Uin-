import React, { useState, useEffect } from 'react'
import { useAuth } from '../contents/AuthContext';
import { getMyOrders } from '../services/api';

const OrderDetail = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getMyOrders();
      
      // Filter orders to only show those belonging to the logged-in user
      const filteredOrders = response.data.filter(order => {
        if (!user || !order.shippingDetails) return false;
        
        // Check if order's shipping name matches logged-in user's name
        const orderOwnerName = `${order.shippingDetails.firstName} ${order.shippingDetails.lastName}`.toLowerCase().trim();
        const loggedInUserName = user.name.toLowerCase().trim();
        
        return orderOwnerName === loggedInUserName;
      });
      
      setOrders(filteredOrders);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {orders.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600">You haven't placed any orders. Start shopping to see your orders here!</p>
        </div>
      )}

      {/* Orders Display */}
      <div className="flex flex-col md:flex-row flex-wrap gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-6 shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg">
                  {order._id}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Products */}
            <div className="mt-5">
              <h4 className="font-semibold mb-3">
                Ordered Items
              </h4>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border rounded-lg p-3"
                  >
                    <div>
                      <h5 className="font-medium">
                        {item.name}
                      </h5>

                      <p className="text-sm text-gray-500">
                        Size: {item.size}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="font-semibold">
                      ${item.totalPrice}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="mt-5">
              <h4 className="font-semibold mb-2">
                Shipping Address
              </h4>

              <p className="text-gray-600 text-sm">
                {order.shippingDetails.firstName}{" "}
                {order.shippingDetails.lastName}
              </p>

              <p className="text-gray-600 text-sm">
                {order.shippingDetails.address}
              </p>

              <p className="text-gray-600 text-sm">
                {order.shippingDetails.city},{" "}
                {order.shippingDetails.state}
              </p>

              <p className="text-gray-600 text-sm">
                {order.shippingDetails.zipCode}
              </p>
            </div>

            {/* Payment */}
            <div className="mt-5">
              <h4 className="font-semibold mb-2">
                Payment Details
              </h4>

              <p className="text-sm text-gray-600">
                {order.paymentDetails.cardName}
              </p>

              <p className="text-sm text-gray-600">
                **** **** ****{" "}
                {order.paymentDetails.lastFourDigits}
              </p>
            </div>

            {/* Summary */}
            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>${order.subtotal}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Shipping</span>
                <span>${order.shipping}</span>
              </div>

              <div className="flex justify-between text-sm mb-1">
                <span>Tax</span>
                <span>${order.tax}</span>
              </div>

              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${order.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail
