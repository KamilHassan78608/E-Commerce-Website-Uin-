import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contents/ShopContext';
import { ChevronLeft } from 'lucide-react';
import Product_Card from '../components/Product_Card';

const DiscoverDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fashionThemes, products } = useContext(ShopContext);

    // Find the theme
    const theme = fashionThemes.find(t => t.id === parseInt(id));

    if (!theme) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Theme Not Found</h2>
                    <p className="text-gray-600 mb-8">The discover theme you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/discover')}
                        className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-3xl font-semibold transition-all"
                    >
                        Back to Discover
                    </button>
                </div>
            </div>
        );
    }

    // Filter products by theme vibe/category (assuming products have a theme field)
    // Get related products based on theme
    const relatedProducts = products
        .filter(product =>
            product.themes?.includes(theme.vibeKey)
        ).sort((a, b) => b.bestseller - a.bestseller) .slice(0, 4);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/discover')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-semibold mb-8 transition-colors"
            >
                <ChevronLeft size={20} />
                Back to Discover
            </button>

            {/* Theme Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Image */}
                <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img 
                        src={theme.imageUrl} 
                        alt={theme.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center space-y-6">
                    {/* Vibe Badge */}
                    <div className="inline-flex w-fit">
                        <span className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold tracking-widest">
                            {theme.vibe}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-black text-gray-800 leading-tight">
                        {theme.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {theme.description}
                    </p>

                    {/* Full Description */}
                    <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-indigo-500 pl-6 py-4 bg-indigo-50 rounded-lg">
                        {theme.fullDescription}
                    </p>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs uppercase tracking-widest font-bold text-gray-600">Category</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">{theme.category}</p>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                            <p className="text-xs uppercase tracking-widest font-bold text-gray-600">Best For</p>
                            <p className="text-lg font-semibold text-gray-800 mt-1">{theme.seasonality}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {theme.tags.map((tag, index) => (
                            <span 
                                key={index}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={() => navigate('/collection')}
                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98]"
                        >
                            Explore Collection
                        </button>
                        <button className="flex-1 border-2 border-gray-800 text-gray-800 hover:bg-gray-50 py-4 rounded-2xl font-bold text-lg transition-all">
                            Save Theme
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="border-t-2 border-gray-300 pt-16">
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-12">
                    Featured in {theme.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((product) => (
                            <Product_Card 
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                bestseller={product.bestseller}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-600 text-lg">No products available for this theme yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Theme Philosophy */}
            <div className="mt-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-12">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">The Story Behind {theme.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                    {theme.description} This curated collection represents a carefully selected assortment of pieces 
                    that embody the essence of {theme.vibe} fashion — from sustainable materials to timeless designs 
                    that transcend seasonal trends.
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Aesthetic</h4>
                        <p className="text-gray-600">{theme.vibe.charAt(0) + theme.vibe.slice(1).toLowerCase()} design principles with attention to detail.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Sustainability</h4>
                        <p className="text-gray-600">Ethically sourced materials and responsible production practices.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3">Quality</h4>
                        <p className="text-gray-600">Premium craftsmanship designed to last and inspire confidence.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscoverDetail;
