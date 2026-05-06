import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../contents/ShopContext'

const Product = () => {
  const { productId } = useParams();
  const { products, Currency } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = products.find(item => item._id === productId);

  if (!product) {
    return <div className='text-center py-20'>Product not found</div>
  }

  return (
    <div className='py-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        
        {/* Product Image */}
        <div className='flex justify-center items-center'>
          <div className='w-full h-96 overflow-hidden rounded-2xl'>
            <img 
              src={product.image} 
              alt={product.name} 
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-6'>
          
          {/* Product Name */}
          <div>
            <h1 className='text-4xl font-bold'>{product.name}</h1>
            <p className='text-gray-500 mt-2'>{product.description}</p>
          </div>

          {/* Price */}
          <div>
            <p className='text-3xl font-bold text-indigo-500'>
              {Currency} {product.price}
            </p>
          </div>

          {/* Category and SubCategory */}
          <div className='flex gap-4'>
            <span className='bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full'>
              {product.category}
            </span>
            <span className='bg-gray-100 text-gray-700 px-4 py-2 rounded-full'>
              {product.subCategory}
            </span>
            {product.bestseller && (
              <span className='bg-green-100 text-green-700 px-4 py-2 rounded-full'>
                Bestseller
              </span>
            )}
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className='text-lg font-semibold mb-3'>Select Size</p>
              <div className='flex gap-3 flex-wrap'>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border-2 rounded-lg font-semibold transition-all ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-gray-300 hover:border-indigo-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <p className='text-lg font-semibold mb-3'>Quantity</p>
            <div className='flex items-center gap-4 border-2 border-gray-300 rounded-lg w-fit'>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='px-4 py-2 text-xl font-bold'
              >
                −
              </button>
              <span className='px-6 py-2 text-xl font-semibold'>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className='px-4 py-2 text-xl font-bold'
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className='bg-indigo-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-600 transition-colors'>
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className='border-t pt-6'>
            <h3 className='font-semibold text-lg mb-3'>Product Information</h3>
            <ul className='text-gray-600 space-y-2 text-sm'>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Sub Category:</strong> {product.subCategory}</li>
              <li><strong>Available Sizes:</strong> {product.sizes.join(', ')}</li>
              <li><strong>Product ID:</strong> {product._id}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
