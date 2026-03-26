import React from 'react'
import logo from '../assets/logo.png';

const Navbar = () => {


  return (
    <nav className='max-w-7xl mx-auto px-10 flex justify-between items-center border-b border-slate-500 '>
      
      {/* Logo */}
      <a className='cursor-pointer'>
        <img className='w-22 h-22' src={logo} alt="Dukan" />
      </a>

      {/* Right Side Icons */}
      <div className='flex items-center gap-4'>
        <h1>Search</h1>
        <h1>Login</h1>
        <h1>Cart</h1>
      </div>

    </nav>
  )
}

export default Navbar
