import React, { useEffect, useState } from 'react'
import pic1 from '../assets/pic11.png'
import pic2 from '../assets/pic12.png'
import pic3 from '../assets/pic14.png'
import HeroImg from '../assets/Hero.jpg'

const Hero = () => {
    const slides = [
        { title: "Men Collection", subtitle: "Our BestSellers", img: pic3 },
        { title: "Women Collection", subtitle: "Just Released", img: pic2 },
        { title: "Summer Collection", subtitle: "Customer Favorites", img: pic1 },
        { title: "Kids Collection", subtitle: "Hot Deals", img: HeroImg }
    ];

    const [index, setindex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setindex((prev) => (prev + 1) % slides.length); 
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 md:my-20'>
            <div className='flex flex-col-reverse md:flex-row justify-around items-center shadow-2xl shadow-gray-400 rounded-2xl overflow-hidden bg-white min-h-[500px]'>

                {/* Text Section */}
                <div className='w-full md:w-1/2 p-8 md:p-16 text-center md:text-left flex flex-col items-center md:items-start'>
                    <h1 className='text-4xl lg:text-6xl font-bold gradient-text mb-2 transition-all duration-500'>
                        {slides[index].title}
                    </h1>
                    <p className='text-sm md:text-base text-gray-500 mb-10 tracking-widest uppercase'>
                        {slides[index].subtitle}
                    </p>
                    
                    <a className='inline-block text-sm md:text-lg py-3 px-8 font-bold shadow-xl shadow-gray-300 hover:shadow-none cursor-pointer group relative uppercase tracking-widest hover:text-indigo-600 transition-all'>
                        Shop Now
                        {/* Animated Border Frames */}
                        <span className="absolute w-0 group-hover:w-full left-0 top-0 h-0.5 bg-indigo-500 transition-all duration-300"></span>
                        <span className="absolute w-0 group-hover:w-full right-0 bottom-0 h-0.5 bg-indigo-500 transition-all duration-300"></span>
                        <span className="absolute h-0 group-hover:h-full left-0 bottom-0 w-0.5 bg-indigo-500 transition-all duration-300"></span>
                        <span className="absolute h-0 group-hover:h-full right-0 top-0 w-0.5 bg-indigo-500 transition-all duration-300"></span>
                    </a>
                </div>

                {/* Image Section */}
                <div className='w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden'>
                    <img 
                        src={slides[index].img} 
                        alt={slides[index].title} 
                        className='w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out' 
                    />
                </div>

            </div>
        </section>
    )
}

export default Hero