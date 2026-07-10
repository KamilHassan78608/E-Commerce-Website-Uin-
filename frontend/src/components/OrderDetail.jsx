// OrderDetail.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contents/AuthContext';
import { getMyOrders } from '../services/api';

const OrderDetail = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      fetchOrders();
    } else {
      setError('Please login to view your orders');
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Pass userId as query parameter
      const response = await getMyOrders(user._id);
      
      console.log('Orders response:', response.data);
      
      const ordersData = response.data?.data || [];
      setOrders(ordersData);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Rest of your component remains the same...
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">{error}</p>
          {user && user._id && (
            <button
              onClick={fetchOrders}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600">You haven't placed any orders. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders ({orders.length})</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b pb-4">
              <div>
                <h3 className="font-bold text-lg">
                  Order #{order._id?.slice(-6) || 'N/A'}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status || 'Pending'}
              </span>
            </div>

            {/* Products */}
            <div className="mt-5">
              <h4 className="font-semibold mb-3">Ordered Items</h4>
              <div className="space-y-3">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-lg p-3"
                  >
                    <div>
                      <h5 className="font-medium">{item.name || 'Product'}</h5>
                      <p className="text-sm text-gray-500">
                        Size: {item.size || 'N/A'} • Qty: {item.quantity || 0}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ${(item.totalPrice || item.price * item.quantity || 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                {order.shippingDetails ? (
                  <>
                    <p className="text-gray-600 text-sm">
                      {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {order.shippingDetails.address}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {order.shippingDetails.city}, {order.shippingDetails.state}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {order.shippingDetails.zipCode}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No shipping details</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Payment Details</h4>
                {order.paymentDetails ? (
                  <>
                    <p className="text-gray-600 text-sm">{order.paymentDetails.cardName}</p>
                    <p className="text-gray-600 text-sm">
                      **** **** **** {order.paymentDetails.lastFourDigits}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm">No payment details</p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-5 border-t pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>${(order.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping</span>
                <span>${(order.shipping || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tax</span>
                <span>${(order.tax || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>${(order.total || 0).toFixed(2)}</span>
              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;