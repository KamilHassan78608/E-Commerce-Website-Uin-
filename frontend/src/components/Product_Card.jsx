import React, { useContext } from 'react'
import pic1 from '../assets/pic1.png'
import { ShopContext } from '../contents/ShopContext'

const Product_Card = ({ id, name, description, price, image }) => {

    const { Currency } = useContext(ShopContext);

  return (
    <a className='w-80 hover:-translate-y-1 cursor-pointer group shadow rounded-2xl shadow-gray-300 flex flex-col items-center'>
      <div className='w-80 h-80 overflow-hidden'>
        <img src={image} alt="image" className='object-cover group-hover:scale-115' />
      </div>
      <div className='p-4'>
        <p className='text-xl font-bold group-hover:text-indigo-500'>{name}</p>
        <p className='text-2sm text-gray-500 tracking-tight'>{description}</p>
        <p className='text-indigo-500'>{Currency} {price}</p>
      </div>

        {/* <span className="absolute w-0 group-hover:w-full left-0 top-0 h-0.5 bg-gray-900"></span>
        <span className="absolute w-0 group-hover:w-full right-0 -bottom-1 h-0.5 bg-gray-900"></span>
        <span className="absolute h-0 group-hover:h-full left-0 -bottom-1 w-0.5 bg-gray-900"></span>
        <span className="absolute h-0 group-hover:h-full right-0 top-0 w-0.5 bg-gray-900"></span> */}


    </a>
  )
}

export default Product_Card
