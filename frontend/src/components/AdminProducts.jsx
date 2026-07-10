import React, { useState, useEffect } from 'react'
import { getAllProducts, updateProduct, deleteProduct } from '../services/api'

const AdminProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [editData, setEditData] = useState({})
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        setLoading(true);

        try {
            const response = await getAllProducts();
            const productsData = response.data?.products || [];
            setProducts(productsData);
            setError('');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to load products'
            );
        } finally {
            setLoading(false);
        }
};

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id)
                setProducts(products.filter(p => p._id !== id))
                setSuccess('Product deleted successfully')
                setTimeout(() => setSuccess(''), 3000)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete product')
            }
        }
    }

    const handleEdit = (product) => {
        setEditingId(product._id)
        setEditData({
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category,
            stock: product.stock
        })
    }

    const handleUpdate = async (id) => {
        try {
            const formData = new FormData()
            formData.append('name', editData.name)
            formData.append('price', editData.price)
            formData.append('description', editData.description)
            formData.append('category', editData.category)
            formData.append('stock', editData.stock)

            await updateProduct(id, formData)
            fetchProducts()
            setEditingId(null)
            setSuccess('Product updated successfully')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update product')
        }
    }

    const handleCancel = () => {
        setEditingId(null)
        setEditData({})
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Products</h2>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            {loading ? (
                <div className="text-center py-8">Loading products...</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Price</th>
                                <th className="border px-4 py-2 text-left">Category</th>
                                <th className="border px-4 py-2 text-left">Stock</th>
                                <th className="border px-4 py-2 text-left">Description</th>
                                <th className="border px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    {editingId === product._id ? (
                                        <>
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={editData.name}
                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={editData.price}
                                                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="text"
                                                    value={editData.category}
                                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">
                                                <input
                                                    type="number"
                                                    value={editData.stock}
                                                    onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">
                                                <textarea
                                                    value={editData.description}
                                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                    className="w-full px-2 py-1 border rounded"
                                                    rows="2"
                                                />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleUpdate(product._id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border px-4 py-2">{product.name}</td>
                                            <td className="border px-4 py-2">${product.price}</td>
                                            <td className="border px-4 py-2">{product.category}</td>
                                            <td className="border px-4 py-2">{product.stock}</td>
                                            <td className="border px-4 py-2 truncate">{product.description}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminProducts
