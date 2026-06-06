import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardName: {
        type: String,
        required: true,
        trim: true
    },
    cardNumber: {
        type: String,
        required: true,
        minlength: 16,
        maxlength: 16
    },
    expiryMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    expiryYear: {
        type: Number,
        required: true,
        min: new Date().getFullYear()
    },
    cvv: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Card = mongoose.model('Card', cardSchema);
export default Card;
