// AdminUsers.jsx
import React, { useState, useEffect } from 'react'
import { getAllUsers, updateUserRole } from '../services/api'

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await getAllUsers();
            
            console.log('Full response:', response);
            console.log('Response data:', response.data);
            
            // Fix: Backend returns { success: true, data: users, total: users.length }
            const usersData = response.data?.data || []; // Changed from response.data?.users
            setUsers(usersData);
            setError('')
        } catch (err) {
            console.error('Fetch users error:', err);
            setError(err.response?.data?.message || 'Failed to load users')
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole)
            setUsers(users.map(u => 
                u._id === userId ? { ...u, role: newRole } : u
            ))
            setSuccess('User role updated successfully')
            setTimeout(() => setSuccess(''), 3000)
        } catch (err) {
            console.error('Role update error:', err);
            setError(err.response?.data?.message || 'Failed to update user role')
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
            <p className="text-gray-600 mb-4">Total Users: {users.length}</p>

            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            {loading ? (
                <div className="text-center py-8">Loading users...</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border px-4 py-2 text-left">Name</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                                <th className="border px-4 py-2 text-left">Phone</th>
                                <th className="border px-4 py-2 text-left">Role</th>
                                <th className="border px-4 py-2 text-left">Created At</th>
                                <th className="border px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.phone || '-'}</td>
                                        <td className="border px-4 py-2">
                                            <span className={`px-3 py-1 rounded text-white font-semibold ${
                                                user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'
                                            }`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="border px-4 py-2">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="border px-4 py-2 text-center">
                                            {user.role === 'admin' ? (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'user')}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                                                >
                                                    Remove Admin
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminUsers