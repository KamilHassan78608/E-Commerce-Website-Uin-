import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../contents/ShopContext';

const Product = () => {
    const { productId } = useParams();
    const { products, Currency } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    // Temporary Array for Side images 
    const images = [
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ];

    const product = products.find(item => item._id === productId);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center py-20">
                    <h2 className="text-3xl font-semibold text-gray-800">Product Not Found</h2>
                    <p className="text-gray-500 mt-3">Sorry, we couldn't find the product you're looking for.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Images Section */}
                <div className="flex-1 lg:w-3/5">
                    {/* Main Image */}
                    <div className="relative bg-gray-50 rounded-3xl overflow-hidden shadow-xl aspect-[4/3] mb-6">
                        <img 
                            src={images[selectedImage]} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        {product.bestseller && (
                            <div className="absolute top-6 left-6 bg-gray-700 text-white text-xs tracking-widest font-medium px-5 py-2.5 rounded-2xl shadow-lg">
                                BESTSELLER
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Gallery */}
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div 
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border-2 
                                    ${selectedImage === index 
                                        ? 'border-black shadow-md scale-105' 
                                        : 'border-transparent hover:border-gray-200'}`}
                            >
                                <img 
                                    src={img} 
                                    alt={`View ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 lg:w-2/5 space-y-8">
                    
                    {/* Title & Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm uppercase tracking-[2px] font-medium text-gray-500">{product.category}</span>
                            {product.subCategory && (
                                <span className="text-sm text-gray-400">•</span>
                            )}
                            <span className="text-sm uppercase tracking-[2px] font-medium text-gray-500">{product.subCategory}</span>
                        </div>
                        <h2 className="text-4xl font-semibold text-gray-700 leading-tight">{product.name}</h2>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold text-gray-700">
                            {Currency} {product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-400 line-through">
                                {Currency} {product.originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <div className="prose text-gray-600 leading-relaxed">
                        <p>{product.description}</p>
                    </div>

                    {/* Size Selector */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-medium text-gray-700">Select Size</p>
                            <a href="#" className="text-sm text-gray-700 hover:underline">Size Guide</a>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {product.sizes?.map((size, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-6 py-3.5 rounded-2xl text-sm font-medium transition-all
                                        ${selectedSize === size 
                                            ? 'bg-gray-700 text-white shadow-lg' 
                                            : 'bg-white border border-gray-200 hover:border-gray-400 text-gray-700'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div>
                        <p className="font-medium text-gray-700 mb-4">Quantity</p>
                        <div className="flex items-center gap-6 w-fit border border-gray-200 rounded-3xl px-6 py-3">
                            <button 
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-2xl leading-none hover:bg-gray-100 rounded-full transition-colors"
                            >
                                −
                            </button>
                            <span className="font-semibold text-xl w-8 text-center">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-2xl leading-none hover:bg-gray-100 rounded-full transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4 pt-6">
                        <button className="w-full cursor-pointer bg-gray-800 hover:bg-gray-900 transition-all text-white py-5 rounded-3xl font-semibold text-lg tracking-wider shadow-xl shadow-black/10 active:scale-[0.985]">
                            ADD TO CART
                        </button>
                        
                        <button className="w-full cursor-pointer border-2 border-black hover:bg-gray-50 transition-all py-5 rounded-3xl font-semibold text-lg tracking-wider">
                            BUY NOW
                        </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-8 pt-6 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>30 Day Return</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>✓</span>
                            <span>Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-20 pt-16 border-t border-gray-200">
                <h2 className='text-4xl md:text-6xl font-black gradient-text tracking-tight mb-6'>Related Products</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                        .filter(item => item.category === product.category && item._id !== productId)
                        .slice(0, 4)
                        .map(relatedProduct => (
                            <a 
                                key={relatedProduct._id}
                                href={`/product/${relatedProduct._id}`}
                                className="group"
                            >
                                <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[3/4] mb-4 shadow-md hover:shadow-lg transition-shadow">
                                    <img 
                                        src={relatedProduct.image} 
                                        alt={relatedProduct.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {relatedProduct.bestseller && (
                                        <div className="absolute top-3 left-3 bg-gray-700 text-white text-xs px-3 py-1.5 rounded-full">
                                            BESTSELLER
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-gray-800 font-semibold line-clamp-2 group-hover:text-gray-600 transition-colors">
                                        {relatedProduct.name}
                                    </h4>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-bold text-gray-700">
                                            {Currency} {relatedProduct.price}
                                        </span>
                                        {relatedProduct.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                {Currency} {relatedProduct.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;