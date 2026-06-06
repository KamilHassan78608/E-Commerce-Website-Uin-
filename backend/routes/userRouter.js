import express from 'express';
import User from '../models/UserModel.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
});

// Update profile (picture, phone, address, bio)
router.put('/profile', protect, async (req, res) => {
    const { profilePicture, phone, address, bio } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user.userId,
        { profilePicture, phone, address, bio },
        { new: true }
    ).select('-password');
    res.json(user);
});

export default router;