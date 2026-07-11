import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../contents/ShopContext';
import { useAuth } from '../contents/AuthContext';
import { createOrder } from '../services/api';

const Checkout = () => {
    const { cart, Currency, clearCart, notification } = useContext(ShopContext);
    const { user } = useAuth();
    const navigate = useNavigate();

    

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    // Pre-fill form with logged-in user data
    useEffect(() => {
        if (user) {
            // Extract first and last name from user.name
            const nameParts = user.name.split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            setFormData(prev => ({
                ...prev,
                firstName: firstName,
                lastName: lastName,
                email: user.email || '',
                phone: user.phone || '',
                address: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zipCode: user.address?.zipCode || ''
            }));
        }
    }, [user]);


//     useEffect(() => {
//     console.log("USER");
//     console.log(user);

//     console.log("FORM");
//     console.log(formData);
// }, [user, formData]);

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const shipping = subtotal > 0 ? 50 : 0;
    const tax = Math.round(subtotal * 0.1 * 100) / 100;
    const total = subtotal + shipping + tax;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Verify user is logged in
    if (!user) {
        alert('Please log in first');
        navigate('/login');
        return;
    }

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.zipCode) {
        alert('Please fill in all shipping details');
        return;
    }

    if (!formData.cardName || !formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert('Please fill in all payment details');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    try {
        // Prepare order data - MAKE SURE userId is included
        const orderData = {
            userId: user._id || user.id, // ADD THIS - required by backend
            items: cart.map(item => ({
                productId: item.productId || item._id,
                name: item.name,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice
            })),
            shippingAddress: { // Make sure this matches your Order model schema
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode
            },
            paymentMethod: 'credit_card', // Add payment method
            paymentDetails: {
                cardName: formData.cardName,
                lastFourDigits: formData.cardNumber.slice(-4)
            },
            subtotal: subtotal,
            shipping: shipping,
            tax: tax,
            totalAmount: total // Use totalAmount instead of total to match backend
        };

        console.log('Sending order data:', orderData); // Debug log

        // Create order
        const response = await createOrder(orderData);
        
        if (response.success) { // Check response structure
            clearCart();
            setOrderPlaced(true);
            // notification('Order placed successfully!', 'success');
            {notification && (
                <div className={`fixed top-6 right-6 px-6 py-4 rounded-xl shadow-xl font-semibold text-white z-50 animate-slide-in transition-all
                    ${notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
                >
                    ORDER PALCED SUCCESFULLLY
                </div>
            )}

            // Redirect to profile after 3 seconds
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        }
    } catch (error) {
        console.error('Order creation error:', error);
        alert('Order failed: ' + (error.response?.data?.message || error.message));
    }
};

    if (cart.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="text-6xl mb-6">🛒</div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Add items to your cart before checking out.</p>
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

    if (orderPlaced) {
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
                    <div className="text-6xl mb-6 animate-bounce">✓</div>
                    <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
                    <p className="text-gray-600 mb-4">Thank you for your purchase.</p>
                    <p className="text-gray-600 mb-8">Your order has been confirmed and you will receive a confirmation email shortly.</p>
                    <p className="text-sm text-gray-500 mb-8">Redirecting to home page...</p>
                    <Link 
                        to="/" 
                        className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 rounded-3xl font-semibold transition-all"
                    >
                        Back to Home
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
                    <h1 className="text-4xl md:text-6xl font-black text-gray-800 mb-2">Checkout</h1>
                    <p className="text-gray-600">Complete your purchase securely</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8">
                        
                        {/* Shipping Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name (from your profile)</label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        onChange={handleInputChange}
                                        value={formData.firstName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name (from your profile)</label>
                                    <input 
                                        type="text"
                                        name="lastName" 
                                        onChange={handleInputChange}
                                        value={formData.lastName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email (from your profile)</label>
                                    <input 
                                        type="email"
                                        name="email" 
                                        onChange={handleInputChange}
                                        value={formData.email}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone (from your profile)</label>
                                    <input 
                                        type="tel"
                                        name="phone"
                                        onChange={handleInputChange}
                                        value={formData.phone}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        placeholder="+1 (555) 123-4567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                <input 
                                    type="text"
                                    name="address" 
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                    placeholder="123 Main Street"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                    <input 
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                        placeholder="New York"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                    <input 
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                        placeholder="NY"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Zip Code</label>
                                    <input 
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                        placeholder="10001"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white rounded-2xl p-8 shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                                <input 
                                    type="text"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 mb-6"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                <input 
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={(e) => {
                                        let value = e.target.value.replace(/\s/g, '');
                                        if (/^\d*$/.test(value) && value.length <= 16) {
                                            let formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                                            handleInputChange({ target: { name: 'cardNumber', value: formatted } });
                                        }
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 mb-6"
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                                    <input 
                                        type="text"
                                        name="expiry"
                                        value={formData.expiry}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 4) {
                                                if (value.length >= 2) {
                                                    value = value.slice(0, 2) + '/' + value.slice(2);
                                                }
                                                handleInputChange({ target: { name: 'expiry', value } });
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                                    <input 
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={(e) => {
                                            let value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 3) {
                                                handleInputChange({ target: { name: 'cvv', value } });
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800"
                                        placeholder="123"
                                        maxLength="3"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button 
                            type="submit"
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg"
                        >
                            Place Order ({Currency} {total.toFixed(2)})
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 shadow-md sticky top-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={`${item._id}-${item.size}`} className="flex justify-between text-sm">
                                        <div>
                                            <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                                            <p className="text-gray-600">Size: {item.size} x {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold text-gray-800">{Currency} {item.totalPrice.toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
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
                            <div className="flex justify-between items-center text-2xl font-bold text-gray-800 mb-8">
                                <span>Total</span>
                                <span>{Currency} {total.toFixed(2)}</span>
                            </div>

                            {/* Security Info */}
                            <div className="space-y-2 text-xs text-gray-600">
                                <div className="flex gap-2">
                                    <span>🔒</span>
                                    <span>Your payment information is secure and encrypted</span>
                                </div>
                                <div className="flex gap-2">
                                    <span>✓</span>
                                    <span>Money-back guarantee if not satisfied</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
