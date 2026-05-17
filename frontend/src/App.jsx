import React, { Children, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Discover from './pages/Discover'
import DiscoverDetail from './pages/DiscoverDetail'
import Our_Story from './pages/Our_Story'
import Visit_Us from './pages/Visit_Us'
import Auth from './pages/Auth'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuth } from './contents/AuthContext'
import UserDashBoared from './pages/UserDashBoared'

const App = () => {

  const { loading, user } = useAuth();

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

  return (
    <div className='px-10 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/discover/:id' element={<DiscoverDetail />} />
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
