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
                role: user.role,
                profilePicture: user.profilePicture,
                phone: user.phone,
                address: user.address,
                bio: user.bio,
                createdAt: user.createdAt
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
            role: user.role,
            
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
                role: user.role,
                profilePicture: user.profilePicture,
                phone: user.phone,
                address: user.address,
                bio: user.bio,
                createdAt: user.createdAt
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

// Update User Profile
// API Endpoint - /api/auth/update
// Method - PUT
router.put('/update', protect, [
    body('name').optional().notEmpty().withMessage("Name cannot be empty"),
    body('phone').optional().isLength({ min: 10 }).withMessage("Phone must be at least 10 digits"),
    body('email').optional().isEmail().withMessage("Valid Email is Required!")
], async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Get user ID from token
        const userId = req.user.userId;

        // Extract update data from request body
        const { name, email, phone, bio, profilePicture, address } = req.body;

        // Check if email is already in use by another user
        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email is already in use"
                });
            }
        }

        // Prepare update object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (bio) updateData.bio = bio;
        if (profilePicture) updateData.profilePicture = profilePicture;
        if (address) {
            updateData.address = {
                street: address.street || "",
                city: address.city || "",
                state: address.state || "",
                zipCode: address.zipCode || ""
            };
        }

        // Update user in database
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        // Success response
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


export default router;