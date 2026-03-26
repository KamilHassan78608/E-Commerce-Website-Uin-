import React, { useState } from 'react'
import { CATEGORY_DATA } from '../data/category-data'
import SubCategories from './SubCategories';

const Category = () => {

    const [activeCategory, setactiveCategory] = useState(null);

    const categories = Object.keys(CATEGORY_DATA);


  return (
    <div className='relative max-w-7xl mx-auto '>
        <div className='mx-auto flex overflow-x-auto items-center justify-around gap-4 py-6 border-b font-sans font-semibold'>
            {
                categories.map((cat) => (
                    <button
                        key={cat}
                        className={`py-2 px-4 rounded-full shadow-xl shadow-slate-300 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${ activeCategory === cat ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-slate-500 -translate-y-1" : ""}`}
                        onMouseEnter={() => setactiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))
            }
        </div>

        {/* Rendering Sub menu when a category is hover */}
        
        <div>
            {
                activeCategory && (
                    <SubCategories 
                        data={CATEGORY_DATA[activeCategory]} 
                        onMouseLeave={() => setactiveCategory(null)}
                    />
                )
            }
        </div>
    </div>
  )
}

export default Category
