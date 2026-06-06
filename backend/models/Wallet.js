import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        default: 0,
        min: 0
    },
    credits: {
        type: Number,
        default: 0,
        min: 0
    },
    transactions: [{
        type: {
            type: String,
            enum: ['credit', 'debit', 'refund', 'bonus'],
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            default: null
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    totalSpent: {
        type: Number,
        default: 0
    },
    totalEarned: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update updatedAt before saving
walletSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Wallet = mongoose.model('Wallet', walletSchema);
export default Wallet;
