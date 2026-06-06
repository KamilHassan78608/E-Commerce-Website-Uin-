import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
        },
        name : String,
        size : String,
        quantity : Number,
        price : Number,
        totalPrice : Number
    }],
    shippingDetails: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zipCode: String
    },
    paymentDetails: {
        cardName: String,
        lastFourDigits: String
    },
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;