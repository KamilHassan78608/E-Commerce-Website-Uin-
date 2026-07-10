import React, { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus, deleteOrder } from '../services/api'

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const response = await getAllOrders()
            // Handle both array and object responses
            const ordersData = Array.isArray(response.data) ? response.data : (response.data?.data || [])
            setOrders(ordersData)
            setError('')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load orders')
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus)
            setOrders(orders.map(o => 
                o._id === orderId ? { ...o, status: newStatus } : o
            ))
            setSuccess('Order status updated successfully')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update order status')
        }
    }

    const handleDelete = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await deleteOrder(orderId)
                setOrders(orders.filter(o => o._id !== orderId))
                setSuccess('Order deleted successfully')
                setTimeout(() => setSuccess(''), 3000)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete order')
            }
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'shipped': 'bg-purple-100 text-purple-800',
            'delivered': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            {loading ? (
                <div className="text-center py-8">Loading orders...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2 text-left">Order ID</th>
                                <th className="border px-4 py-2 text-left">Customer</th>
                                <th className="border px-4 py-2 text-left">Total Amount</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Items</th>
                                <th className="border px-4 py-2 text-left">Date</th>
                                <th className="border px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2 font-mono text-sm">{order._id.slice(-8)}</td>
                                    <td className="border px-4 py-2">
                                        {order.userId?.name || 'Unknown'}
                                    </td>
                                    <td className="border px-4 py-2">${order.totalAmount || 0}</td>
                                    <td className="border px-4 py-2">
                                        <select
                                            value={order.status || 'pending'}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className={`px-2 py-1 rounded font-semibold border-none cursor-pointer ${getStatusColor(order.status || 'pending')}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">{order.items?.length || 0} items</td>
                                    <td className="border px-4 py-2">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminOrders
