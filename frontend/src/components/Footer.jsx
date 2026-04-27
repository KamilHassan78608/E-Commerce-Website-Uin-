import React from 'react'
import { Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='border-t border-gray-400 py-12 md:py-20 px-4 sm:px-8'>
      <div className='flex flex-wrap -mx-4'>

        {/* Logo and Description - Full width on mobile, 1/2 on tablet, 1/4 on desktop */}
        <div className='w-full md:w-1/2 lg:w-1/4 px-4 mb-10 lg:mb-0'>
          <h2 className='font-extrabold text-4xl mb-4'>Dukan<span className='text-indigo-500'>.</span></h2>
          <p className='text-gray-500 leading-relaxed'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio harum expedita inventore enim unde? Ad fugiat itaque voluptatibus quod.
          </p>
        </div>

        {/* Col - 02 | Links - 1/2 width on mobile, 1/4 on desktop */}
        <div className='w-1/2 md:w-1/4 lg:w-1/4 px-4 mb-10 lg:mb-0'>
          <h3 className='text-xl font-bold mb-4'>Company</h3>
          <nav className='flex flex-col space-y-2 text-gray-500'>
            <a href="#" className='hover:text-indigo-500 transition-colors'>Home</a>
            <a href="#" className='hover:text-indigo-500 transition-colors'>Collection</a>
            <a href="#" className='hover:text-indigo-500 transition-colors'>Best Seller</a>
            <a href="#" className='hover:text-indigo-500 transition-colors'>About US</a>
          </nav>
        </div>

        {/* Col - 03 | Contact Us - 1/2 width on mobile, 1/4 on desktop */}
        <div className='w-1/2 md:w-1/4 lg:w-1/4 px-4 mb-10 lg:mb-0'>
          <h3 className='text-xl font-bold mb-4'>Get in touch</h3>
          <div className='flex flex-col space-y-2 text-gray-500'>
            <p>Phone: <a href="tel:2903483248" className='hover:text-indigo-500'>2903483248</a></p>
            <p className='break-words'>Email: <a href="mailto:nwor@gmail.com" className='hover:text-indigo-500'>nwor@gmail.com</a></p>
            <p>Address: <span className='text-gray-500'>Peshawar, Pakistan</span></p>
          </div>
        </div>

        {/* Col - 04 | News Letter - Full width on mobile/tablet, 1/4 on desktop */}
        <div className='w-full md:w-1/2 lg:w-1/4 px-4'>
          <h3 className='text-xl font-bold mb-2'>Subscribe to our Dukan</h3>
          <p className='text-gray-500 text-xs mb-4'>Get the latest updates, articles, and resources — straight to your inbox.</p>
          <form className="flex items-center border-b border-gray-800 overflow-hidden">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 outline-none text-gray-700 text-sm"
              required
            />
            <button
              type="submit"
              // className="bg-indigo-500 text-white px-4 py-2 text-sm font-medium hover:bg-indigo-600 transition shrink-0"
              className="text-sm tracking-widest text-gray-900 cursor-pointer"
            >
              JOIN
            </button>
          </form>
          <p className='text-gray-400 text-[10px] mt-2 italic'>We respect your privacy. Unsubscribe anytime.</p>
        </div>
        
      </div>

      {/* Optional Bottom Bar */}
      <div className='mt-12 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm'>
        © {new Date().getFullYear()} Dukan Inc. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer