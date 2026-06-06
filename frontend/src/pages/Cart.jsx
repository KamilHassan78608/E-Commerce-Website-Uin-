import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contents/ShopContext';

const Cart = () => {
    const { cart, removeFromCart, updateCartQuantity, Currency, notification } = useContext(ShopContext);
    const navigate = useNavigate();

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const tax = Math.round(subtotal * 0.1 * 100) / 100;
    const total = subtotal + shipping + tax;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                {/* Notification Toast */}
                {notification && (
                    <div className={`fixed top-6 right-6 px-6 py-4 rounded-xl shadow-xl font-semibold text-white z-50 animate-slide-in transition-all
                        ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                    >
                        {notification.message}
                    </div>
                )}
                <div className="text-center">
                    <div className="text-6xl mb-6">🛒</div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Explore our collections and add some items to your cart.</p>
                    <Link 
                        to="/collection" 
                        className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-3xl font-semibold transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-6 right-6 px-6 py-4 rounded-xl shadow-xl font-semibold text-white z-50 animate-slide-in transition-all
                    ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                >
                    {notification.message}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div 
                                key={`${item.productId}-${item.size}`}
                                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex gap-6"
                            >
                                {/* Product Image */}
                                <div className="w-24 h-32 flex-shrink-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link 
                                            to={`/product/${item.productId}`}
                                            className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                        <div className="mt-2 flex items-center gap-4">
                                            <span className="text-sm text-gray-600">Size: <span className="font-medium text-gray-800">{item.size}</span></span>
                                            <span className="text-xl font-bold text-gray-800">
                                                {Currency} {item.price}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button 
                                                onClick={() => updateCartQuantity(item.productId, item.size, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateCartQuantity(item.productId, item.size, item.quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Total & Remove */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-lg font-bold text-gray-800">
                                                    {Currency} {item.totalPrice}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.productId, item.size)}
                                                className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-md sticky top-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">{Currency} {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold">{Currency} {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (10%)</span>
                                    <span className="font-semibold">{Currency} {tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mb-8 text-2xl">
                                <span className="font-bold text-gray-800">Total</span>
                                <span className="font-bold text-gray-800">{Currency} {total.toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button 
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-2xl font-semibold transition-all active:scale-[0.98] shadow-lg"
                            >
                                Proceed to Checkout
                            </button>

                            {/* Continue Shopping */}
                            <Link 
                                to="/collection"
                                className="block text-center mt-4 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-50 rounded-2xl font-semibold transition-all"
                            >
                                Continue Shopping
                            </Link>

                            {/* Trust Info */}
                            <div className="mt-8 space-y-3 text-xs text-gray-600">
                                <div className="flex gap-2">
                                    <span>✓</span>
                                    <span>Free shipping on orders over {Currency} 500</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>✓</span>
                                    <span>30-day return guarantee</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>✓</span>
                                    <span>Secure payment methods</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
