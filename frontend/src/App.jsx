import React, { Children, useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminRoute from './components/AdminRoute'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Our_Story from './pages/Our_Story'
import Visit_Us from './pages/Visit_Us'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuth } from './contents/AuthContext'
import UserDashBoared from './pages/UserDashBoared'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {

  const { loading, user } = useAuth();
  const location = useLocation();

  // Check if this is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // protected Route - Only for Log In user
  const ProtectedRoute = ({ children }) => {

    if (loading) return <div>Loading...</div>

    if (!user) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      return <Navigate to="/login" replace />
    }

    return children;
  };

  // Redirets to profile route from routes like Login - SignUp
  const PublicRoute = ({ children }) => {

    if (loading) return <div>Loading...</div>

    if (user) {
      return <Navigate to="/profile" replace />
    }

    return children;
  };

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path='/admin' element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
    );
  }

  return (
    <div className='px-10 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/our-story' element={<Our_Story />}/>
        <Route path='/visit-us' element={<Visit_Us />} />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/signup' element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />

        <Route path='/profile' element={
          <ProtectedRoute>
            <UserDashBoared />
          </ProtectedRoute>
        } />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
