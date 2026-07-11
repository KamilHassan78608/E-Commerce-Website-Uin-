import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Hero from '../components/Hero'
import Product_Card from '../components/Product_Card';
import { ShopContext } from '../contents/ShopContext';
import { ArrowRight, Sparkles, Flame } from 'lucide-react'
import { motion } from 'framer-motion';

const Home = () => {

    const { products } = useContext(ShopContext);

    const [latestProducts, setlatestProducts] = useState([]);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        setlatestProducts(products.slice(0, 8));
        setbestseller(products.slice(8));
    }, [products]);

  return (
    <div className='min-h-screen bg-white'>
       <Hero />

        {/* Gradient Separator */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-16 md:my-20'></div>

       {/* Latest Collection Section */}
       <section className='py-12 md:py-20 relative overflow-hidden'>
         {/* Animated Background */}
         <div className='absolute top-0 right-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
         
         <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}// animate when visible
          viewport={{ once: true, amount: 0.2 }}  // animate once only
          transition={{ duration: 0.6, ease: "easeOut" }}
          className='relative'>
           <div className='flex items-center justify-between mb-12 md:mb-16'>
             <div>
               <div className='inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full'>
                 <Sparkles className='w-4 h-4' />
                 <span className='text-xs font-bold uppercase tracking-wider'>Fresh Arrivals</span>
               </div>
               <h2 className='text-4xl md:text-6xl font-black gradient-text tracking-tight'>Latest Collection</h2>
             </div>
             <Link to='/collection' className='hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-colors group'>
               View All
               <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
             </Link>
           </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
           {
               latestProducts.map((prod) => (
                   <div key={prod._id} className='transform hover:scale-105 transition-transform duration-300'>
                     <Product_Card id={prod._id} name={prod.name} description={prod.description} price={prod.price} image={prod.image}/>
                   </div>
               ))
           }
           </div>

           {/* Mobile View All Link */}
           <div className='flex md:hidden justify-center mt-10'>
             <Link to='/collection' className='inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors group'>
               View All Products
               <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
             </Link>
           </div>
         </motion.div>
       </section>

        {/* Gradient Separator */}
        <div className='h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-16 md:my-20'></div>

        {/* Best Seller Section */}
        <section className='py-12 md:py-20 relative overflow-hidden'>
         {/* Animated Background */}
         <div className='absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
         
         <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}// animate when visible
          viewport={{ once: true, amount: 0.2 }}  // animate once only
          transition={{ duration: 0.6, ease: "easeOut" }}
         className='relative'>
           <div className='flex items-center justify-between mb-12 md:mb-16'>
             <div>
               <div className='inline-flex items-center gap-2 mb-4 px-4 py-2 bg-red-100 text-red-600 rounded-full'>
                 <Flame className='w-4 h-4' />
                 <span className='text-xs font-bold uppercase tracking-wider'>Hot Picks</span>
               </div>
               <h2 className='text-4xl md:text-6xl font-black gradient-text tracking-tight'>Best Sellers</h2>
             </div>
             <Link to='/collection' className='hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-colors group'>
               Discover More
               <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
             </Link>
           </div>

           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
           {
               bestseller.map((prod) => (
                   <div key={prod._id} className='transform hover:scale-105 transition-transform duration-300'>
                     <Product_Card id={prod._id} name={prod.name} description={prod.description} price={prod.price} image={prod.image}/>
                   </div>
               ))
           }
           </div>

           {/* Mobile Discover Link */}
           <div className='flex md:hidden justify-center mt-10'>
             <Link to='/collection' className='inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors group'>
               Discover More
               <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
             </Link>
           </div>
         </motion.div>
        </section>

        {/* CTA Section */}
        <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}// animate when visible
        viewport={{ once: true, amount: 0.2 }}  // animate once only
        transition={{ duration: 0.6, ease: "easeOut" }}
         className='py-20 md:py-28 relative overflow-hidden mt-8'>
         {/* Animated Background */}
         <div className='absolute top-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
         <div className='absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse' style={{animationDelay: '2s'}}></div>
         
         <div className='relative max-w-4xl mx-auto text-center px-6'>
           <h2 className='text-4xl md:text-6xl font-black mb-6 text-gray-900'>Ready to Explore?</h2>
           <p className='text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed font-light'>
             Discover our full collection of premium fashion items curated just for you. From latest trends to timeless classics, we have something for everyone.
           </p>
           <Link
             to='/collection'
             className='inline-block text-base md:text-lg py-4 px-10 font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 cursor-pointer group relative uppercase tracking-widest transition-all'
           >
             Shop Full Collection
             <span className='ml-2 group-hover:translate-x-1 transition-transform inline-block'>→</span>
           </Link>
         </div>
        </motion.div>

    </div>
  )
}

export default Home
