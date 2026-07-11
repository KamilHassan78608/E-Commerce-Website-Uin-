import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import pic1 from '../assets/pic1.png'
import { ShopContext } from '../contents/ShopContext'
import { motion } from 'framer-motion'

const Product_Card = ({ id, name, description, price, image }) => {

    const { Currency } = useContext(ShopContext);

  return (
    <motion.div
    initial={{ opacity: 0, y: 80 }}
    whileInView={{ opacity: 1, y: 0 }}// animate when visible
    viewport={{ once: true, amount: 0.2 }}  // animate once only
    transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to={`/product/${id}`} className='w-80 hover:-translate-y-1 cursor-pointer group shadow rounded-2xl shadow-gray-300 flex flex-col items-center'>
        <div className='w-80 h-80 overflow-hidden'>
          <img src={image} alt="image" className='object-cover group-hover:scale-115' />
        </div>
        <div className='p-4'>
          <p className='text-xl font-bold group-hover:text-indigo-500'>{name}</p>
          <p className='text-2sm text-gray-500 tracking-tight'>{description}</p>
          <p className='text-indigo-500'>{Currency} {price}</p>
        </div>

      </Link>
    </motion.div>
  )
}

export default Product_Card
