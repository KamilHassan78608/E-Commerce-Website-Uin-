import express from 'express';
import User from "../models/UserModel.js"
import { generateToken } from '../utils/jwt.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Register in new User
// API end Point /api/auth/register
router.post('/register', [
    body('name').notEmpty().withMessage("Name is Required"),
    body('email').isEmail().withMessage("Valid Email is Required!"),
    body('password').isLength({ min : 6}).withMessage("Password must be at least 6 letters")
], async (req, res) => {

    // Check for any Validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const { name, email, password} = req.body;

        // Check if user already exist
        const userExist = await User.findOne({ email });
        if (userExist){
            return res.status(400).json({
                success : false,
                messege : "User Already Exist! "
            });
        }

        // User Create into mongo Db
        const user = await User.create({
            name, email, password
        });

        // Generate Token
        const token = generateToken({
            userId: user._id,
            role: user.role
        });

        // Success messege
        res.status(200).json({
            success : true,
            messege : "User Successfullly Register! ",
            token,
            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch ( error ) {
        res.status(500).json({
            success : false,
            message: error.message
        });
    }
});


// Login a user
// Api End Point - api/auth/login
router.post('/login', [
    body('email').isEmail().withMessage("Valid Email is Required!"),
    body('password').isLength({ min : 6}).withMessage("Password must be at least 6 letters")
], async (req, res) => {
    
    // Check for any validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    try {
        const { email, password } = req.body;

        // Finding the user
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                success : false,
                messege : "Invalid Email or Password"
            });
        }

        // Comparing the password
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch){
            return res.status(401).json({
                success : false,
                message : "Invalid Email or password"
            });
        }

        // Generating token
        const token = generateToken({
            userId: user._id,
            role: user.role
        });

        // Sending back the user
        res.status(200).json({
            success : true,
            messege : "User Successfullly Login! ",
            token,
            user : {
                id : user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error.message
        });
    }
});

// Get all of the user except password
// API Endpoint - /api/auth/profile3
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all of the user except password
// @route   GET /api/auth/users
router.get('/users', protect, adminOnly, async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;