import React, { useContext } from 'react'
import { ShopContext } from '../contents/ShopContext'
import { Search, X } from "lucide-react"
import Product_Card from './Product_Card'

const SearchBar = () => {

    const { showSearch, setshowSearch, searchQuery, searchResults, handleSearchChange } = useContext(ShopContext);

    if(!showSearch) return null;

  return (
    <div className='fixed top-0 left-0 right-0 z-40 bg-gray-100'>
      
      {/* Search Input Bar */}
      <div className='flex justify-between items-center gap-3 px-10 py-4 border-b border-gray-300'>
        <div className='flex  items-center gap-3 flex-1'>
            <Search size={24} className='text-gray-600' />
            <input 
                type="text" 
                placeholder='Search products by Name, Category...' 
                className='flex-1 text-lg text-gray-600 tracking-widest outline-none'
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                autoFocus
            />
        </div>
        <button
            className='p-2 cursor-pointer'
            aria-label="Close search"
            onClick={() => {
                setshowSearch(false);
                handleSearchChange("");
            }}
        >
            <X size={24} className='text-gray-600'/>
        </button>
      </div>

      {/* Search Results */}
      <div className='max-h-[calc(100vh-120px)] overflow-y-auto px-10 py-6'>
        {
            searchQuery.trim() ? (
                searchResults.length === 0 ? (
                    // Search results not found
                    <div className='text-center py-12 text-gray-600 text-lg'>
                        <p>
                            No products found for "<span className='font-semibold text-gray-700'>{searchQuery}</span>"
                        </p>
                    </div>
                ) : (
                    // Search results found
                    <>
                        <p className='text-sm text-gray-600 mb-6'>
                            Found <span className='font-semibold text-gray-800'>{searchResults.length}</span> results {searchResults !== "1" ? "s" : ""}
                        </p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {
                                searchResults.map((item) => (
                                    <Product_Card
                                        key={item._id}
                                        id={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />
                                ))
                            }

                        </div>
                    </>
                )
            ) : (
                // Haven`t Search until Now
                <div className='text-center py-12 text-gray-600 text-lg'>
                    <p>
                        Start typing to search for products...
                    </p>
                </div>
            )
        }

      </div>
      
    </div>
  )
}

export default SearchBar
