import React from 'react'
import { Heart } from 'lucide-react'

const Discover_Card = ({ title, vibe, description, image, tags }) => {
  return (
    <div className='w-100 relative my-4 hover:-translate-y-1 cursor-pointer group shadow rounded-2xl shadow-gray-300 flex flex-col items-center'>
      
      {/* Image and vibe */}
      <div className='overflow-hidden relative'>
        <img src={image} alt="Image" className='w-100 rounded-t-2xl' />
        <p className='absolute z-20 left-2 bottom-2 text-sm px-4 rounded-2xl bg-black/50 backdrop-blur-sm text-gray-100'>{vibe}</p>
      </div>

      {/* Text Section */}
      <div className='p-4'>
        <h2 className='text-2xl font-bold tracking-wider text-gray-700 group-hover:text-indigo-500'>{title}</h2>

        <p className='text-2xs font-normal tracking-tight text-gray-500'>{description}</p>

        <div className='flex flex-wrap items-center gap-2 mt-4'>
          {
              tags.map((tag, index) => (
                  <p key={index} className='px-4 shadow-2xl rounded-2xl text-center text-indigo-500 bg-gray-100'>{tag}</p>
              ))
          }
        </div>
      </div>

      {/* Overlay  */}
      <div className='absolute z-50 inset-0 opacity-0 group-hover:opacity-100 bg-black/10 backdrop-blur-sm flex flex-row items-center justify-center gap-2 rounded-2xl'>
        <button className='bg-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg cursor-pointer'>
          View Collection
        </button>
        <button className='bg-white hover:bg-red-400 hover:text-white text-indigo-700 p-2 rounded-full shadow-lg cursor-pointer flex items-center justify-center'>
          <Heart size={20} />
        </button>
      </div>

    </div>
  )
}

export default Discover_Card
