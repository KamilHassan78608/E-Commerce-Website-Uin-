import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePicture : {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        default : ''
    },
    address : {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    bio : {
        type : String,
        default : ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypting Password before saving into Database
userSchema.pre('save', async function(next){
    // Checking either we are hashing the correct password
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

// Comparing Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;