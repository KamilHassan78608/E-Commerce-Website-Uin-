import React, { useState } from 'react'
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { List, Menu, Search, ShoppingCart, User2, X } from 'lucide-react'

const Navbar = () => {

    const [active, setActive] = useState("Home");
    const [isOpen, setisOpen] = useState(false);

    const NavItems = ["Home", "Collection", "Discover", "Our Story", "Visit Us"];

  return (
    <nav className='flex items-center justify-between border-b border-gray-400 '>

        {/* Logo */}
        <div className=''>
            <img src={logo} alt="Dukan" className='w-30 md:w-40' />
        </div>

        {/* Nav Items - Desktop Only */}
        <div className='hidden md:flex items-center gap-10'>
            {NavItems.map((item) => (
                <Link
                    key={item}
                    to={
                        item === "Home" 
                            ? "/" 
                            : `/${item.toLowerCase().trim().replace(/\s+/g, "-")}`
                    }
                    onClick={() => setActive(item)}
                    className={`group relative text-xs font-medium uppercase tracking-widest transition-all duration-300 hover:text-indigo-500 hover:scale-105 ${
                        active === item ? "text-indigo-500" : "text-gray-700"
                    }`}
                >
                    {item}
                    
                    {/* Dynamic underline */}
                    <span
                        className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-500 transition-all duration-300 ${
                            active === item ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                </Link>
            ))}
        </div>

        {/* Right Side Icons */}
            <div className='flex items-center gap-5'>
                {/* Wrapped icons in button tags for accessibility */}
                <button aria-label="Search" className='text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'>
                    <Search size={22} />
                </button>
                
                <button aria-label="User Account" className='text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'>
                    <User2 size={22} />
                </button>
                
                <button aria-label="Shopping Cart" className='relative text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'>
                    <ShoppingCart size={22} />
                    {/* Cart Badge */}
                    <span className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white'>
                        3
                    </span>
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                    aria-label="Toggle Menu"
                    className='md:hidden text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 ml-2'
                    onClick={() => setisOpen(!isOpen)}
                >
                    {/* Removed rotate-90 from X */}
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

        {/* Mobile Drop-Down */}
        {
            isOpen && 
                <div className='fixed z-50 top-32 right-0 w-full bg-white shadow-md flex flex-col items-center gap-8 py-10 md:hidden'>
                    {NavItems.map((item) => (
                        <Link
                            key={item} 
                            to={
                                item === "Home" 
                                    ? "/" 
                                    : `/${item.toLowerCase().trim().replace(/\s+/g, "-")}`
                            }
                            onClick={() => {
                                setActive(item)
                                setisOpen(false)
                            }}
                            className={`group relative text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-indigo-500 hover:scale-105 ${
                                active === item ? "text-indigo-500" : "text-gray-700"
                            }`}
                        >
                            {item}
                            
                            {/* The same elegant animated underline, applied to the vertical menu */}
                            <span
                                className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-500 transition-all duration-300 ${
                                    active === item ? "w-full" : "w-0 group-hover:w-full"
                                }`}
                            ></span>
                        </Link>
                    ))}
                </div>
        }
      
    </nav>
  )
}

export default Navbar
