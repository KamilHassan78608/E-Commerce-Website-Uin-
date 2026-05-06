import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

const App = () => {
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
        <Route path='/auth' element={<Auth />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
