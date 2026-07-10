import React, { useState } from 'react'
import AdminProducts from '../components/AdminProducts'
import AdminAddProduct from '../components/AdminAddProduct'
import AdminUsers from '../components/AdminUsers'
import AdminOrders from '../components/AdminOrders'

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products')
    const [refreshProducts, setRefreshProducts] = useState(0)

    const handleProductAdded = () => {
        setRefreshProducts(prev => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                    <p className="text-gray-300 mt-2">Manage your store, products, users, and orders</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Navigation Tabs */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                                activeTab === 'products'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            📦 Products
                        </button>
                        <button
                            onClick={() => setActiveTab('add-product')}
                            className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                                activeTab === 'add-product'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            ➕ Add Product
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                                activeTab === 'users'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            👥 Users
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                                activeTab === 'orders'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            📋 Orders
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div>
                    {activeTab === 'products' && (
                        <AdminProducts key={refreshProducts} />
                    )}
                    {activeTab === 'add-product' && (
                        <AdminAddProduct onProductAdded={handleProductAdded} />
                    )}
                    {activeTab === 'users' && (
                        <AdminUsers />
                    )}
                    {activeTab === 'orders' && (
                        <AdminOrders />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
