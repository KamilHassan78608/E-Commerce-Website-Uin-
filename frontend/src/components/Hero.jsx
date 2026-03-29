import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { HERO_DATA } from '../data/hero-data';

const Hero = () => {

  const [index, setindex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setindex((prev) => (prev + 1) % HERO_DATA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const current = HERO_DATA[index];

  return (
    <div className='relative h-screen w-full overflow-hidden bg-black flex items-center justify-center text-center text-white'>

      {/* Background Image with cross fade */}
      <AnimatePresence mode='wait'>
        <motion.div
         key={current.img}
         initial={{opacity : 0}}
         animate={{opacity : 1}}
         exit={{opacity : 0}}
         transition={{duration : 1}}
         className="absolute inset-0 bg-cover bg-center"
         style={{ backgroundImage : `url(${current.img})`}}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className='z-10 relative max-w-2xl px-6'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{y : 20, opacity : 0}}
            animate={{y : 0, opacity : 1}}
            exit={{y : -20, opacity : 0}}
            transition={{duration : 0.6, ease : "easeOut"}}
          >
            <span className='text-sm tracking-[0.3em] font-medium text-white block mb-4'>
              {current.label}
            </span>
            <h1 className='text-5xl md:text-7xl italic font-serif font-bold mb-6'>
              {current.title}
            </h1>
            <p className='text-lg md:text-xl text-gray-200 mb-8 max-w-lg mx-auto leading-relaxed'>
              {current.desc}
            </p>
            <button className='px-10 py-4 bg-white text-black font-bold uppercase tracking-wider cursor-pointer transition-all duration-300 hover:bg-transparent hover:border hover:border-gray-200 hover:text-white '>
              Shop Now
            </button>
          </motion.div>
        </AnimatePresence>

      </div>
      
    </div>
  )
}

export default Hero
