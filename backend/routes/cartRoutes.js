import express from 'express';
import { protect } from '../middleware/auth.js';
import Cart from '../models/Cart.js';

const router = express.Router();

// Get user's cart
router.get('/my-cart', protect, async (req, res) => {
    try {
        // Check if userId is available from token
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token. Please login again.'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });
        
        if (!cart) {
            cart = new Cart({
                userId: req.user.userId,
                items: []
            });
            await cart.save();
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Add item to cart
router.post('/add-item', protect, async (req, res) => {
    try {
        // Check if userId is available from token
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token. Please login again.'
            });
        }

        const { productId, name, price, image, quantity, size } = req.body;

        // Validate input
        if (!productId || !name || !price || !image || !quantity || !size) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            cart = new Cart({
                userId: req.user.userId,
                items: []
            });
        }

        // Check if item already exists in cart
        const existingItem = cart.items.find(
            item => item.productId === productId && item.size === size
        );

        if (existingItem) {
            // Update quantity and total price
            existingItem.quantity += quantity;
            existingItem.totalPrice = existingItem.price * existingItem.quantity;
        } else {
            // Add new item to cart
            cart.items.push({
                productId,
                name,
                price,
                image,
                quantity,
                size,
                totalPrice: price * quantity
            });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update cart item quantity
router.put('/update-item', protect, async (req, res) => {
    try {
        // Check if userId is available from token
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token. Please login again.'
            });
        }

        const { productId, size, quantity } = req.body;

        if (!productId || !size || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const item = cart.items.find(
            item => item.productId === productId && item.size === size
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items = cart.items.filter(
                item => !(item.productId === productId && item.size === size)
            );
        } else {
            // Update quantity and total price
            item.quantity = quantity;
            item.totalPrice = item.price * quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart updated',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Remove item from cart
router.delete('/remove-item', protect, async (req, res) => {
    try {
        // Check if userId is available from token
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token. Please login again.'
            });
        }

        const { productId, size } = req.body;

        if (!productId || !size) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = cart.items.filter(
            item => !(item.productId === productId && item.size === size)
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Clear cart
router.delete('/clear-cart', protect, async (req, res) => {
    try {
        // Check if userId is available from token
        if (!req.user || !req.user.userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found in token. Please login again.'
            });
        }

        let cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared',
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
