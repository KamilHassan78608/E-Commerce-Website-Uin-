// What I further need to do?
// 1. Add a search section
// 2. What if there are no products
// 3. Add a Loader (A minimal code for the first three from deepseek is on tldr file)




import React, { useContext,useState } from 'react'
import Discover_Card from '../components/Discover_Card'
import { ShopContext } from '../contents/ShopContext'
import { ChevronRight } from 'lucide-react';

const Discover = () => {

    const { fashionThemes } = useContext(ShopContext);

    const [productscolection, setproductscolection] = useState(fashionThemes);

  return (
    <div>
        {/* Heading */}
        <div className='my-6'> 
            <h1 className='gradient-text tracking-wide'>Discover</h1>
            <p className='text-gray-500 tracking-tight text-2xs'>Curated fashion themes & mood-driven collections — timeless elegance, modern edge, and slow-fashion inspiration.</p>
        </div>

        <div className='flex items-center justify-between gap-4 flex-wrap'>
            {
                productscolection.map((prod) => (
                    <Discover_Card key={prod.id} title={prod.title} vibe={prod.vibe} description={prod.description} image={prod.imageUrl} tags={prod.tags} />
                ))
            }

        </div>


      <section className="bg-linear-to-r from-gray-600 via-neutral-600 to-gray-600 text-white py-32 px-6 my-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight">
          "Fashion is the silent poetry of the soul, a canvas for the nomad within."
          </h2>
          <div className="flex flex-col items-center space-y-8">
          <div className="h-20 w-px bg-white/20" />
            <button className="group flex items-center space-x-4 border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500 cursor-pointer">
              <span className="text-xs tracking-[0.3em] uppercase">Request Early Access</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>



    </div>
  )
}

export default Discover