import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contents/AuthContext'

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children;
}

export default AdminRoute
