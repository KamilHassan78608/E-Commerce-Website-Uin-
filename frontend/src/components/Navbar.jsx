import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from "react-router-dom"
import logo from '../assets/logo.png'
import { List, Menu, Search, ShoppingCart, User2, X } from 'lucide-react'
import { ShopContext } from '../contents/ShopContext'
import SearchBar from './SearchBar';
import { useAuth } from '../contents/AuthContext'

const Navbar = () => {

    const { showSearch, setshowSearch, navigate, cart } = useContext(ShopContext);
    const { user } = useAuth();

    const [active, setActive] = useState("Home");
    const [isOpen, setisOpen] = useState(false);
    const location = useLocation();

    const NavItems = ["Home", "Collection", "Discover", "Our Story", "Visit Us"];

    useEffect(() => {
        const currentPath = location.pathname;
        
        if (currentPath === '/') {
            setActive('Home');
        } else {
            // Convert path to matching NavItem
            const pathName = currentPath.substring(1).replace(/-/g, ' ');
            const matchedItem = NavItems.find(item => 
                item.toLowerCase() === pathName.toLowerCase()
            );
            if (matchedItem) {
                setActive(matchedItem);
            } else {
                setActive(''); // Clear active state for non-nav routes like cart, checkout
            }
        }
    }, [location.pathname]);

  return (
    <>
      <SearchBar />
      <nav className='flex items-center justify-between border-b border-gray-400 '>

          {/* Logo */}
          <Link to='/'>
              <img src={logo} alt="Dukan" className='w-30 md:w-40' />
          </Link>

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
                  {/* Search Icon Button */}
                  <button 
                      onClick={() => setshowSearch(prev => !prev)}
                      className='text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'
                      aria-label="Search"
                  >
                      <Search size={22} />
                  </button>
                
                { user ? 
                    <Link 
                        to="/profile" 
                        aria-label="User Account" 
                        className='text-gray-800 rounded-full transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'
                    >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEL0fugUdSLA3irSG8d2zytjXGJ6TCKhWAw&s" className='object-cover rounded-full h-7 w-7' alt="profile" />
                    </Link>
                    :
                    <Link 
                        to="/login" 
                        aria-label="User Account" 
                        className='text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'
                    >
                        <User2 size={22} />
                    </Link>
                }
                {/* <Link to="/login" aria-label="User Account" className='text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'>
                    <User2 size={22} />
                </Link> */}
                
                <Link to="/cart" aria-label="Shopping Cart" className='relative text-gray-800 transition-all duration-300 hover:text-indigo-500 hover:scale-110 cursor-pointer'>
                    <ShoppingCart size={22} />
                    {/* Cart Badge */}
                    {cart.length > 0 && (
                        <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white'>
                            {cart.length}
                        </span>
                    )}
                </Link>

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
    </>
  )
}

export default Navbar
